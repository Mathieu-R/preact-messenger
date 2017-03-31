import { h, render, Component } from 'preact'
import MessageBox from './message-box'

export default class MessageContainer extends Component {
  constructor(props) {
    super(props);
  }

  render({currentUser, messages}, {}) {
    return (
      <div class="chat__box">
        {messages.map((message, i) => {
          return(
            <MessageBox key={i} currentUser={currentUser} pseudo={message.user} time={message.time} messages={message.content}/>
          )
        })}
      </div>
    )
  }
}
