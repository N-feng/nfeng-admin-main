import React from 'react';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Switch } from 'react-router-dom';

import { renderRoutes } from './routes/route-loader';
import { routesConfig } from './routes/routes-config';

class App extends React.PureComponent {
    render() {
        return (
            <ConfigProvider locale={zh_CN}>
                <Switch>{renderRoutes(routesConfig)}</Switch>
            </ConfigProvider>
        )
    }
}

export default App;