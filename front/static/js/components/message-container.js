import { h, render, Component } from 'preact'
import MessageBox from './message-box'
import io from 'socket.io-client'
//const socket = io();

export default class MessageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {
          "user": "Mathieu",
          "time": new Date(),
          "content": ["Como vaï Bro !!"]
        },
        {
          "user": "Arnoush",
          "time": new Date(),
          "content": ["Bien oklm :)"]
        }
      ]
    };

  }

  render({}, {messages}) {
    return (
      <div class="chat__box">
        {messages.map(message => {
          <MessageBox pseudo={message.user} time={message.time} messages={message.content}/>
        })}
      </div>
    )
  }
}
