import axios from "axios";
import settings from "../constants/settings";

export const paygateInstance = axios.create({
  baseURL: settings?.bank?.uri,
  headers: {
    Authorization: settings?.bank?.apiKey,
    "Content-Type": "application/json",
  },
});
