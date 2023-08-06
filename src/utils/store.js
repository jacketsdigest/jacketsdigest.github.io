import { atom, selector } from "recoil";
import axios from "axios";

export const userToken = atom({
	key: "userToken",
	default: localStorage.getItem("Authorization"),
});

export const userData = atom({
	key: "userData",
	default: JSON.parse(localStorage.getItem("user")),
});
