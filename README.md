# Smikkelweb

Welcome to the Smikkelweb repo.

# Installing locally
  - clone this repo: 'git clone https://github.com/simongussenhoven/smikkelweb'
  - run 'npm i'
  - create a config.env file in the root of the project containing the following values:

    - NODE_ENV=development
    - NUXT_PUBLIC_API_BASE= 
    - NUXT_PUBLIC_FRONTEND_PORT=
    - BACKEND_PORT=
    - DB_STRING=
    - DB_PASSWORD=
    - DB_USER=
    - JWT_SECRET=
    - JWT_EXPIRATION=
    - JTW_COOKIE_EXPIRES_IN=
    - EMAIL_HOST=
    - EMAIL_USERNAME=
    - EMAIL_PASSWORD=
    - EMAIL_PORT=

# Running locally

  - Run this command in you terminal to start the backend & frontend: 'npm run dev'
  - See package.json for other commands

# Development general
  - Please do not push directly to main
  - After development, create a pull request to main
  - After a feature was merged to main, your code will be deployed an built on the server. You can check the status here: https://github.com/simongussenhoven/smikkelweb/actions 

# Backend

 - Database: MongoDB
 - Backend Framework: Express.js & Mongoose

 Note: during development the backend sometimes crashes showing an error: " >  NX   The externalDependency 'webpack-cli' for 'backend:build' could not be found".
 Run 'nx reset' in the terminal and start the backend again with npm run dev:backend.

# Frontend

 - Nuxt.js with Vue 3

# Pipeline

 - Github workflows
