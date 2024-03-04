import { CorsOptions } from "vite";

export default {
  origin: [/^https:\/\/smikkelweb\.com/, /^http:\/\/localhost:3000/],
  credentials: true
} as CorsOptions;