import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron'

export function createShortcuts(window: BrowserWindow) {
  // add o atalho se a janela estiver em foco
  app.on('browser-window-focus', () => {
    globalShortcut.register('CommandOrControl+N', () => {
      window.webContents.send('new-customer')
    })
  })

  // remove o atalho se a janela perder o foco
  app.on('browser-window-blur', () => {
    globalShortcut.unregister('CommandOrControl+N')
  })
}
