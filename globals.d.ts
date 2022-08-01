/* eslint-disable @denis-sokolov/no-interfaces */
/* eslint-disable no-var */
var backendErrorReport: string | undefined;
var initialized: boolean | undefined;

declare module "*.svg";

interface Error {
  backendErrorReport?: string;
}
