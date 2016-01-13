'use strict'
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 360,
    minWidth: 360,
    maxWidth: 360,
    height: 600,
    minHeight: 300,
    titleBarStyle: 'hidden',
    webPreferences: {
      webSecurity: false
    }
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({
      detach: true
    })
  }

  if (process.env.NODE_ENV === 'development') {
    function loadDevPage () {
      mainWindow.loadURL('http://localhost:3000')
    }

    console.log('Webpack dev server is loading... (may take a few seconds)')
    mainWindow.webContents.on('did-fail-load', loadDevPage)
    loadDevPage()
  } else {
    mainWindow.loadURL('file://' + __dirname + '/dist/index.html')
  }

  mainWindow.on('closed', function() {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
