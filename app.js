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

electron.ipcMain.on('app-config-request', function(event, arg) {
    const appConfig =  readAppConfig();
    event.sender.send('app-config-response', appConfig);
});


electron.ipcMain.on('app-config-update', function(event, appConfig) {
    try {
        console.log('writeFile(appConfig)');
        console.log(appConfig);
        console.log(JSON.stringify(appConfig));
        fs.writeFileSync('app_config.json', JSON.stringify(appConfig));
    } catch (error) {
        console.error(`Got an error trying to write the file: ${error.message}`);
    }
});

let mainWindow

app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('allow-insecure-localhost', 'true');

function readAppConfig() {
    try {
        const data = fs.readFileSync('app_config.json');
        const appConfig =  JSON.parse(data);
        console.log('Input Config json format Corrent');
        console.log(appConfig);
       return appConfig;
    } catch (error) {
        let appConfig = {
            serverUrl : 'https://localhost:8096',
            theme : 'white',
            language : 'en',
            mode : 'production'
        };
        console.error(`Got an error trying to read the file: ${error.message}`);
        console.error(appConfig);
        return appConfig;
    }
}

function createWindow () {
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
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

    const appConfig = readAppConfig();
    if(appConfig.mode == 'debug'){
        mainWindow.webContents.openDevTools();
    }

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
