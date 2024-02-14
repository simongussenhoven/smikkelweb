import { CorsOptions } from "vite";

export default {
  origin: process.env.FRONTEND_PORT,
  credentials: false
} as CorsOptions;