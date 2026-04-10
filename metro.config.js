const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = withNativeWind(
  mergeConfig(defaultConfig, {
    // you can extend later if needed
  }),
  { input: './src/styles/global.css' }
);