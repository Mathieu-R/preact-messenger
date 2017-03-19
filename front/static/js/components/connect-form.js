export class ConnectForm extends Component {
  render() {
    <form ng-submit="sendMessage($event)" class="chat__input">
      <input type="text" name="name" placeholder="nom d'utilisateur...">
      <input type="text" name="email" placeholder="email...">
      <input type="submit" value="Envoyer">
    </form>;
  }
}
