import { h, render, Component } from 'preact'

export default class MessageBox extends Component {
  constructor(props) {
    super(props);
  }

  render({currentUser, pseudo, time, messages}) { // props, state
    return (
      <div class={pseudo.name === currentUser.name ? "messageByMe" : "messageByAnother"}>
        <div class="message__header">
          <h3>{pseudo.name}</h3><h5>{time}</h5>
        </div>
        <div class="message__block">
          <p id="message">
            {messages.map((message, i) => (<p key={i}>{message}</p>))}
          </p>
        </div>
      </div>
    )
  }
}
