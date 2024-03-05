import app from './app'

console.info(`Using environment: ${process.env.NODE_ENV}`)

const port = process.env.BACKEND_PORT
const server = app.listen(port, () => {
  console.info(`localhost:${port}`);
});
server.on('error', console.error);

