import { h, render, Component } from 'preact'
import gravatar from 'gravatar'

export default class SidePanel extends Component {
  constructor(props) {
    super(props);
  }

  ComponentWillMount() {
    }

  render({users}, {}) {
    return (
      <aside class="user__panel">
        <h2 id="title__connected">Utilisateurs</h2>
        <hr/>
        <ul id="user__connected">
        {users.map(user => {
          return (
            <li class="single-user">
              <img id="chat__avatar" src={gravatar.url(user.email, {s: '145'})}/>
              <div class="pseudo">{user.name}</div>
            </li>
          )
        })}
        </ul>
      </aside>
    )
  }
}
