const webpack = require('webpack')
const path = require('path')
const fileSystem = require('fs-extra')
const env = require('./utils/env')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const ASSET_PATH = process.env.ASSET_PATH || '/'
const alias = {
  '@option-ui': path.resolve(__dirname, './src/options/ui'),
  '@ui': path.resolve(__dirname, './src/ui'),
  '@utils': path.resolve(__dirname, './src/utils'),
  '@lib': path.resolve(__dirname, './src/lib'),
  '@types': path.resolve(__dirname, './src/types'),
  'react-dom': '@hot-loader/react-dom',
}

// load the secrets
const secretsPath = path.join(__dirname, 'secrets.' + env.NODE_ENV + '.js')

const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
]

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath
}

const options = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    options: path.join(__dirname, 'src', 'options', 'index.tsx'),
    popup: path.join(__dirname, 'src', 'popup', 'index.tsx'),
    stop: path.join(__dirname, 'src', 'stop', 'index.tsx'),
    background: path.join(__dirname, 'src', 'background', 'index.ts'),
  },

  chromeExtensionBoilerplate: {
    notHotReload: ['background'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: ASSET_PATH,
  },

  module: {
    rules: [
      {
        // look for .css or .scss files
        test: /\.(css|scss)$/,
        // in the `src` directory
        use: [
          MiniCssExtractPlugin.loader,

          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },

      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/},
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map(extension => '.' + extension)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },

  plugins: [
    new CleanWebpackPlugin({verbose: false}),
    new webpack.ProgressPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new MiniCssExtractPlugin({
      filename:
        env.NODE_ENV === 'development'
          ? '[name].css'
          : '[name].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: path.join(__dirname, 'build'),
          force: true,
          transform: function (content, path) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              }),
            )
          },
        },
      ],
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/logo16.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/logo.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/logo48.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/logo128.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options', 'index.html'),
      filename: 'options.html',
      meta: {
        title: 'Mindful Internet Use',
        description: 'A Chrome Extension that prevents mindless browsing',
      },
      chunks: ['options'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup', 'index.html'),
      filename: 'popup.html',
      meta: {
        title: 'Mindful Internet Use',
        description: 'A Chrome Extension that prevents mindless browsing',
      },
      chunks: ['popup'],
      cache: false,
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'stop', 'index.html'),
      filename: 'stop.html',
      meta: {
        title: 'Mindful Internet Use',
        description: 'A Chrome Extension that prevents mindless browsing',
      },
      chunks: ['stop'],
      cache: false,
    }),
    new webpack.ProvidePlugin({
      // Make a global `process` variable that points to the `process` package,
      // because the `util` package expects there to be a global variable named `process`.
      // Thanks to https://stackoverflow.com/a/65018686/14239942
      process: 'process/browser',
    }),
  ],
  stats: {
    modulesSpace: 40,
    chunks: true,
    colors: true,
  },
}

if (env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-source-map'
} else {
  delete options.chromeExtensionBoilerplate

  options.mode = 'production'

  if (process.env.ANALYZE_BUNDLES) {
    options.plugins.push(new BundleAnalyzerPlugin())
  }
}

module.exports = options
