import axios from "axios";

export const api = axios.create({
    baseURL: "https://taskfull-server.vercel.app"
})