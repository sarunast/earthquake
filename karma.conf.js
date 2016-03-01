/* eslint no-var: 0 */
var webpack = require('webpack')
var path = require('path')

module.exports = function(config) {
  config.set({

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },

    frameworks: [
      'mocha',
      'chai',
      'sinon'
    ],

    reporters: [
      'spec',
      'coverage'
    ],

    browsers: [
      'PhantomJS'
    ],

    coverageReporter: {
      dir: 'coverage',
      typ: 'html'
    },

    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      debug: true,
      module: {
        preLoaders: [
          {
            test: /spec\.js$/,
            include: /src/,
            exclude: /(bower_components|node_modules)/,
            loader: 'babel',
            query: {
              cacheDirectory: true
            }
          },
          {
            test: /\.js?$/,
            include: /src/,
            exclude: /(node_modules|bower_components|spec)/,
            loader: 'babel-istanbul',
            query: {
              cacheDirectory: true
            }
          }
        ],
        loaders: [
          {
            test: /\.css$/,
            loaders: ['style', 'css']
          },
          { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-sourcemap-loader',
      'karma-spec-reporter'
    ]
  })
}
