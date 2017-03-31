import { h, render, Component } from 'preact'
import MessageBox from './message-box'
import io from 'socket.io-client'

export default class MessageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

  }

  render({messages}, {}) {
    console.log(messages)
    return (
      <div class="chat__box">
        {messages.map(message => {
          <MessageBox pseudo={message.user} time={message.time} messages={message.content}/>
        })}
      </div>
    )
  }
}
