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
  content: { // array of messages
    type: Array,
    required: true
  },
  time: { // already formated date
    required: true,
    type: String,
    default: new Date()
  }
});

// Define model
const message = mongoose.model('Message', messageSchema);

export default message;
