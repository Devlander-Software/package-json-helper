module.exports = function (api) {
  api.cache(true);

  const presets = [
    "@babel/preset-typescript",
  ];

  const plugins = [
    // Add any other Babel plugins you may need here
  ];

  return {
    presets,
    plugins,
    include: ["src/**/*"],
    exclude: ["node_modules", "./dist/**/*", "./types/**/*", "assets"],
  };
};
