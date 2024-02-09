import * as mongoose from 'mongoose';

import app from './app';



const DB = process.env.DB || 'error';
console.log(DB)
mongoose.connect(DB).then(() => console.log('db connection succesfull'));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});