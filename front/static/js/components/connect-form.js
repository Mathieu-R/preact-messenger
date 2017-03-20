import io from 'socket.io-client'
const socket = io();

export class ConnectForm extends Component {
  constructor(props) {
    super(props);
  }

  connectUser (evt) {
    // New user
    const user = {
      name: evt.target.name.value,
      email: evt.target.email.value
    };

    socket.emit('user', user);
  }

  render() {
    return (
      <form onSubmit={this.connectUser} class="chat__input">
        <input type="text" name="name" placeholder="nom d'utilisateur..."/>
        <input type="text" name="email" placeholder="email..."/>
        <input type="submit" value="Envoyer"/>
      </form>
    )
  }
}
