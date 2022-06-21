const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DotenvWebpack = require("dotenv-webpack");
const path = require("path");

module.exports = (env) => {
  const output = path.resolve(__dirname, "dist");
  const envPath = env.ENV ? `.env.${env.ENV}` : `.env`;

  const config = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
      path: output,
      filename: "main.[hash].js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
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
          test: /.ts$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/typescript", "@babel/preset-env"],
            },
          },
        },
        {
          test: /.tsx$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/typescript",
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
                "@babel/preset-env",
              ],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
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
