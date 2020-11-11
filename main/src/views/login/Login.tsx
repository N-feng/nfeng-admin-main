import './login.scss';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { RootDispatch, RootState } from '@/store';
import { connect } from '@/store/connect';
import { Form, Input, Button } from 'antd';

function mapStateToProps(state: RootState) {
    return state['login'];
}

function mapDispatchToProps(dispatch: RootDispatch) {
    return dispatch['login'];
}

/**
 * 路由参数 Props 类型声明
 */
type RouterProps = RouteComponentProps<any>;

/**
 * 映射状态（从 store 中获取某些状态并传递给当前组件）类型声明
 */
type MapStateFromStoreProps = ReturnType<typeof mapStateToProps>;

/**
 * 组件派发 action 集合的类型声明
 */
type ComponentDispatchProps = ReturnType<typeof mapDispatchToProps>;

/**
 * 组件最终接收的所有 Props 类型声明
 */
type LoginProps = RouterProps &
    MapStateFromStoreProps &
    ComponentDispatchProps & {
        routes?: any;
    };

class Login extends React.Component<LoginProps> {

    onFinish = (values: any) => {
        this.props.loginAsync(values).then((res: any) => {
            if (res.code === 200) {
                this.props.history.push('/Home');
            }
        });
    };

    render() {
        const { loginLoading } = this.props;
        return (
            <div className="login-container">
                <div className="client-bg">

                </div>
                <div className="login-panel">
                    <p className="title">欢迎登录</p>
                    <Form className="login-form" onFinish={this.onFinish}>
                        <Form.Item name="loginName" rules={[{ required: true, message: '请输入登录账号' }]}>
                            <Input className="active-input" placeholder="请输入登录账号" autoComplete="off" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                            <Input.Password className="active-input" placeholder="请输入密码" autoComplete="off" />
                        </Form.Item>
                        <Form.Item>
                            <Button loading={loginLoading} className="submit-button" htmlType="submit">登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
