/**
 * 第三方库
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

/**
 * 自定义脚本
 */
import './public-path';
import App from './App';
import store from './store/index';
import history from './store/history';

function render(props: any) {
    const { container } = props;
    const basename = (window as any).__POWERED_BY_QIANKUN__ ? '/micro-react' : '/';
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Router basename={basename}>
                    <Switch>
                        <App />
                    </Switch>
                </Router>
            </ConnectedRouter>
        </Provider>,
        container ? container.querySelector('#root') : document.querySelector('#root')
    );
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
    render({});
}

function storeTest(props: any) {
    props.onGlobalStateChange((value: any, prev: any) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev), true);
    props.setGlobalState({
        ignore: props.name,
        user: {
            name: props.name,
        },
    });
}

export async function bootstrap() {
    console.log('[react] react app bootstraped');
}

export async function mount(props: any) {
    console.log('[react] props from main framework', props);
    storeTest(props);
    render(props);
}

export async function unmount(props: any) {
    const { container } = props;
    ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
