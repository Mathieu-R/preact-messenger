import { h, render, Component } from 'preact'
import io from 'socket.io-client'
import checkIcon from 'src/img/check'

export default class ConnectForm extends Component {
  constructor(props) {
    super(props);

  }

  connectUser (evt) {
    evt.preventDefault();
    const { socket } = this.props;
    const name = evt.target.name.value;
    const email = evt.target.email.value;

    if (name === '' || email === '') {
      return;
    }

    // New user
    const user = {
      name,
      email
    };
    console.log(user);
    // Connect user
    socket.emit('user', user);
  }

  render() {
    return (
      <form onSubmit={this.connectUser.bind(this)} class="chat__input">
        <input type="text" class="form_username" name="name" placeholder="nom d'utilisateur..."/>
        <input type="text" class="form_email" name="email" placeholder="email..."/>
        <button type="submit">
          <img src={checkIcon} alt="connect"/>
        </button>
      </form>
    )
  }
}
