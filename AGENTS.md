# AGENTS.md

## Project Overview

Single-page Ionic/Angular web app for the Raspi Home home-automation project. It displays alarm, gate, system and environment status received over MQTT, and issues commands (alarm/gate toggles, home/away, wake-on-LAN) to a backend over HTTP. Built as a PWA and shipped as a static nginx image. README.md covers deployment and the Docker image build script; this file focuses on code-level conventions.

## Technology Stack

From `package.json` (also see `package-lock.json` for exact resolutions):

- Angular `~13.2.2` (CLI/devkit `~13.2.3`), TypeScript `~4.4.4`, RxJS `~6.6.0`, zone.js `~0.11.4`
- `@ionic/angular` `^6`, Capacitor `^6` (`@capacitor/android`, app/haptics/keyboard/status-bar), `@ionic-native/vibration` `^5`
- `ngx-mqtt` `^9` for status/connection streams; `ngx-gauge` `^5` for environment/system gauges
- Jasmine/Karma `~3.8`/`~6.3` unit tests; Protractor `~7` e2e (legacy scaffold)
- ESLint `^7` with `@angular-eslint` `~13`
- Docker build stage: `node:18`; runtime: `nginx:1.24-bullseye` (`docker/Dockerfile`)

## Architecture

```
src/app/
  app.module.ts / app-routing.module.ts / app.component.*   root shell
  tabs/                                                     ion-tabs shell
  home/ gate/ environment-info/ info/                       lazy-loaded feature modules
  components/                                               presentational widgets (declared in InfoPageModule)
  shared/                                                   SharedModule: connection-state, temperature, humidity
  services/                                                 abstract services + *-impl + *-mock
  datastructures/                                           DTOs, builders, command constants
```

- Routing: `AppRoutingModule` lazy-loads `TabsPageModule`; `tabs-routing.module.ts` lazy-loads the four feature modules under `/tabs/{home,gate,environment,info}` and redirects unknown paths to `tabs/home`. Keep new pages lazy-loaded under `tabs`.
- Dependency injection: inject the **abstract** service (`HomeBrokerService`, `CommandRequestService`, `WakeOnLanRequestService`), never the implementation. Bindings live in `AppModule.providers`; implementations are `*-impl.service.ts`, test doubles are `*.service.mock.ts`. When changing a service contract, update the abstract class, its impl, its mock, the provider binding, and any specs.
- Data flow: `HomeBrokerServiceImpl` owns the MQTT connection (`mqtt-options.ts`, `connectOnCreate: false`, connect in constructor), keeps `BehaviorSubject`s for connection and `Automation` status, and exposes Observable getters. Components either bind Observables with the `async` pipe or take a snapshot in `ngOnInit` into a stored `Subscription` and unsubscribe in `ngOnDestroy` (`InfoPage`, `EnvironmentInfoPage`).
- Payload parsing stays in builders: `AutomationBuilder` and `EnvironmentInfoBuilder` validate fields, throw `Error` for invalid system info, use `Object.assign(new Dto(), payload)` for nested values, and fall back to `EnvironmentInformation.createDefault()` when environment info is absent.
- Commands: `CommandRequestServiceImpl` PUTs `{command, state?}` to `${environment.apiServerUrl}/command`; command strings come from `datastructures/commands.model.ts`. Wake-on-Lan URLs are produced by `WakeOnLanRequestServiceImpl` and fetched by `WakeOnLanComponent`, which shows a toast on success/error.
- Config: `src/environments/environment.ts` (dev) and `environment.prod.ts` are swapped by `angular.json` file replacements. Both use relative `/api` and `/mqtt`; dev resolves them via `proxy.conf.json`, production via `docker/etc/nginx/conf.d/default.conf`. The service worker (`ngsw-config.json`) is registered only when `environment.production` is true.
- Styling: Ionic components plus utility classes in `src/global.scss` (`d-flex-center`, `icon-button`, `font-*`, etc.); theme variables in `src/theme/variables.scss`. `angular.json` compiles the `.scss` files, not the checked-in `.css` files.
- `src/polyfills.ts` imports `./zone-flags` before `zone.js`; `zone-flags.ts` disables Zone's custom-element patch for Ionic web components. Preserve that order.

## Development Guidelines

