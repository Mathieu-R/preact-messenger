import { h, render } from 'preact'
import Root from './components/root'
import './responsive'
import 'src/sass/style.scss'
import 'src/sass/responsive.scss'

function init() {
  const root = render(<Root />, document.querySelector('#root'), root);
}
init();

// preact hmr
if (module.hot) {
  require('preact/devtools'); // use react devtools only in dev
  module.hot.accept('./components/root', () => init);
}
