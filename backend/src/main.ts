import * as mongoose from 'mongoose';
import app from './app';
const path = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@smikkelweb.n7gcekz.mongodb.net/smikkelweb?retryWrites=true&w=majority`
mongoose.connect(path).then(() => console.log('db connection succesfull'));

const port = process.env.BACKEND_PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});