<<<<<<< HEAD
//let $ = jQuery = require('jquery');
window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery.min.js');
window.Hammer = require('../node_modules/hammerjs/hammer.min.js');
=======
const electron = require('electron');

const { app, BrowserWindow } = require('electron')

function createWindow () {
	// Create the browser window.
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	})

	// and load the index.html of the app.
	win.loadFile('src/index.html')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})
>>>>>>> 20129213d3438160754d0e404e8c20085d46b8b5
