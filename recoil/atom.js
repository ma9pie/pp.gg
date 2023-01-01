import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const themeState = atom({
  key: "themeState",
  default: "Light",
  effects_UNSTABLE: [persistAtom],
});

export const memberState = atom({
  key: "memberState",
  default: {
    id: "",
    imgUrl: "",
    name: "",
    password: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const signupState = atom({
  key: "signupState",
  default: {
    id: "",
    password: "",
    name: "",
    imgUrl: "",
    termsCheck: [null, null, null],
  },
  effects_UNSTABLE: [persistAtom],
});
