import { h, render, Component } from 'preact'
import SidePanel from './side-panel'
import MessageContainer from './message-container'
import { AppContainer } from 'react-hot-loader'

class App extends Component {
  render() {
    return (
      <section class="chat">
        <SidePanel/>
        <div class="chat__main">
          <MessageContainer/>
        </div>
      </section>
    );
  }
}

render(<App/>, document.body);
