import path from 'node:path'
import fs from 'node:fs'
import { randomUUID } from 'node:crypto'
import { app, ipcMain } from 'electron'
import PouchDb from 'pouchdb'
import { Customer } from '../shared/types/ipc'

let dbPath

if (process.platform === 'darwin') {
  dbPath = path.join(app.getPath('userData'), 'devcustomers', 'my_db')
} else {
  dbPath = path.join(app.getPath('userData'), 'devcustomers', 'my_db')
}

const dbDir = path.dirname(dbPath)
console.log(dbDir)

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const json = (data: unknown) => JSON.stringify(data, null, 0)

const db = new PouchDb<Customer>(dbPath)

ipcMain.handle('new-customer', async (_, customer) => {
  try {
    console.log('Adding customer', json(customer))

    const result = await db.put({ ...customer, _id: randomUUID() })

    return {
      data: result,
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: err
    }
  }
})

ipcMain.handle('get-customers', async () => {
  const result = await db.allDocs({})

  return result.rows
})
