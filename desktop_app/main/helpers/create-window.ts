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
import { setup as setupPushReceiver } from "electron-push-receiver";
import { machineIdSync } from "node-machine-id";

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
  console.log('Machine ID:', machineId);

  // // Machine ID를 IPC를 통해 렌더러 프로세스로 보냄
  // win.webContents.on("did-finish-load", () => {
  //   win.webContents.send("machine-id", machineId);
  // });
  ipcMain.on('request-device-info', (event) => {
    event.sender.send('device-info', machineId);
  });
  setupPushReceiver(win.webContents);
  return win;
};

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

// app.on('ready', () => createWindow('main', {}));

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

