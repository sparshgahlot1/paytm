import mongoose from 'mongoose';

// Replace 'your_database' with your actual database name
const dbURI = 'mongodb://localhost:27017/payTM100X';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbURI, options)
  .then(() => {
    console.log('MongoDB connection established successfully');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });

export default mongoose;
