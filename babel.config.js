module.exports = function(api) {
  api.cache(true);

  const plugins = [];
  //https://github.com/babel/minify/issues/950#issuecomment-539590159
  if (process.env.NODE_ENV === "production" || process.env.BABEL_ENV === "production") {
    plugins.push("transform-remove-console");
  }

  return {
    presets: ["babel-preset-expo", "module:react-native-dotenv"],
    plugins: plugins,
  };
};
