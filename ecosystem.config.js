module.exports = {
  apps: [
  {
    name   : "backend",
    script: "dist/apps/backend/main.js",
    instances: 1,
    env: {
      "PORT": 4000,
      "NODE_ENV": "production"
      },
  },
  {
    name   : "frontend",
    script: "dist/apps/frontend/.output/server/index.mjs",
    instances: 1,
    env: {
      "PORT": 3000,
      "NODE_ENV": "production"
      },
  }]
}
