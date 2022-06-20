const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DotenvWebpack = require("dotenv-webpack");

const path = require("path");

module.exports = (env) => {
  const output = path.resolve(__dirname, "./dist");
  const envPath = env.ENV ? `.env.${env.ENV}` : `.env`;

  const config = {
    mode: "development",
    entry: "./src/index.js",
    output: {
      path: output,
      filename: "main.[hash].js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./public/index.html",
      }),
      new CleanWebpackPlugin({
        verbose: true,
      }),
      new MiniCssExtractPlugin({
        filename: "main.[hash].css",
      }),
      new DotenvWebpack({
        path: envPath,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(svg|png|jpe?g|gif)/,
          type: "asset/resource",
        },
      ],
    },
    devtool: "source-map",
    devServer: {
      port: 3000,
      open: true,
    },
  };

  return config;
};
