import { h, render, Component } from 'preact'

export class SidePanel extends Component {
  render() {
    return (
      <aside class="user__panel">
        <h2 id="title__connected">Utilisateurs</h2>
        <hr/>
        <ul id="user__connected">
          <li class="fix" ng-repeat="user in chat.users">
            <img id="chat__avatar" src={user.gravatar}/>
            <div class="pseudo">{user.pseudo}</div>
          </li>
        </ul>
      </aside>
    )
  }
}
