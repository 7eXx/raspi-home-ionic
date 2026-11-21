# AGENTS.md

## Project Overview

Single-page Ionic/Angular PWA for the Raspi Home home-automation project. It shows alarm, gate, environment and system status received over MQTT, and sends commands (alarm/gate toggles, home/away mode, wake-on-LAN) to a backend over HTTP. The production artifact is a static nginx image served at `/`, with `/api` and `/mqtt` proxied to internal services. A Capacitor Android platform exists locally but is generated and gitignored — the web app under `src/` is the source of truth.

`README.md` is intentionally brief (it only documents `ng serve --port 8100 --host 0.0.0.0` and `./build-push.sh`); this file records code-level conventions.

## Technology Stack

From `package.json` (and `package-lock.json` for exact resolutions):

- Angular `~13.2.2` (CLI/devkit `~13.2.3`), TypeScript `~4.4.4`, RxJS `~6.6.0`, zone.js `~0.11.4`
- `@ionic/angular` `^6`, `@ionic-native/core` + `@ionic-native/vibration` `^5`
- Capacitor `^6` (`@capacitor/core`, `app`, `haptics`, `keyboard`, `status-bar`, `android` platform); `capacitor.config.json` points at `www`
- `ngx-mqtt` `^9` for status/connection streams; `ngx-gauge` `^5` for the environment/system gauges
- Jasmine `~3.8` / Karma `~6.3` (`karma-jasmine ~4`) unit tests; Protractor `~7` for a stale e2e scaffold
- ESLint `^7` with `@angular-eslint` `~13`
- Docker: `node:18` build stage, `nginx:1.24-bullseye` runtime (`docker/Dockerfile`); `build-push.sh` supports `--arm` and `--no-push`

## Architecture

```text
src/app/
  app.module.ts / app-routing.module.ts / app.component.*   root shell + provider bindings
  tabs/                                                     ion-tabs shell, routes to the four features
  home/ gate/ environment-info/ info/                       lazy-loaded feature modules
  components/                                               presentational widgets (declared in InfoPageModule)
  shared/                                                   SharedModule: connection-state, temperature, humidity
  services/                                                 abstract services + *-impl + *-mock
  datastructures/                                           DTOs, builders, command constants
src/environments/                                           dev/prod config swapped by angular.json
docker/                                                     nginx template + entrypoint placeholder substitution
```

