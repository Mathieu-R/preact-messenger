import { h, render, Component } from 'preact'
import SidePanel from './side-panel'
import MessageContainer from './message-container'
import ConnectForm from './connect-form'
import PostMessageFrom from './post-message-form'
import io from 'socket.io-client'
const socket = io('localhost:8080');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    }
  }

  render({}, {isAuthenticated}) {
    return (
      <section class="chat">
        <SidePanel/>
        <div class="chat__main">
          <MessageContainer/>
          { isAuthenticated ? (
            <PostMessageFrom/>
          ) : (
            <ConnectForm socket={socket}/>
          )}
        </div>
      </section>
    );
  }
}
