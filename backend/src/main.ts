import * as mongoose from 'mongoose';
import app from './app';

mongoose.connect(process.env.DB_PATH).then(() => console.log('db connection succesfull'));

const port = process.env.BACKEND_PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});