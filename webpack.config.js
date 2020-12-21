const path = require("path");
const libraryName = require("./package.json").name;
const outputFile = `${libraryName}.js`;

// plugins
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  devtool: "source-map",
  output: {
    filename: outputFile,
    path: path.resolve(__dirname, "lib"),
    library: libraryName,
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
  resolve: {
    alias: require("./aliases.config.js").webpack,
    fallback: { "querystring": false }
  },
  devServer: {
    contentBase: path.join(__dirname, "lib"),
    open: "Google Chrome",
    openPage: libraryName,
    hot: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [new ESLintPlugin()],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};

