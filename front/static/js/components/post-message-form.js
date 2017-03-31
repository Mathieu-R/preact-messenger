import { h, render, Component } from 'preact'
import sendIcon from 'src/img/send'

export default class PostMessageForm extends Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage (evt) {
    evt.preventDefault();

    const {socket} = this.props;
    const form = document.postMessageForm;
    const message = {
      user: this.props.user,
      content: [form.message.value]
    }
    console.log('post', message);

    socket.emit('message', message);
    form.message.value = '';
  }

  render() {
    return (
      <form name="postMessageForm" onSubmit={this.sendMessage} class="chat__input">
        <textarea id="boxMessage" name="message" placeholder="Envoyer un message..." rows="4"></textarea>
        <button type="submit">
          <img src={sendIcon} alt="send-message"/>
        </button>
      </form>
    )
  }
}
