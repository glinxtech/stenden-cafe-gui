'use strict';

const path = require('path');
const { merge } = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const base = {
  context: path.resolve('src'),
  entry: [
    './index.jsx',
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { sourceMap: true },
        }],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({ template: path.resolve('src/template.html') }),
    new MiniCssExtractPlugin(),
  ],
};

const environments = {
  development: {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      contentBase: path.resolve('dist'),
      historyApiFallback: true,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:5121',
          secure: false,
        },
      },
    },
  },

  production: {
    mode: 'production',
  },
};

module.exports = function webpackConfig(env) {
  return merge(base, environments[env] || environments.production);
};