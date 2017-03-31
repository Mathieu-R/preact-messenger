import Message from '../models/messages';

export async function getMessages() {
  try {
    const messages = await Message.find()
      .sort({time: -1}); // sort by date
    return messages;
  } catch (e) {
    console.log(e);
  }

}

export async function postMessage(msg) {
  Message.create(msg)
    .catch(e => console.log(e));
}
