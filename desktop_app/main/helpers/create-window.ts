import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Rectangle,
  nativeImage,
  ipcMain,
  app,
} from "electron";
import Store from "electron-store";
import * as path from "path";
import { setup as setupPushReceiver ,NOTIFICATION_RECEIVED } from "electron-push-receiver";
import { machineIdSync } from "node-machine-id";
const NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({ provider: 'openstreetmap' });

export const createWindow = (
  windowName: string,
  options: BrowserWindowConstructorOptions
): BrowserWindow => {
  const key = "window-state";
  const name = `window-state-${windowName}`;
  const store = new Store<Rectangle>({ name });

  const defaultSize: Rectangle = {
    width: options.width || 1440, // 기본 크기 지정
    height: options.height || 900, // 기본 크기 지정
    x: 0,
    y: 0,
  };

  let state: Rectangle = {} as Rectangle;

  const restore = (): Rectangle => store.get(key, defaultSize);

  const windowWithinBounds = (
    windowState: Rectangle,
    bounds: Rectangle
  ): boolean => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    );
  };

  const resetToDefaults = (): Rectangle => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return {
      ...defaultSize,
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    };
  };

  const ensureVisibleOnSomeDisplay = (windowState: Rectangle): Rectangle => {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds);
    });
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults();
    }
    return windowState;
  };

  state = ensureVisibleOnSomeDisplay(restore());

  let appIcon = nativeImage.createFromPath(
    path.join(process.cwd(), "main", "icons", "logo.png")
  );

  const win = new BrowserWindow({
    ...state,
    ...options,
    autoHideMenuBar: true,
    icon: appIcon,
    frame: false,
    backgroundColor: "#101012",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: path.join(process.cwd(), "main", "preload.js"),
      ...options.webPreferences,
    },
  });


  let machineId = machineIdSync();

  ipcMain.on('request-device-info', (event) => {
    event.sender.send('device-info', machineId);
  });
  setupPushReceiver(win.webContents);
  ipcMain.on(NOTIFICATION_RECEIVED, (event, notification) => {
    win.webContents.send('notification', notification);
  });
  ipcMain.on('notification-clicked', (event, notification) => {
    console.log('Notification clicked:', notification);
    win.webContents.send('navigate-to', notification.url || 'http://localhost:8888/home');
  });

  return win;
};
ipcMain.handle('get-location', async () => {
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const userIp = ipData.ip;

    const locationResponse = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=664ea44f8663409c8eba020ccc2a82ff&ip=${userIp}`);
    const locationData = await locationResponse.json();

    return {
      city: locationData.city,
      country: locationData.country_name,
      latitude: locationData.latitude,
      longitude: locationData.longitude
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
});

// IPC 이벤트 핸들러 추가
ipcMain.on("minimize-window", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.minimize();
});

ipcMain.on("maximize-window", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win?.isMaximized()) {
    win.unmaximize();
  } else {
    win?.maximize();
  }
});

ipcMain.on("restore-window", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.unmaximize();
});

ipcMain.on("close-window", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.close();
});

app.on('ready', () => {
  app.setAppUserModelId("linkedout");
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const store = new Store();
ipcMain.on("storeFCMToken", (e, token) => {
  store.set("fcm_token", token);
});

ipcMain.on("getFCMToken", async (e) => {
  e.sender.send("getFCMToken", store.get("fcm_token"));
});

