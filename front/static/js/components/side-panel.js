import { h, render, Component } from 'preact'
import gravatar from 'gravatar'

export default class SidePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  ComponentWillMount() {
    }

  render({}, {users}) {
    return (
      <aside class="user__panel">
        <h2 id="title__connected">Utilisateurs</h2>
        <hr/>
        <ul id="user__connected">
        {users.map(user => {
          <li class="fix">
            <img id="chat__avatar" src={gravatar(user.email, {s: '50'})}/>
            <div class="pseudo">{user.pseudo}</div>
          </li>
        })}
        </ul>
      </aside>
    )
  }
}
