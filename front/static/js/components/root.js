import { h, render, Component } from 'preact'
import SidePanel from './side-panel'
import MessageContainer from './message-container'
import ConnectForm from './connect-form'
import PostMessageForm from './post-message-form'
import io from 'socket.io-client'
const socket = io('localhost:8080');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      messages: [],
      isAuthenticated: false
    }
  }

  ComponentDidMount() {
    socket.on('user', user => this.setState({users: [...this.state.users, user]}));
    socket.on('message', message => {
      if (this.state.messages[messages.length - 1].user.name === message.user.name) {
        //this.setState({messages})
        return;
      }
      this.setState({messages: [...this.state.messages, message]});
    });
  }

  connectUser(evt) {
    evt.preventDefault();
    const self = this;
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

    self.setState({
      isAuthenticated: true
    })
  }

  render({}, {users, messages, isAuthenticated}) {
    return (
      <section class="chat">
        <SidePanel users={users}/>
        <div class="chat__main">
          <MessageContainer messages={messages}/>
          { isAuthenticated ? (
            <PostMessageForm/>
          ) : (
            <ConnectForm socket={socket} connectUser={this.connectUser}/>
          )}
        </div>
      </section>
    );
  }
}
