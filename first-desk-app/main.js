const path = require("node:path");
const { app, BrowserView, BrowserWindow, ipcMain } = require("electron/main");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    maxWidth: 1000,
    maxHeight: 1000,
    height: 600,
    minHeight: 500,
    minWidth: 500,
    fullscreen: true,
    fullscreenable: false,
    backgroundColor: "#ccc", // native window background color
    autoHideMenuBar: true, // hidden menu bar
    alwaysOnTop: true, // always on top
    webPreferences: {
      contextIsolation: true, // enable context isolation to use the preload ipc
      // devTools: process.env === "development",
      devTools: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const child = new BrowserWindow({
    parent: win,
    modal: true,
    show: false,
    alwaysOnTop: false,
  });

  child.loadURL("https://www.google.com");

  child.once("ready-to-show", () => {
    child.show();
  });

  win.loadFile("index.html");
}

function createMainWindow() {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}

app.whenReady().then(() => {
  // declare ipc handlers
  ipcMain.handle("ping", () => {
    return `${new Date().toISOString()} pong by main process`;
  });

  ipcMain.handle("username", () => "John Doe");

  ipcMain.handle("changeName", (event, params) => {
    console.log("Event", event);
    console.log("changeName", params);
    return "Name changed to " + params;
  });

  createMainWindow();

  app.on("activate", () => {
    createMainWindow();
  });
});

app.on("window-all-closed", () => {
  // darwin: MacOS, win32: Windows, linux: Linux
  // only, unix and windows
  if (process.platform !== "darwin") {
    app.quit();
  }
});
