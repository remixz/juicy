'use strict'
require('babel-register')
const getConfig = require('hjs-webpack')
const toHtml = require('vdom-to-html')
const app = require('./src/views/app').default
const createState = require('./src/create-state').createState

let config = getConfig({
  in: 'src/index.js',
  out: 'dist',
  clearBeforeBuild: true,
  html: function (context) {
    function render (state) {
      return context.defaultTemplate({
        html: toHtml(app(state)),
        title: 'Juicy',
        head: '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">',
        publicPath: process.env.NODE_ENV === 'development' ? '/' : ''
      })
    }

    return {
      'index.html': render(createState())
    }
  }
})

config.target = require('webpack-target-electron-renderer')(config)

module.exports = config
