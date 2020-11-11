import React from 'react'
import styles from './layout.module.scss';

import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Button } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    CodepenCircleOutlined,
    DownOutlined
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout
// const { $http } = React

interface Props {
    location: any;
    history: any;
    menus: any[];
}

interface State {
    collapsed: boolean;
    title: string;
    selectedKeys: any[];
    defaultOpenKeys: any[];
    breadcrumb: any[];
    userInfo: { avatar: string; username: string; };
    menuTreeNode: any[];
}

const opentree = (tree: any) => {
    let result: any = [];
    const flat = (nodes: any, parentName?: any, parentKey?: any) => {
      if (nodes && nodes.length > 0)
        nodes.forEach((node: any) => {
          result.push({ key: node.action, name: node.title, parentName, parentKey });
          flat(node.children, node.title, node.action);
        });
    };
    flat(tree);
    return result;
};

class LayoutContainer extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        const currentPath = this.splitPath()
        const openKeys = this.handleFindOpenMenu(currentPath)
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}')
        const menuTreeNode = this.renderMenu(props.menus);
        this.state = {
            collapsed: false,
            title: '后台管理系统',
            selectedKeys: [currentPath],
            defaultOpenKeys: [openKeys.menuKey],
            breadcrumb: openKeys.breadcrumb,
            userInfo,
            menuTreeNode
        }
    }

    splitPath = () => {
        const { location } = this.props
        return location.pathname
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            title: this.state.collapsed ? '后台管理系统' : ''
        })
    }
    handleFindOpenMenu = (selectedKeys: any) => {
        const mapMenu = opentree(this.props.menus)
        const findMenu: any = mapMenu.find((subMenu: any) => subMenu.key === selectedKeys) || {}
        let breadcrumb = []
        breadcrumb.push(findMenu.parentName, findMenu.name)
        breadcrumb = breadcrumb.filter(v => v)
        return {
            menuKey: findMenu && findMenu.parentKey,
            subMenu: findMenu && findMenu.key,
            breadcrumb
        }
    }
    handleMenuClick = (item: any) => {
        const { history } = this.props
        const { key } = item
        if (key === 'logout') {
            // $http.get('logout').then(() => {
            //     sessionStorage.clear()
            //     history.push('/login')
            // })
        } else {
            this.setState({
                selectedKeys: [item.key]
            }, () => {
                history.push(item.key)
            })
        }
    }
    handleRouter = (item: any) => {
        const { history } = this.props
        const mapMenu = opentree(this.props.menus)
        const findMenu: any = mapMenu.find((subMenu: any) => subMenu.key === item.key)
        let breadcrumb = []
        breadcrumb.push(findMenu.parentName, findMenu.name)
        breadcrumb = breadcrumb.filter(v => v)
        this.setState({
            selectedKeys: [item.key],
            breadcrumb
        }, () => {
            history.push(item.key)
            // window.history.pushState({}, '', item.key)
        })
    }

    // 菜单渲染
    renderMenu = (data: any) => {
        return data.map((item: any) => {
            if (item.children) {
                return (
                    <Menu.SubMenu title={item.title} key={item.action}>
                        {this.renderMenu(item.children)}
                    </Menu.SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.action}>
                {item.title}
            </Menu.Item>
        })
    }

    render() {
        const { collapsed, title, selectedKeys,
            userInfo, 
            // defaultOpenKeys, 
            breadcrumb } = this.state

        const userDropdownMenu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="basic-info">基本资料</Menu.Item>
                <Menu.Item key="modify-password">修改密码</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">退出</Menu.Item>
            </Menu>
        )
        return (
            <Layout className={styles['layout-container']}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className={styles['logo']}>
                        <CodepenCircleOutlined className={styles['icon']} />
                        <span>{title}</span>
                    </div>
                    <Menu theme="dark"
                        selectedKeys={selectedKeys}
                        // defaultOpenKeys={defaultOpenKeys}
                        onClick={this.handleRouter}>
                        {this.state.menuTreeNode}
                    </Menu>
                </Sider>
                <Layout className={styles['site-layout']}>
                    <Header className={`${styles['layout-header']} bg-white`}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: styles['trigger'],
                            onClick: this.toggle,
                        })}
                        <div className={styles['header-right']}>
                                <div className="info mr-20">
                                    <Avatar src={userInfo.avatar} />
                                    <Dropdown overlay={userDropdownMenu}
                                        trigger={['click']}
                                        getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
                                    >
                                        <Button type="link" className={styles['btn-user']}>
                                            {userInfo.username}<DownOutlined />
                                        </Button>
                                    </Dropdown>
                                </div>
                            </div>
                    </Header>
                    <Content className={styles['layout-content']}>
                        <Breadcrumb className={styles['layout-nav']}>
                            {breadcrumb.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
                        </Breadcrumb>
                        <div className={`${styles['layout-content--info']}`}>
                            {this.props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default LayoutContainer