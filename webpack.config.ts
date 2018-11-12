import * as path from 'path';
import * as webpack from 'webpack';

const webpackConfig: webpack.Configuration = {
  devtool: 'eval',
  entry: ['babel-polyfill', './sample'],
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin([
      /css\.d\.ts$/,
    ]),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: ['babel-loader'],
      include: path.join(__dirname, 'src'),
    },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'typings-for-scss-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      }],
  },
};

export default webpackConfig;
