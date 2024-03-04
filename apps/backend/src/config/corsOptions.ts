import { CorsOptions } from "vite";

export default {
  origin: ['/', 'http://localhost:3000', '/\.smikkelweb\.com$/'],
  credentials: true
} as CorsOptions;