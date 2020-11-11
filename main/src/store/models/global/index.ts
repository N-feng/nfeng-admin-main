/**
 * 如果一个模块中的 model 体积很大时，可以考虑将其拆分成一个个文件（action-types、effects、reducers）
 */

import reducers from './reducers';
import effects from './effects';

export interface GlobalStateDeclaration {
    projectName?: string;
    menus: any[];
}

const state: GlobalStateDeclaration = {
    projectName: 'react-ts-app',
    menus: [
        { 
            action: '/home', 
            title: 'Home',
            children: [
                {
                    action: '/home/child-one',
                    title: 'ChildOne'
                },
                {
                    action: '/home/child-two',
                    title: 'ChildTwo'
                }
            ]
        },
        {
            action: '/micro-react',
            title: 'React',
            children: [
                {
                    action: '/micro-react/child-one',
                    title: 'MicroChildOne'
                },
                {
                    action: '/micro-react/child-two',
                    title: 'MicroChildTwo'
                }
            ]
        },
        {
            action: '/micro-vue',
            title: 'Vue',
            children: [
                {
                    action: '/micro-vue/home',
                    title: '首页'
                },
                {
                    action: '/micro-vue/courses/list',
                    title: '课程管理'
                },
                {
                    action: '/micro-vue/episodes/list',
                    title: '课时管理'
                },
                {
                    action: '/micro-vue/users/list',
                    title: '用户管理'
                }
            ],
        },
    ]
};

export default {
    name: 'global',
    state,
    reducers,
    effects,
};