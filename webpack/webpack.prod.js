const { merge } = require("webpack-merge");
const DotenvWebpack = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const baseConfig = require("./webpack.base.js");

const mode = "production";

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new DotenvWebpack({
      path: `./env/.env.${mode}`,
    }),
  ],
});
