const path = require('path');
const webpack = require('webpack');

// Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, 'dist');
const SOURCE_PATH = path.resolve(__dirname, 'src');
const ENVIRONMENT = process.env.NODE_ENV || 'development';
const PRODUCTION = 'production';
const isProduction = ENVIRONMENT === PRODUCTION;

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    cacheCompression: isProduction,
    compact: isProduction
  }
};

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin(
    Object.assign(
      {},
      { inject: true, template: './index.html' },
      isProduction
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            }
          }
        : undefined
    )
  ),
  new webpack.DefinePlugin({
    PRODUCTION: isProduction
  })
];

module.exports = {
  context: SOURCE_PATH,
  entry: {
    app: './index.tsx'
  },
  output: {
    path: DIST_PATH,
    filename: 'public/[name].[contenthash].js',
    publicPath: '/',
    futureEmitAssets: true
  },
  devtool: isProduction ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [babelLoader]
      }
    ]
  },
  plugins,
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    port: 3000,
    contentBase: DIST_PATH,
    publicPath: '/',
    logLevel: 'debug',
    historyApiFallback: true,
    clientLogLevel: 'none',
    stats: 'minimal',
    compress: true
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
