import { CorsOptions } from "vite";

export default {
  origin: ['/', 'http://localhost:3000', 'http(s)?://(www\.)?(smikkelweb.com)$'],
  credentials: true
} as CorsOptions;