import { RootDispatch } from '@/store';
import { login } from '@/api/login';

// 添加状态
const INCREMENT = 'INCREMENT';

export interface LoginStateDeclaration {
    pageName?: string;
    count: number;
    loginLoading: boolean;
}

const state: LoginStateDeclaration = {
    pageName: 'login',
    count: 0,
    loginLoading: false,
};

export default {
    name: 'login',
    state,
    reducers: {
        [INCREMENT]: (state: LoginStateDeclaration): LoginStateDeclaration => {
            // 打印输出的是一个 proxy 代理实例对象
            // console.log(state);
            state.count += 1;
            // 最终要返回整棵 state 树（当前 model 的 state 树——Login）
            return state;
        },
        showLoading: (state: LoginStateDeclaration): LoginStateDeclaration => {
            state.loginLoading = true;
            return state;
        },
        hideLoading: (state: LoginStateDeclaration): LoginStateDeclaration => {
            state.loginLoading = false;
            return state;
        },
    },
    effects: (dispatch: RootDispatch) => ({
        // async incrementAsync(payload, rootState: RootState) {
        async incrementAsync() {
            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, 1000),
            );
            // 派发 Login 里面的 action
            // dispatch.Login.INCREMENT();
            // this.INCREMENT();
        },
        async loginAsync(params: any) {
            dispatch.login.showLoading();
            const data = await login(params);
            dispatch.login.hideLoading();
            return data;
        }
    }),
    // effects: {
    //     async incrementAsync(payload, rootState: RootState) {
    //         await new Promise(resolve =>
    //             setTimeout(() => {
    //                 resolve();
    //             }, 1000),
    //         );
    //         this.INCREMENT();
    //     },
    // },
};