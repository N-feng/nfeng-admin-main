import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteConfigDeclaration } from './routes-config';

/**
 * 渲染所有的路由（普通路由+重定向路由）
 * @param routesConfig
 * @param extraProps
 */
export function renderAllRoutes(routesConfig: RouteConfigDeclaration[], extraProps: any = {}) {
    let routes = renderRoutes(routesConfig, extraProps);
    let redirect = renderRedirectRoute(routesConfig);
    return [...routes, redirect];
}

/**
 * 渲染普通路由
 * @param routesConfig
 * @param extraProps
 */
export function renderRoutes(routesConfig: RouteConfigDeclaration[], extraProps: any = {}) {
    return routesConfig.map((item) => {
        const {
            path,
            exact,
            isProtected,
            isDynamic,
            component: Component,
            routes = [],
            loadingFallback,
        } = item;
        return (
            <Route
                key={path}
                path={path}
                exact={exact}
                component={(props: any) => {
                    if (isProtected && !localStorage.getItem('token')) {
                        return <Redirect key={'login-redirect'} to={'/login'} />;
                    }
                    if (isDynamic) {
                        return (
                            <React.Suspense fallback={loadingFallback || '正在加载中...'}>
                                <Component {...props} {...extraProps} routes={routes} />
                            </React.Suspense>
                        );
                    }
                    return <Component {...props} {...extraProps} routes={routes} />;
                }}
            />
        );
    });
}

/**
 * 渲染重定向路由
 * @param routes
 */
export function renderRedirectRoute(routes: RouteConfigDeclaration[]) {
    let { path } = routes.find(route => route.isRedirect) || routes[0];
    return <Redirect key={path + '-redirect'} to={path} />;
}