- Follow `.editorconfig` (2-space indent, final newline; single quotes for `.ts`) and `.eslintrc.json` (element selectors use the `app` prefix in kebab-case, attribute selectors use the `app` prefix in camelCase, class suffixes `Page|Component|Dialog`). Existing files mix quote styles; match the surrounding file where it diverges from EditorConfig rather than reformatting broadly.
- Preserve the local file naming of each area: `home-page.component.ts`, `gate-page.component.ts`, `info-page.component.ts`, but `environment-info.page.ts` and `tabs.page.ts`; modules are named `*PageModule`. Do not rename legacy files as part of unrelated changes.
- Reuse existing structure: put cross-page widgets in `SharedModule` (and export them) or, for info-page-specific gauges, alongside the other widgets declared in `InfoPageModule`.
- Keep error handling consistent: builders throw `Error` with descriptive messages on invalid payloads; MQTT errors/offline log via `console` and tear down subscriptions (`HomeBrokerServiceImpl` unsubscribe + disconnect + reconnect path); HTTP command calls are fire-and-forget `HttpClient` subscriptions, while wake-on-LAN uses explicit `next`/`error` toast feedback.
- No state-management library or additional HTTP client is present; state is handled with Observables and injected services, and HTTP calls use the `HttpClient` configured in `AppModule`.

## Testing and Verification

npm scripts in `package.json`:

- `npm run build` / `npm run build:production` — Angular build; output directory is `www` (`angular.json`). `npm ci` installs dependencies (Node 18 is used by the Docker build stage).
- `npm run lint` — `ng lint` over `src/**/*.ts` and `src/**/*.html`.
- `npm test` — Karma/Jasmine. `karma.conf.js` uses the `Chrome` browser, `autoWatch: true`, `singleRun: false`. `ng test --configuration ci` sets `watch: false` and `progress: false` for a one-shot run.
- `npm run e2e` — Protractor via `e2e/protractor.conf.js`; its base URL is `http://localhost:4200/`. The checked-in e2e spec is the Ionic starter scaffold (expects `Tab 1`), so treat it as stale rather than authoritative.

Unit-test conventions:

- Colocated `*.spec.ts` files; `TestBed.configureTestingModule` inside `waitForAsync`; mostly "should create" smoke tests, with real behavioral assertions in `src/app/datastructures/automation-builder.spec.ts`.
- Override injected services with the existing mocks, e.g. `{ provide: HomeBrokerService, useClass: HomeBrokerServiceMock }`; use `CUSTOM_ELEMENTS_SCHEMA` or `IonicModule.forRoot()` for Ionic templates, as the neighbouring spec does.

## Security Considerations

- No authentication or user credentials exist in application code. All backend/MQTT calls use same-origin relative paths (`/api`, `/mqtt`) resolved by the dev proxy or nginx; avoid hardcoding internal hostnames into `src/`.
- `.env` contains only Docker image/registry variables; `docker-compose.yml` also loads `.env.local`. `.env.local` is gitignored — keep local overrides and secrets out of commits. `build-push.sh` reads `USERNAME`/`PRIVATE_DOCKER_REGISTRY` and expects `./.docker_pass` for `docker login`; that file is not in the repo.
- Development proxy entries set `secure: false` with WebSocket support; nginx forwards `Origin` and `X-Forwarded-*` headers to the backend. Changes to `proxy.conf.json` or the nginx template placeholders (`#{__server_name__}`, `#{__backend_url__}`, `#{__mosquitto_url__}`, replaced by `docker/docker-entrypoint.d/setup-environment.sh`) affect how internal services are reached.
- MQTT uses `wss` only when `environment.mqtt.protocol === 'wss'`; otherwise `ws` with path `/mqtt` (`services/mqtt-options.ts`). Keep TLS/URL decisions in environment config rather than component code.
- The service worker caches the app shell with `prefetch` and other assets with lazy `updateMode: prefetch` in production (`ngsw-config.json`); changing asset paths may require updating that config.

## Restrictions

- Do not hand-edit generated output: `www/`, `dist/`, `coverage/`, `.angular/`, `node_modules/` (all gitignored), or `package-lock.json` (regenerate via npm). Edit `src/` sources instead.
- Compiled Sass artifacts are committed but not consumed by the Angular build: `src/global.css`, `src/global.css.map`, `src/app/components/cpu-temperature/cpu-temperature.component.css{,.map}`, and `src/app/shared/connection-state/connection-state.component.css{,.map}`. Edit the corresponding `.scss` files, not these outputs or their maps.
- Do not modify `.env`, `.env.local`, `.docker_pass`, registry names, or deployment scripts unless the task explicitly targets deployment.
- Keep `angular.json` file replacements, provider bindings, and the abstract/impl/mock service triad in sync; changing one side alone will break builds or tests.
- No nested `AGENTS.md` is needed for this repository: it is a single Angular project with one `README.md`, no additional detailed technical docs, and no separate subsystems.
