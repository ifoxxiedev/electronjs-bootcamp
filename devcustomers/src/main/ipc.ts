import { app, ipcMain } from 'electron'

ipcMain.handle('app-details', async () => ({
  version: app.getVersion(),
  name: app.getName()
}))
