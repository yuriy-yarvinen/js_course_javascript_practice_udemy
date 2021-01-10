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

const plugins = name => {
  const base = [];

  if (name === 'course_3_oop_bringitup') {
    base.push(
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        chunks: ['main'],
        minify: {
          collapseWhitespace: isProd
        },
        cache: false
      }),
      new HtmlWebpackPlugin({
        filename: 'modules.html',
        template: './modules.html',
        chunks: ['modules'],
        minify: {
          collapseWhitespace: isProd
        },
        cache: false
      })
    );
  }
  else {
    base.push(
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        chunks: ['main'],
        minify: {
          collapseWhitespace: isProd
        },
        cache: false
      })
    );
  }

  base.push(
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          // from: path.resolve(__dirname, 'src/assets'),
          from: path.resolve(__dirname, `${name}/assets`),
          to: path.resolve(__dirname, `dist/${name}/assets`)
        },
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/' + filename('css')
    })
  );
  return base;
};

module.exports = [{
  context: path.resolve(__dirname, 'course_1_balkon'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './js/main.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist/course_1_balkon'),
    filename: 'js/' + filename('js'),
  },
  optimization: optimization(),
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoader()
      },
    ]
  },
  plugins: plugins('course_1_balkon')
},
{
  context: path.resolve(__dirname, 'course_2_art'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './js/main.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist/course_2_art'),
    filename: 'js/' + filename('js'),
  },
  optimization: optimization(),
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoader()
      },
    ]
  },
  plugins: plugins('course_2_art')
},
{
  context: path.resolve(__dirname, 'course_3_oop_bringitup'),
  mode: 'development',
  entry: {
    main: ['./js/main.js'],
    modules: ['./js/modules.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/course_3_oop_bringitup'),
    filename: 'js/' + filename('js'),
  },
  optimization: optimization(),
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoader()
      },
    ]
  },
  plugins: plugins('course_3_oop_bringitup')
},
{
  context: path.resolve(__dirname, 'course_4_lib'),
  mode: 'development',
  entry: {
    main: ['./js/main.js', './sass/style.scss']
  },
  output: {
    path: path.resolve(__dirname, 'dist/course_4_lib'),
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
  plugins: plugins('course_4_lib')
},
{
  context: path.resolve(__dirname, 'course_5_lib_oop'),
  mode: 'development',
  entry: {
    main: ['./js/main.js', './scss/style.scss']
  },
  output: {
    path: path.resolve(__dirname, 'dist/course_5_lib_oop'),
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
  plugins: plugins('course_5_lib_oop')
}
];

