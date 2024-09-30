import path from 'node:path'
import fs from 'node:fs'
import { randomUUID } from 'node:crypto'
import PouchDb from 'pouchdb'
import { app, ipcMain } from 'electron'
import { Customer } from '../shared/types/ipc'
import { Result } from '../shared/types/result'

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

    return Result.of(result)
  } catch (err) {
    return Result.ofError(err)
  }
})

ipcMain.handle('get-customers', async () => {
  try {
    const result = await db.allDocs({ include_docs: true })
    return Result.of(result.rows.map((row) => row.doc))
  } catch (err) {
    return Result.ofError(err)
  }
})

ipcMain.handle('get-customer', async (_, id) => {
  try {
    const result = await db.get(id)
    return Result.of(result)
  } catch (err) {
    return Result.ofError(err)
  }
})

ipcMain.handle('delete-customer', async (_, id) => {
  try {
    const doc = await db.get(id)
    if (doc) {
      await db.remove(doc._id, doc._rev)
    }
    return Result.of(id)
  } catch (err) {
    return Result.ofError(err)
  }
})