- **Routing:** `AppRoutingModule` lazy-loads `TabsPageModule` at `''` using `PreloadAllModules`, and redirects `**` to `tabs/home`. `tabs-routing.module.ts` defines `/tabs/{home,gate,environment,info}` (the `environment` route loads `EnvironmentInfoPageModule` from `environment-info/`), plus empty-path redirects to `/tabs/home`. Keep new pages lazy-loaded under `tabs` and follow the existing `*PageModule` / `*PageRoutingModule` naming.
- **Dependency injection:** inject the **abstract** service (`HomeBrokerService`, `CommandRequestService`, `WakeOnLanRequestService`), never the implementation. Abstract classes live in `*.service.ts`, implementations in `*-impl.service.ts`, and test doubles in `*.service.mock.ts` (currently only `HomeBrokerServiceMock` and `CommandRequestServiceMock` exist). Bindings are in `AppModule.providers` along with `Vibration` and Ionic's `RouteReuseStrategy`. `HomeBrokerServiceImpl` is additionally `@Injectable({ providedIn: 'root' })`. When changing a service contract, update the abstract class, its impl, its mock (where one exists), the provider binding, and affected specs.
- **Data flow:** `HomeBrokerServiceImpl` owns the MQTT connection (`services/mqtt-options.ts`, `connectOnCreate: false`, `connect()` called from the constructor via `createConnection()`), keeps `BehaviorSubject`s for connection state and `Automation` status, and exposes them through Observable getters (including derived `isSystemStatusAvailable`, ECU alarm and gate streams). Incoming messages on `environment.mqtt.statusTopic` are JSON-parsed and passed through `AutomationBuilder`. Pages either bind Observables with the `async` pipe (`HomePageComponent`, `GatePage`, `ConnectionStateComponent`) or snapshot into a stored `Subscription` in `ngOnInit` and unsubscribe in `ngOnDestroy` (`InfoPage`, `EnvironmentInfoPage`). Every page exposes an `onReconnect()` that calls `HomeBrokerService.reconnect()`.
- **Payload parsing:** keep it in the builders. `AutomationBuilder` requires `systemInfo` (throws `Error` for missing system info, datetime, cpu, memory or disk), uses `Object.assign(new Dto(), payload)` for nested values (`CpuInfo`, `MemoryInfo`, `DiskInfo`), and falls back to `EnvironmentInformation.createDefault()` when `environmentInfo` is absent. `EnvironmentInfoBuilder` validates status (`n/a | online | offline`), timestamp, temperature and humidity and uses the same `Object.assign` pattern for `TemperatureInfo` / `HumidityInfo`.
- **Commands:** `CommandRequestServiceImpl` PUTs `{command, state?}` to `${environment.apiServerUrl}/command`; command strings come from the `Commands` class in `datastructures/commands.model.ts` (`ALARM_*`, `GATE_*`, `HOME_AWAY_TOGGLE`; `ALARM_ANTIPANIC_MODE` is declared but unused). Calls are fire-and-forget. `WakeOnLanRequestServiceImpl` builds `${environment.apiServerUrl}/wake_ryzen` and `/wake_lenovo` URLs; `WakeOnLanComponent` takes the URL/title/button text as `@Input()`s, vibrates, and presents a success/error toast from the `HttpClient` `next`/`error` callbacks.
- **Config:** `src/environments/environment.ts` (dev) and `environment.prod.ts` are swapped by the `production` `fileReplacements` in `angular.json`. Both use relative `/api` and `/mqtt`; dev resolves them via `proxy.conf.json` (targets `http://localhost:5000` and `http://localhost:9001`, `ws: true`), production via `docker/etc/nginx/conf.d/default.conf`. `mqtt-options.ts` lets an empty `baseUrl` fall back to `window.location.origin`, chooses `wss` only when `environment.mqtt.protocol === 'wss'`, and uses `environment.mqtt.path` (`/mqtt`); the declared `port` and `commandTopic` fields are not used there. The service worker is registered in `AppModule` only when `environment.production` is true (`registerWhenStable:30000`).
- **Styling:** Ionic components plus global utility classes in `src/global.scss` (`d-flex`, `d-flex-center`, `height-100`, `icon-button` with its `on`/`off`/`open`/`close`/`active`/`deactive` variants, `font-*`, `toast-custom-bottom`); theme variables and a dark-mode override in `src/theme/variables.scss`. `angular.json` compiles the `.scss` files only.
- **Bootstrapping:** `src/polyfills.ts` imports `./zone-flags` before `zone.js/dist/zone`; `zone-flags.ts` sets `__Zone_disable_customElements` so Ionic web components don't trigger Angular change detection. Preserve that order.

## Development Guidelines

- Follow `.editorconfig` (2-space indent, final newline, trimmed trailing whitespace; single quotes for `.ts`) and `.eslintrc.json` (element selectors use the `app` prefix in kebab-case, attribute selectors use `app` in camelCase, class suffixes `Page|Component|Dialog`). Existing files mix quote styles; match the surrounding file where it diverges from EditorConfig rather than reformatting broadly.
- Preserve local file naming: `home-page.component.ts`, `gate-page.component.ts`, `info-page.component.ts`, but `environment-info.page.ts` and `tabs.page.ts`. Do not rename legacy files as part of unrelated changes.
- Place reusable cross-page widgets in `SharedModule` (declare **and** export them); gauges and info-page-specific widgets (`cpu-load`, `cpu-temperature`, `memory`, `disk`, `datetime`, `wake-on-lan`) are declared in `InfoPageModule`. Widgets are presentational: data arrives through `@Input()` or an injected broker Observable.
- Keep error handling consistent: builders throw `Error` with descriptive messages on invalid payloads; MQTT errors/offline log via `console` and tear down the message subscription and connection (`destroyService()`), while `reconnect()` unsubscribes all streams before recreating the connection. HTTP command calls are fire-and-forget `HttpClient.put(...).subscribe()`; wake-on-LAN uses explicit `next`/`error` toast feedback. Page button handlers call `Vibration.vibrate(300)`.
- No state-management library or extra HTTP client is present; state is handled with Observables and injected services, and HTTP calls use the `HttpClientModule` configured in `AppModule`.
- Do not hand-edit the generated Capacitor `android/` platform (gitignored); regenerate it with the Capacitor CLI when native changes are actually needed.

