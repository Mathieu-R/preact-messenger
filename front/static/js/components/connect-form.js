import { h, render, Component } from 'preact'
import io from 'socket.io-client'
import checkIcon from 'src/img/check'

export default class ConnectForm extends Component {
  constructor(props) {
    super(props);
  }

  render({connectUser}) {
    return (
      <form onSubmit={this.props.connectUser} class="chat__input">
        <input type="text" class="form_username" name="name" placeholder="nom d'utilisateur..."/>
        <input type="text" class="form_email" name="email" placeholder="email..."/>
        <button type="submit">
          <img src={checkIcon} alt="connect"/>
        </button>
      </form>
    )
  }
}
