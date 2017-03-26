import { h, render } from 'preact'
import Root from './root'
import 'src/sass/style.scss'

function init() {
  const root = render(<Root />, document.body, root);
}
init();

// preact hmr
if (module.hot) {
  require('preact/devtools'); // use react devtools only in dev
  module.hot.accept('./root', _ => init);
}
