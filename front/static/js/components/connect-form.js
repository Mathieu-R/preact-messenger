export class ConnectForm extends Component {
  render() {
    return (
      <form onSubmit={this.sendMessage} class="chat__input">
        <input type="text" name="name" placeholder="nom d'utilisateur..."/>
        <input type="text" name="email" placeholder="email..."/>
        <input type="submit" value="Envoyer"/>
      </form>
    )
  }
}
