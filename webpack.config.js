const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };
  if (isProd) {
    config.minimize = true;
    config.minimizer = [
      new OptimizeCssAssetPlugin(),
      new TerserWebpackPlugin()
    ];
  }
  return config;
};

const filename = ext => `[name].${ext}`;

const cssLoaders = extra => {

  let cssLoadersArray = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    },
    {
      loader: 'css-loader',
    }
  ];
  if (extra) {

    cssLoadersArray.push({
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            [
              "postcss-preset-env",
            ],
          ],
        },
      }
    });
    cssLoadersArray.push({ loader: extra });
  }
  return cssLoadersArray;
};

const babelOptions = () => {

  const babelOptions = {
    presets: [
      '@babel/preset-env',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-runtime'
    ]
  };

  return babelOptions;
};

const jsLoader = () => {
  const loaders =
    [
      {
        loader: 'babel-loader',
        options: babelOptions()
      }
    ];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

const plugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      chunks: ['main'],
      minify: {
        collapseWhitespace: isProd
      },
      cache: false
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets')
        },
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/' + filename('css')
    })
  ];

  return base;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['./js/main.js', './scss/style.scss']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/' + filename('js'),
  },
  optimization: optimization(),
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoader()
      },
    ]
  },
  plugins: plugins()
};