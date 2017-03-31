import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user:  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  content: {
    type: String,
    required: true
  },
  time: {
    required: true,
    type: Date,
    default: new Date()
  }
});

// Define model
const message = mongoose.model('Message', messageSchema);

export default message;
