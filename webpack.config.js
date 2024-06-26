const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: './src/resources/js/main_online.js',
    main_replay: './src/resources/js/replay/main_replay.js',
    main_update_history:
      './src/resources/js/update_history/main_update_history.js',
    dark_color_scheme:
      './src/resources/js/offline_version_js/utils/dark_color_scheme.js',
    is_embedded_in_other_website:
      './src/resources/js/offline_version_js/utils/is_embedded_in_other_website.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    runtimeChunk: { name: 'runtime' }, // this is for code-sharing between "main_online.js" and "ko.js"
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          context: 'src/',
          from: 'resources/assets/**/*.+(json|png|mp3|wav|svg)',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      chunks: [
        'runtime',
        'ko',
        'main',
        'dark_color_scheme',
        'is_embedded_in_other_website',
      ],
      chunksSortMode: 'manual',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
};
