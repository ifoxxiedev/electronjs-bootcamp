import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { Customer, NewCustomer } from '../shared/types/ipc'
import { Result } from '../shared/types/result'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
export const api = {
  onNewCustomer: (callback: () => void) => {
    ipcRenderer.on('new-customer', callback)

    return () => {
      ipcRenderer.off('new-customer', callback)
    }
  },
  addNewCustomer: (customer: NewCustomer): Promise<Result<Customer>> => {
    return ipcRenderer.invoke('new-customer', customer)
  },
  getCustomers: (): Promise<Result<Customer[]>> => {
    return ipcRenderer.invoke('get-customers')
  },
  getCustomer: (id: string): Promise<Result<Customer>> => {
    return ipcRenderer.invoke('get-customer', id)
  },
  deleteCustomer: (id: string): Promise<Result<string>> => {
    return ipcRenderer.invoke('delete-customer', id)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
