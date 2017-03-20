import { h, render, Component } from 'preact'

export class PostMessageForm extends Component {
  constructor(props) {
    super(props);
  }

  sendMessage (evt) {
    const message = {
      user: this.props.user
      content: evt.target.message.value
    }
  }

  render() {
    return (
      <form onSubmit={this.sendMessage} class="chat__input">
        <textarea id="boxMessage" name="message" placeholder="Envoyer un message..." rows="4"></textarea>
        <input type="submit" value="Envoyer"/>
      </form>
    )
  }
}
