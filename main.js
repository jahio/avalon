const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let newFeedWindow;

//
// Listen for the app to be ready
//
app.on('ready', function() {
  // Create a new window
  mainWindow = new BrowserWindow({});
  // Load HTML file into the window
  mainWindow.loadURL(
    url.format(
    {
      pathname: path.join(__dirname, 'mainWindow.html'),
      protocol: 'file:',
      slashes:  true
    }
  ));

  //
  // Make sure to close the app entirely if the main window is closed
  //
  mainWindow.on('closed', function() {
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

//
// Handle createNewFeedWindow()
//
function createNewFeedWindow() {
  newFeedWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add New RSS Feed'
  });

  newFeedWindow.loadURL(
    url.format(
      {
        pathname: path.join(__dirname, 'newFeedWindow.html'),
        protocol: 'file:',
        slashes:  true
      }
    )
  )
}

//
// Create Menu Template
//
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: "Add new feed...",
        click() {
          createNewFeedWindow();
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];