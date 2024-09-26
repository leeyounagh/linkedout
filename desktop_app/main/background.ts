import path from "path";
import {
  app,
  ipcMain,
  nativeImage,
  BrowserWindow,
  globalShortcut,
} from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import Store from "electron-store";

const isProd = process.env.NODE_ENV === "production";

let appIcon = nativeImage.createFromPath(
  path.join(process.cwd(), "main", "icons", "logo.png")
);

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1440,
    height: 900,
    icon: appIcon,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
    // 사용자 정의 단축키 등록
    globalShortcut.register("Ctrl+Shift+D", () => {
      mainWindow.webContents.openDevTools();
    });
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
