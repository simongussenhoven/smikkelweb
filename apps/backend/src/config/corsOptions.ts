import { CorsOptions } from "vite";

export default {
  origin: [/^http:\/\/localhost:3000/],
  credentials: true
} as CorsOptions;