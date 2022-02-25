const {app, BrowserWindow} = require('electron')
const url = require("url");
const path = require("path");
const fs = require('fs');
const
    electron = require('electron'),
    ipcMain = electron.ipcMain
;

ipcMain.on('asynchronous-message', function(event, arg) {
  console.debug('ipc.async', arg);
  event.sender.send('asynchronous-reply', 'async-pong');
});

let mainWindow


// var configFile = JSON.parse(readFileSync('./config.json'));
//fs.writeFile('groceries.csv', 'hello');

// async function readFile(filePath) {
//
//     try {
//         const data = await fs.promises.readFile(filePath);
//         const jsonData =  JSON.parse(data);
//         console.log('Input Config json format Corrent');
//         // if (fs.existsSync('config.json')) {
//         //     await fs.promises.unlink('config.json');
//         // }
//
//         await fs.promises.writeFile('config.json', data);
//     } catch (error) {
//         console.error(`Got an error trying to read the file: ${error.message}`);
//     }
// }
// readFile('config_init.json');

// fs.promises.rmdir("configdir");

app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('allow-insecure-localhost', 'true');

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      additionalArguments: ["myvarvalue", "secondvarvalue", "--another=something"]
    },
    icon: path.join(__dirname, `/dist/assets/img/icons8-app-64.png`)
  })

    // mainWindow.loadFile("public/print.html", {query: {"data": JSON.stringify(data)}});


    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/index.html`),
        protocol: "file:",
        slashes: true
      })
  );

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}


app.on("ready", () => {
    createWindow();
});

// app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
