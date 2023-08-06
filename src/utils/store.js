import { atom } from "recoil";

export const userToken = atom({
	key: "userToken",
	default: localStorage.getItem("Authorization"),
});

export const userData = atom({
	key: "userData",
	default: JSON.parse(localStorage.getItem("user")),
});
