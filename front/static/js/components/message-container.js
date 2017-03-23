import { h, render, Component } from 'preact'
import MessageBox from './message-box'
import io from 'socket.io-client'
//const socket = io();

export default class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        // user
      ]
    };
  }

  render() {
    return (
      <div class="chat__box">
        this.state.messages.map(message => {
          <MessageBox pseudo={message.user} time={message.time} message={message.content}/>
        });
      </div>
    )
  }
}
