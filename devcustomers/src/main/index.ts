import path, { join } from 'path'
import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { registerRoute } from '../lib/electron-router-dom'
import { createTray } from './tray'

import './ipc'
import './store'
import { createShortcuts } from './shortcuts'

function getIcon(platform: NodeJS.Platform): string {
  switch (platform) {
    case 'linux':
      return join(__dirname, '../../resources/icon.png')
    case 'win32':
      return join(__dirname, '../../resources/icon.ico')
    case 'darwin':
      return join(__dirname, '../../resources/icon.icns')
    default:
      throw new Error('Unsupported platform')
  }
}

function getRendererFilePath() {
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    return process.env['ELECTRON_RENDERER_URL']
  }

  return path.join(__dirname, '../renderer/index.html')
}

async function createWindow(): Promise<void> {
  const platform = process.platform
  const iconPath = getIcon(platform)

  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  console.log('width', width, 'height', height)

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    show: true,
    // autoHideMenuBar: false,
    autoHideMenuBar: true,
    backgroundColor: '#030712',
    icon: iconPath,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  if (platform === 'darwin') {
    app.dock.setIcon(iconPath)
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    // mainWindow.webContents.openDevTools()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  await createTray(mainWindow)
  await createShortcuts(mainWindow)

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  const rendererFilePath = getRendererFilePath()

  mainWindow.loadURL(rendererFilePath)

  registerRoute({
    id: 'main',
    browserWindow: mainWindow,
    htmlFile: rendererFilePath
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
