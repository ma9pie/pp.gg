import { atom } from "recoil";

const timestamp = new Date().getTime();

export const themeState = atom({
  key: `themeState_${timestamp}`,
  default: "Light",
});
