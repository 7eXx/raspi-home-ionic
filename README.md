# Raspi Home Ionic
This is the web ionic app for the Raspi Home project.

## Deployment
Start angular in deploy mode. The setup proxy will process all request throught right resource.
```sh
ng serve --port 8100 --host 0.0.0.0
```

## Build docker image
Use the following script to build and push docker image:
```sh
./build-push.sh
```
