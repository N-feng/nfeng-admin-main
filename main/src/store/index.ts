import { init } from '@rematch/core';
import immerPlugin from '@rematch/immer';
import createLoadingPlugin from '@rematch/loading';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { RematchRootDispatch, RematchRootState } from '../d.ts/rematch-store'
import * as models from './models';
import history from './history';

const immer = immerPlugin();
const loadingOptions = {};
const loading = createLoadingPlugin(loadingOptions);


export type RootState = RematchRootState<typeof models>;

export type RootDispatch = RematchRootDispatch<typeof models>;

const store = init({
    models,
    plugins: [loading, immer],
    redux: {
        middlewares: [routerMiddleware(history)],
        reducers: {
            router: connectRouter(history),
        },
    },
});

export default store;
