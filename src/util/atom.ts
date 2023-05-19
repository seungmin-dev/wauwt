import { atom } from "recoil";

export const newMemoState = atom({
  key: "newMemoState",
  default: false,
});

export const curLocation = atom({
  key: "location",
  default: { lat: 0, lon: 0 },
});

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const user = atom({
  key: "user",
  default: { uid: "", ip: "" },
});

export const weatherBgState = atom({
  key: "weatherBg",
  default: "",
});

export const refresh = atom({
  key: "refresh",
  default: false,
});
