import { h, render, Component } from 'preact'

export default class MessageBox extends Component {
  render({pseudo, time, messages}) { // props, state
    return (
      <div class="message__bigblock" ng-repeat="block in chat.blocks">
        <h3>{pseudo}</h3><h5>{time}</h5>
        <div class="message__block" class="getMessageType(block.pseudo)">
          <p id="message">
            {messages.map(message => <p>message</p>)}
          </p>
        </div>
      </div>
    )
  }
}