## Testing and Verification

npm scripts in `package.json`:

- `npm run build` / `npm run build:production` — Angular build; output directory is `www` (`angular.json`). `npm ci` installs dependencies (Node 18 is used in the Docker build stage). `npm start` (`ng serve`) uses `proxy.conf.json`; the README suggests port 8100 for exposed deployments.
- `npm run lint` — `ng lint` over `src/**/*.ts` and `src/**/*.html`.
- `npm test` — Karma/Jasmine. `karma.conf.js` uses the `Chrome` browser, `autoWatch: true`, `singleRun: false`. `ng test --configuration ci` sets `watch: false` and `progress: false` for a one-shot run.
- `npm run e2e` — Protractor via `e2e/protractor.conf.js`, base URL `http://localhost:4200/`. The checked-in spec still expects `Tab 1`; treat it as stale rather than authoritative.

Unit-test conventions:

- Colocated `*.spec.ts`; `TestBed.configureTestingModule` inside `waitForAsync`, mostly "should create" smoke tests. The only real behavioral coverage is `src/app/datastructures/automation-builder.spec.ts` (validation and default environment info).
- Where a spec injects broker/command services, override them with the existing mocks, e.g. `{ provide: HomeBrokerService, useClass: HomeBrokerServiceMock }` (`app.component.spec.ts`, `info-page.component.spec.ts`). Several older component specs only import `IonicModule.forRoot()` / `RouterTestingModule` and do not provide mocks; use `CUSTOM_ELEMENTS_SCHEMA` as in `app.component.spec.ts` and `tabs.page.spec.ts` when a template uses Ionic/custom elements.

## Security Considerations

- No authentication, tokens or credentials exist in application code. Keep backend/MQTT calls on same-origin relative paths (`/api`, `/mqtt`); do not hardcode internal hostnames into `src/`.
- The tracked `.env` holds only Docker image/registry values (`USERNAME`, `PRIVATE_DOCKER_REGISTRY`, `DOCKER_IMAGE`, `DOCKER_IMAGE_TAG`). `docker-compose.yml` also loads `.env.local`, which is gitignored. `build-push.sh` sources both files and pipes `./.docker_pass` into `docker login` only when `PRIVATE_DOCKER_REGISTRY` is unset; that file is not in the repo. Keep local overrides and secrets out of commits.
- The dev proxy sets `secure: false` and WebSocket support. In production, nginx proxies `/mqtt` with upgrade headers and `/api` with `Origin` and `X-Forwarded-*` headers. Changes to `proxy.conf.json` or the nginx template placeholders (`#{__server_name__}`, `#{__backend_url__}`, `#{__mosquitto_url__}`, substituted by `docker/docker-entrypoint.d/setup-environment.sh`) affect how internal services are reached.
- MQTT transport/TLS decisions stay in environment config and `services/mqtt-options.ts`, never in components.
- `ngsw-config.json` precaches the app shell (`installMode: prefetch`) and lazily installs assets with `updateMode: prefetch`; update it when asset paths change.

## Restrictions

- Do not hand-edit generated or ignored output: `www/`, `dist/`, `coverage/`, `.angular/`, `.ionic/`, `node_modules/`, `android/`, `platforms/`, `plugins/`, or `package-lock.json` (regenerate the lockfile via npm). Edit `src/` sources instead.
- Compiled Sass artifacts are committed but not consumed by the Angular build: `src/global.css`, `src/global.css.map`, `src/app/components/cpu-temperature/cpu-temperature.component.css{,.map}`, and `src/app/shared/connection-state/connection-state.component.css{,.map}`. Edit the corresponding `.scss` files, not these outputs or their maps.
- Do not modify `.env`, `.env.local`, `.docker_pass`, registry names, `build-push.sh`, `docker-compose.yml` or nginx/Docker deployment files unless the task explicitly targets deployment.
- Keep `angular.json` file replacements, `AppModule` provider bindings, and the abstract/impl/mock service triad in sync; changing one side alone will break builds or tests.
- No nested `AGENTS.md` is needed for this repository: it is a single Angular project with one brief `README.md`, no additional detailed technical docs, and no separate subsystems under version control.
