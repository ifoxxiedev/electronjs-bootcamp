import { Menu, Tray, nativeImage, BrowserWindow } from 'electron'
import path from 'path'

export async function createTray(browserWindow: BrowserWindow) {
  const appIcon = path.join(__dirname, 'resources', 'icon.png')
  const icon = nativeImage.createFromPath(appIcon)

  const tray = new Tray(icon)
  const menu = Menu.buildFromTemplate([
    {
      label: 'Dev Clients',
      enabled: false,
      icon: icon
    },
    {
      type: 'separator'
    },
    {
      label: 'Abrir',
      click: () => {
        browserWindow.maximize()
        browserWindow.show()
      }
    },
    {
      label: 'Cadastrar Cliente',
      click: () => {
        browserWindow.maximize()
        browserWindow.show()
      }
    },
    {
      label: 'Sobre',
      click: () => {
        browserWindow.maximize()
        browserWindow.show()
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Sair',
      role: 'quit'
    }
  ])

  tray.setToolTip('Dev Customers')

  tray.setContextMenu(menu)
}
