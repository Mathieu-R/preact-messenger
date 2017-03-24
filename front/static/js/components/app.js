import { h, render } from 'preact'
import Root from './root'
import 'src/sass/style.scss'

const rendering = Component => {
  const root = render(<Component/>, document.body, root);
};

rendering(Root);

// preact hmr
if (module.hot) {
  require('preact/devtools'); // use react devtools only in dev
  module.hot.accept('./root', _ => requestAnimationFrame(rendering(Root)));
}
