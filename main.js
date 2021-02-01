const { app, BrowserWindow } = require('electron')
const fetch = require('node-fetch');
const semver = require('semver')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

function tagcollection()
{ 
    const url='https://api.github.com/repos/sfx101/docker-stacks/git/refs/tags'

try{
    let settings = { method: "Get" };
    let arr=[]
    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
            // do something with JSON
            json.forEach(element => {
                let x=element['ref']
               
                arr.push(x.slice(-5))
            });
            
           console.log(semver.maxSatisfying(arr,"*"))            
        });
    }catch(err)
    {
        console.log(err)
    }
}
tagcollection()