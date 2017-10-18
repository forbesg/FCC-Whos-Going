import mongoose from 'mongoose';

const User = mongoose.model('User', {
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  }
});

export default User
