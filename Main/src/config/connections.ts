import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/social-network-api')
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });

export default mongoose.connection;