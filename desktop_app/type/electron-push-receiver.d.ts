declare module 'electron-push-receiver' {
  import { WebContents } from 'electron';

  export function setup(webContents: WebContents): void;
  export const START_NOTIFICATION_SERVICE: string;
  export const NOTIFICATION_SERVICE_STARTED: string;
  export const NOTIFICATION_SERVICE_ERROR: string;
  export const NOTIFICATION_RECEIVED: string;
  export const TOKEN_UPDATED: string;
}

declare module 'electron-push-receiver/src/constants' {
  export const START_NOTIFICATION_SERVICE: string;
  export const NOTIFICATION_SERVICE_STARTED: string;
  export const NOTIFICATION_SERVICE_ERROR: string;
  export const NOTIFICATION_RECEIVED: string;
  export const TOKEN_UPDATED: string;
}