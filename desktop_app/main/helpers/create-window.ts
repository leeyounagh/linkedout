import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Rectangle,
  nativeImage,
  ipcMain,
  app,
  protocol
} from "electron";
import Store from "electron-store";
import * as path from "path";
import {
  setup as setupPushReceiver,
  NOTIFICATION_RECEIVED,
} from "electron-push-receiver";
import { machineIdSync } from "node-machine-id";
import "dotenv/config"


const NodeGeocoder = require("node-geocoder");



app.whenReady().then(() => {
  protocol.registerFileProtocol('app', (request, callback) => {
    const url = request.url.replace(/^app:\/\//, ''); // 스키마 제거
    const decodedUrl = decodeURI(url); // URL 디코딩
    callback({ path: path.join(__dirname, decodedUrl) });
  });
});

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
    minWidth: 1200,
    minHeight: process.platform === "darwin" ? 800 : 900,
    maxWidth: 1520,
    maxHeight: 1080,
    icon: appIcon,
    frame: false,
    backgroundColor: "#101012",
    webPreferences: {
      nodeIntegration: true,//node.js 직접 사용금지
      contextIsolation: true,//보안강화
      sandbox: false,// 렌더러 프로세서가 메인 프로세스에 직접 접근 못하도록함
      preload: path.join(process.cwd(), "main", "preload.js"),
      ...options.webPreferences,
    },
  });

  let machineId = machineIdSync();
  // win.webContents.openDevTools();


  ipcMain.on("request-device-info", (event) => {
    event.sender.send("device-info", machineId);
  });
  
  setupPushReceiver(win.webContents);
  ipcMain.on(NOTIFICATION_RECEIVED, (event, notification) => {
    win.webContents.send("notification", notification);
  });
  ipcMain.on("notification-clicked", (event, notification) => {
    console.log("Notification clicked:", notification);
    win.webContents.send(
      "navigate-to",
      notification.url || "app://./home"
    );
  });

  return win;
};
ipcMain.handle("get-location", async () => {
  try {
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const userIp = ipData.ip;

    const locationResponse = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=664ea44f8663409c8eba020ccc2a82ff&ip=${userIp}`
    );
    const locationData = await locationResponse.json();

    return {
      city: locationData.city,
      country: locationData.country_name,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    };
  } catch (error) {
    console.error("Error fetching location:", error);
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

app.on("ready", () => {
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
