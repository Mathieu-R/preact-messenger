import { h, render, Component } from 'preact'

export class PostMessageForm extends Component {
  render() {
    return (
      <form onSubmit={this.sendMessage} class="chat__input">
        <textarea id="boxMessage" name="message" placeholder="Envoyer un message..." rows="4"></textarea>
        <input type="submit" value="Envoyer"/>
      </form>
    )
  }
}
