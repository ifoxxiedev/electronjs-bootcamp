const { contextBridge, ipcRenderer } = require("electron");

// Expose all the ipcMain events to renderer process

contextBridge.exposeInMainWorld("api", {
  // when the ping function is invoked, it will send a message to the main process
  ping: () => {
    // it calling the ping function in the main process
    return ipcRenderer.invoke("ping");
  },

  username: () => {
    return ipcRenderer.invoke("username");
  },

  changeName: (name) => {
    return ipcRenderer.invoke("changeName", name);
  },
});
