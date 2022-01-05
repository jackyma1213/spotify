import { atom } from "recoil";

export const playlistState = atom({ key: "playlistAtom", default: null });

export const playlistIdState = atom({
  key: "playlistIdState",
  default: null,
});
