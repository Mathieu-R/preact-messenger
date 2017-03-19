import { h, render, Component } from 'preact'

export class App extends Component {
    render() {
      <section class="chat">
        <SidePanel/>
        <div class="chat__main">
          <MessageContainer/>
        </div>
      </section>
    }
}
