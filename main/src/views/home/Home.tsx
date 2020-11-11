import styles from './home.module.scss';
import logo from '@/assets/images/logo.svg';
import React from 'react';
import { Switch, RouteComponentProps } from 'react-router-dom';
import { RootState } from '@/store';
import { renderRoutes } from '@/routes/route-loader';
import { connect } from '@/store/connect';

function mapStateToProps(state: RootState) {
    return state;
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
 * 组件派发 action 集合的类型声明
 */
// type ComponentDispatchProps = ReturnType<typeof mapDispatchToProps>;

/**
 * 组件最终接收的所有 Props 类型声明
 */
type HomeProps = RouterProps &
    MapStateFromStoreProps & {
        routes?: any;
    };

class Home extends React.Component<HomeProps> {

    handleLinkToRegisterBtnClick = () => {
        this.props.history.push('/register');
    };
    handleLinkToChildOneBtnClick = () => {
        this.props.history.push('/home/child-one');
    };
    handleLinkToChildTwoBtnClick = () => {
        this.props.history.push('/home/child-two');
    };

    render() {
        const routes = renderRoutes(this.props.routes);
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <img src={logo} className={styles.logo} alt="logo" />
                    <p>This is Home Page </p>
                    <p className={styles.linkBtn} onClick={this.handleLinkToRegisterBtnClick}>
                        Go to the <span className={styles.pageName}>Register</span> Page
                    </p>
                    <p className={styles.linkBtn} onClick={this.handleLinkToChildOneBtnClick}>
                        Go to the <span className={styles.childName}>Child-One</span>
                    </p>
                    <p className={styles.linkBtn} onClick={this.handleLinkToChildTwoBtnClick}>
                        Go to the <span className={styles.childName}>Child-Two</span>
                    </p>
                </header>
                <Switch>{routes}</Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Home);
