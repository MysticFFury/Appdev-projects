module.exports = {
  preset: 'react-native',
  setupFiles: [
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.after.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|react-redux|@reduxjs|immer|@react-navigation)',
  ],
};
