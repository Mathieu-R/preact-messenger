import { h, render, Component } from 'preact'

export default class SidePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  ComponentWillMount() {
    const { socket } = this.props;
    socket.on('user', user => this.setState({users: [...this.state.users, user]}));
  }

  render() {
    return (
      <aside class="user__panel">
        <h2 id="title__connected">Utilisateurs</h2>
        <hr/>
        <ul id="user__connected">
          <li class="fix" ng-repeat="user in chat.users">
            <img id="chat__avatar"/>
            <div class="pseudo"></div>
          </li>
        </ul>
      </aside>
    )
  }
}
