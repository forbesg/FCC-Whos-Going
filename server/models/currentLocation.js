import mongoose from 'mongoose'

const CurrentLocation = mongoose.model('CurrentLocation', {
  city: {
    type: String,
    required: true
  }
});

export default CurrentLocation
