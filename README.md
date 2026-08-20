# VVlog

VVlog is an Angular blog application backed by Firebase. Posts are created through the app and stored in Cloud Firestore, with AngularFire providing the Firebase integration.

The project uses Angular 16.2.16, AngularFire 7.6.1, and Firebase 10.12.5.

## Prerequisites

- Node.js and npm
- A Firebase project with Cloud Firestore enabled

## Installation

Install the project dependencies from the project directory:

```bash
npm install
```

## Firebase configuration

Firebase configuration is stored in:

- `src/environments/environment.development.ts` for local development
- `src/environments/environment.ts` for production builds

Update the `firebase` object in these files with the configuration from your Firebase project. The Firebase web configuration is safe to include in a frontend application, but protect your data with Firebase Authentication and Firestore/Storage security rules.

## Development server

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application automatically reloads when source files change.

## Application routes

- `/newPost` - Create a new blog post

## Build

Build the application for production:

```bash
npm run build
```

The build artifacts are written to the `dist/v-vlog/` directory. To build with the development environment configuration, run `npm run build -- --configuration development`.

## Development watch mode

```bash
npm run watch
```

## Running unit tests

Run the unit tests with [Karma](https://karma-runner.github.io):

```bash
npm test
```

## Useful Angular CLI commands

```bash
ng generate component component-name
ng generate service service-name
```

For more information, see the [Angular CLI Overview and Command Reference](https://angular.io/cli).

<img width="1286" height="665" alt="image" src="https://github.com/user-attachments/assets/984ed06c-bca7-4410-918f-cc2c1855fea5" />

