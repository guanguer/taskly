# Taskly

A React Native task management app built with [Expo](https://expo.dev).

## Prerequisites

- [Node.js](https://nodejs.org) (LTS recommended)
- [Yarn](https://yarnpkg.com)
- [Expo Go](https://expo.dev/go) on your iOS or Android device for quick testing, **or** Xcode (iOS simulator) / Android Studio (Android emulator)

## Installation

```bash
yarn install
```

## Running the app

| Command | Platform |
|---|---|
| `yarn start` | Opens the Expo dev server — scan the QR code with Expo Go |
| `yarn ios` | Runs on an iOS simulator (requires Xcode) |
| `yarn android` | Runs on an Android emulator (requires Android Studio) |
| `yarn web` | Runs in the browser |

## Project structure

```
taskly/
├── App.tsx          # Root component
├── assets/          # Icons and images
├── app.json         # Expo configuration
└── tsconfig.json    # TypeScript configuration
```
