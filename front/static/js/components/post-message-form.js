import { h, render, Component } from 'preact'
import sendIcon from 'src/img/send'

export default class PostMessageForm extends Component {
  constructor(props) {
    super(props);
  }

  sendMessage (evt) {
    evt.preventDefault();
    const message = {
      user: this.props.user,
      content: evt.target.message.value
    }
  }

  render() {
    return (
      <form onSubmit={this.sendMessage} class="chat__input">
        <textarea id="boxMessage" name="message" placeholder="Envoyer un message..." rows="4"></textarea>
        <button type="submit">
          <img src={sendIcon} alt="send-message"/>
        </button>
      </form>
    )
  }
}
