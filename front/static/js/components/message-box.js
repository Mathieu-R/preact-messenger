import { h, render, Component } from 'preact'

export class MessageBox extends React.component {
  return (
    render() {
      <div class="message__bigblock" ng-repeat="block in chat.blocks">
        <h3 >{{block.pseudo}}</h3><h5 >{{block.time}}</h5>
        <div class="animated fadeInUp message__block" ng-class="getMessageType(block.pseudo)">
          <p id=message>
            {{block.user}}
          </p>
        </div>
      </div>
    }
  )
}
