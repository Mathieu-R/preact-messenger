import { h, render, Component } from 'preact'

export class PostMessageForm extends Component {
  render() {
    <hr>
    <form ng-submit="sendMessage($event)" class="chat__input">
      <textarea id=boxMessage name="message" ng-model="box.message" placeholder="Envoyer un message..." rows="4"></textarea>
      <input type="submit" value="Envoyer">
    </form>
  }
}
