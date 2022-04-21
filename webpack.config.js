'use strict';

const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconWebpackPlugin = require('favicons-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const BrotliWebpackPlugin = require('brotli-webpack-plugin');

const base = {
  context: path.resolve('src'),
  entry: [
    'bootstrap/dist/css/bootstrap.css',
    './index.jsx',
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { sourceMap: true },
        }],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new FaviconWebpackPlugin(path.resolve('favicon.png')),
    new HtmlWebpackPlugin({
      template: path.resolve('src/template.html'),
      inject: 'head',
    }),
    new MiniCssExtractPlugin(),
  ],
};

const environments = {
  development: {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      open: true,
      proxy: {
        '/api': {
          target: 'http://172.18.160.1:5121/',
          secure: false,
          changeOrigin: true,
        },
      },
    },
  },

  production: {
    mode: 'production',
    output: {
      path: path.resolve('dist'),
      publicPath: '/',
    },
    plugins: [
      new CleanWebpackPlugin({ path: path.resolve('dist') }),
      new BrotliWebpackPlugin(),
    ],
    optimization: {
      minimizer: [
        new TerserWebpackPlugin(),
      ],
    },
  },
};

module.exports = function webpackConfig({ development }) {
  return merge(base, environments[development ? 'development' : 'production']);
};
