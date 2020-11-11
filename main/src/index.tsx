/**
 * 样式
 */
import 'antd/dist/antd.css';
import './assets/styles/index.scss';

/**
 * 第三方库
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

/**
 * 自定义脚本
 */
import store from './store/index';
import history from './store/history';
import App from './App';

function renderApp() {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    );
}

renderApp();
