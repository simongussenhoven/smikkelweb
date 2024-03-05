# Smikkelweb

Welcome to the Smikkelweb repo. This contains the backend and frontend for https://www.smikkelweb.com.

See the trello board for TODO's: https://trello.com/b/WrtV1SV8/smikkelweb

For more information about NX-monorepo, visit https://nx.dev/.

# Getting things running
  - clone this repo: 'git clone https://github.com/simongussenhoven/smikkelweb'
  - run 'npm i'
  - create a config.env file in the root of the project containing the following values:
    - NODE_ENV=development

    # nuxt local settings
    - NUXT_PUBLIC_API_BASE= 
    - NUXT_PUBLIC_FRONTEND_PORT=

    # mongodb
    - BACKEND_PORT=
    - DB_STRING=
    - DB_PASSWORD=
    - DB_USER=
    - JWT_SECRET=
    - JWT_EXPIRATION=
    - JTW_COOKIE_EXPIRES_IN=

    # use mailtrap for development
    - EMAIL_HOST=
    - EMAIL_USERNAME=
    - EMAIL_PASSWORD=
    - EMAIL_PORT=

  - run 'npm run dev' to start the development environment here: https://github.com/simongussenhoven/smikkelweb/actions

# development general
  - Please use a feature branch and use merge request and do not push directly to main
  - After a feature was merged from to main, you can see the deoply and build process 

# Backend

 - Database: MongoDB
 - Backend Framework: Express.js & Mongoose

 Note: during development the backend sometimes crashes showing an error: " >  NX   The externalDependency 'webpack-cli' for 'backend:build' could not be found".
 Run 'nx reset' in the terminal and start the backend again with npm run dev:backend.

# Frontend

 - Nuxt.js with Vue 3

# Pipeline

 - Github workflows
