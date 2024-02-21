module.exports = {
  apps: [
  {
    name   : "backend",
    script: "./dist/app/backend/main.js",
    instances: 1,
    env: {
      "PORT": 4000,
      "NODE_ENV": "development"
      },
      env_production: {
        "PORT": 4000,
        "NODE_ENV": "production"
      },
  },
  {
    name   : "frontend",
    script: "./dist/app/frontend/.output/server/index.mjs",
    instances: 1,
    env: {
      "PORT": 4001,
      "NODE_ENV": "development"
      },
    env_production: {
      "PORT": 4001,
      "NODE_ENV": "production"
    },
  }]
}
