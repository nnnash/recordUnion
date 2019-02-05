module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.js',
  ],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|less)$': 'identity-obj-proxy',
  },
  setupFiles: [
    '<rootDir>/jest.js',
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
};
