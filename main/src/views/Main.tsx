import React from 'react';
import { renderRoutes } from '@/routes/route-loader';
import { Switch, RouteComponentProps } from 'react-router-dom';
import { RootState } from "@/store";
import { connect } from "@/store/connect";
import startQiankun from '@/qiankun/init'
import BasicLayout from '@/components/layout/Layout';


function mapStateToProps(state: RootState) {
    const {
        global: { menus },
    } = state;
    return { menus };
}

/**
 * 路由参数 Props 类型声明
 */
interface RouterProps extends RouteComponentProps<any> { }

/**
 * 映射状态（从 store 中获取某些状态并传递给当前组件）类型声明
 */
type MapStateFromStoreProps = ReturnType<typeof mapStateToProps>;

/**
 * 组件最终接收的所有 Props 类型声明
 */
type MainProps = RouterProps &
    MapStateFromStoreProps & {
        routes?: any;
    };

class MainContainer extends React.Component<MainProps> {

    componentDidMount() {
        startQiankun()
    }

    render() {
        const routes = renderRoutes(this.props.routes);
        return (
            <BasicLayout {...this.props}>
                <Switch>{routes}</Switch>
                <div id="subapp-viewport" />
            </BasicLayout>
        )
    }
}

export default connect(mapStateToProps)(MainContainer);