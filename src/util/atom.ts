import { atom } from "recoil";

export const newMemoState = atom({
  key: "newMemoState",
  default: false,
});

export const curLocation = atom({
  key: "location",
  default: { lat: 0, lon: 0 },
});

export const userIp = atom({
  key: "ip",
  default: "",
});

export const weatherBgState = atom({
  key: "weatherBg",
  default: "",
});
