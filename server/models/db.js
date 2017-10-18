import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/whos-going'

mongoose.connect(MONGODB_URI, { promiseLibrary: global.Promise },  (err) => {
  if (err) return console.log(err);
  console.log('Connected to DB');
})
