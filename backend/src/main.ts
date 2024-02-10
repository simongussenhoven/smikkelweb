import * as mongoose from 'mongoose';
import app from './app';
const path = process.env.DB_STRING
console.log(path)
mongoose.connect(path).then(() => console.log('db connection succesfull'));

const port = process.env.BACKEND_PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});