const { merge } = require("webpack-merge");
const DotenvWebpack = require("dotenv-webpack");
const baseConfig = require("./webpack.base.js");

const mode = "development";

module.exports = merge(baseConfig, {
  mode,
  plugins: [
    new DotenvWebpack({
      path: `./env/.env.${mode}`,
    }),
  ],
  devtool: "source-map",
  devServer: {
    port: 3000,
    open: true,
  },
});
