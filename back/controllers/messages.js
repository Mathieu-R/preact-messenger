import Message from '../models/messages';

export async function getMessages() {
  const messages = await Message.find()
    .sort({time: -1}); // sort by date
  return messages;
}

export async function postMessage(msg) {
  const message = await Message.create(msg);
}
