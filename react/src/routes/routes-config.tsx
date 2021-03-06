import React from 'react';

/**
 * 注意：如果路由组件使用动态加载的话，那么下面就不要再引入组件了，否则动态加载就会失效
 * 如果项目结构简单，可以在当前文件中配置所有路由，如果结构复杂，就需要将二级路由及下层的路由单独拆分成一个个路由配置文件
 */

export interface RouteConfigDeclaration {
    /**
     * 当前路由路径
     */
    path: string;
    /**
     * 当前路由名称
     */
    name?: string;
    /**
     * 是否严格匹配路由
     */
    exact?: boolean;
    /**
     * 是否需要路由鉴权
     */
    isProtected?: boolean;
    /**
     * 是否需要路由重定向
     */
    isRedirect?: boolean;
    /**
     * 是否需要动态加载路由
     */
    isDynamic?: boolean;
    /**
     * 动态加载路由时的提示文案
     */
    loadingFallback?: string;
    /**
     * 路由组件
     */
    component: any;
    /**
     * 子路由
     */
    routes?: RouteConfigDeclaration[];
}

export const routesConfig: RouteConfigDeclaration[] = [
    {
        path: '/',
        isDynamic: true,
        component: React.lazy(() => import('../views/home/Home')),
        routes: [
            {
                path: '/child-one',
                isDynamic: true,
                component: React.lazy(() => import('../views/home/ChildOne'))
            },
            {
                path: '/child-two',
                isRedirect: true,
                isDynamic: true,
                component: React.lazy(() => import('../views/home/ChildTwo'))
            },
        ],
    },
];