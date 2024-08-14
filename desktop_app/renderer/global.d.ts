declare global {
  interface Window {
    Electron: {
      requestDeviceInfo: () => void;
      onDeviceInfo: (callback: (data: string) => void) => void;
      getFCMToken: (
        channel: string,
        func: (event: any, token: string) => void
      ) => void;
      onNotification: (callback: (notification: any) => void) => void; 
      removeNotificationListener: (callback: (notification: any) => void) => void; 
      showNotification: (title: string, body: any) => void; 
    };
  }
}

export {};
