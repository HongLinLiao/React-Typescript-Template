const { merge } = require("webpack-merge");
const DotenvWebpack = require("dotenv-webpack");
const baseConfig = require("./webpack.base.js");

const mode = "production";

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    new DotenvWebpack({
      path: `./env/.env.${mode}`,
    }),
  ],
});
