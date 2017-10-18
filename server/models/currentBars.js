import mongoose from 'mongoose';

const BarSchema = new mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  image_url: {
    type: String
  },
  is_closed: {
    type: Boolean
  },
  display_address: {
    type: Array
  },
  phone: {
    type: String
  },
  display_phone: {
    type: String
  },
  going: {
    type: Array
  }
});
const CurrentBars = mongoose.model('CurrentBars', {
  city: {
    type: String,
    required: true
  },
  bars: [
    BarSchema
  ]
});

export default CurrentBars