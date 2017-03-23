import { h, render } from 'preact'
import Root from './root'
import { AppContainer } from 'react-hot-loader' 

console.log('PREACT - MESSENGER.');

const rendering = Component => {
    render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.querySelector('.content')
    );
};

rendering(Root);

// react hot-reload
if (module.hot) {
    module.hot.accept('./root', _ => { rendering(Root) });
}


