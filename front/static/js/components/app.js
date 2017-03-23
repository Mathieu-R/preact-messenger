import { h, render } from 'preact'
import Root from './root' 

console.log('PREACT - MESSENGER');

const rendering = Component => {
    render(
        <Component/>,
        document.querySelector('.content')
    );
};

rendering(Root);

// preact hmr
if (module.hot) {
    module.hot.accept('./root', _ => { rendering(Root) });
}


