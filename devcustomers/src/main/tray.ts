import { Menu, Tray, nativeImage, BrowserWindow } from 'electron'
import path from 'path'

function showWindow(browserWindow: BrowserWindow) {
  if (browserWindow.isMinimizable()) {
    browserWindow.restore()
  }

  if (!browserWindow.isFocused()) {
    browserWindow.focus()
  }
}

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
        showWindow(browserWindow)
      }
    },
    {
      label: 'Cadastrar Cliente',
      click: () => {
        if (browserWindow.isFocused()) {
          return
        }

        showWindow(browserWindow)
        // it sends a message from [main process] (backend) to [renderer process] (frontend)
        browserWindow.webContents.send('new-customer')
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
