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
      isAuthenticated: false,
      currentUser: {},
      users: [],
      messages: [],
    }

    this.connectUser = this.connectUser.bind(this);
  }

  ComponentDidMount() {
    socket.on('user', user => console.log(user))//this.setState({users: [...this.state.users, user]}));
    socket.on('message', message => {
      console.log('ROOT', message)
      if (this.state.messages[messages.length - 1].user.name === message.user.name) {
        //this.setState({messages})
        return;
      }
      this.setState({messages: [...this.state.messages, message]});
    });
  }

  connectUser(evt) {
    evt.preventDefault();
    
    const form = document.connectForm;
    const name = form.name.value;
    const email = form.email.value;

    if (name === '' || email === '') {
      return;
    }

    // New user
    const user = {
      name,
      email
    };

    // Connect user
    socket.emit('user', user);

    this.setState({
      isAuthenticated: true,
      currentUser: user
    })
  }

  render({}, {isAuthenticated, currentUser, users, messages}) {
    return (
      <section class="chat">
        <SidePanel users={users}/>
        <div class="chat__main">
          <MessageContainer messages={messages}/>
          { isAuthenticated ? (
            <PostMessageForm socket={socket} user={currentUser}/>
          ) : (
            <ConnectForm socket={socket} connectUser={this.connectUser}/>
          )}
        </div>
      </section>
    );
  }
}
