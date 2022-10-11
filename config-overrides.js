// const { injectBabelPlugin } = require("react-app-rewired");

// const rootImportConfig = [
//   "root-import",
//   {
//     rootPathPrefix: "~",
//     rootPathSuffix: "src",
//   },
// ];

// module.exports = (config) => injectBabelPlugin(rootImportConfig, config);

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    // ...add your webpack config
    return config;
  },
  // The paths config to use when compiling your react app for development or production.
  paths: function (paths, env) {
    // ...add your paths config
    return paths;
  },
};
