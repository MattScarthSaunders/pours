# Pours

This app is made for my own use, primarily to learn react native, mobile development, native modules, etc.

Install with `npm install`, run with `npm start`. You'll need emulators and stuff. Good luck.

## Tests

Only very very basic config is currently implemented with detox. Use the following steps to 'test':

1. Build debug version with `npm run build:debug` which runs a bash script to build said version
2. Start the app with `npm start`.
3. Open a new terminal and run `npm run test:detox`.

This should open up your emulator, run through your test steps visually on the app, as well as logging anything from your tests in the terminal.
