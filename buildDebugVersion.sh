#!/bin/bash
set -e

echo "Bundling React Native application for Android..."
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

echo "Changing directory to android/"
cd android

echo "Assembling Debug APK using Gradle..."
./gradlew assembleDebug

echo "Build process completed successfully."