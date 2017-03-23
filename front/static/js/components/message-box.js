import { h, render, Component } from 'preact'

export default class MessageBox extends Component {
    render() {
      return (
        <div class="message__bigblock" ng-repeat="block in chat.blocks">
          <h3 >{this.props.pseudo}</h3><h5 >{this.props.time}</h5>
          <div class="animated fadeInUp message__block" class="getMessageType(block.pseudo)">
            <p id="message">
              {this.props.message}
            </p>
          </div>
        </div>
      )
    }
}
