/**
 * 样式
 */
import 'antd/dist/antd.css';
import './assets/styles/index.scss';

import React from 'react';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { renderRoutes } from './routes/route-loader';
import { routesConfig } from './routes/routes-config';

class App extends React.PureComponent {
    render() {
        return (
            <ConfigProvider locale={zh_CN}>
                {renderRoutes(routesConfig)}
            </ConfigProvider>
        );
    }
}

export default App;