import {
    registerMicroApps,
    // runAfterFirstMounted,
    // setDefaultMountApp,
    start,
    initGlobalState
} from 'qiankun';

export default function startQiankun() {
    /**
         * Step1 初始化应用（可选）
         */

        // render({ loading: true });

        // const loader = (loading: any) => render({ loading });


        /**
         * Step2 注册子应用
         */

        registerMicroApps(
            [
                {
                    name: 'react',
                    entry: '//localhost:7100',
                    container: '#subapp-viewport',
                    // loader,
                    activeRule: '/micro-react',
                },
                {
                    name: 'vue',
                    entry: '//localhost:7101',
                    container: '#subapp-viewport',
                    // loader,
                    activeRule: '/micro-vue',
                },
            ]
        );

        const { onGlobalStateChange, setGlobalState } = initGlobalState({
            user: 'qiankun',
        });

        onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

        setGlobalState({
            ignore: 'master',
            user: {
                name: 'master',
            },
        });

        /**
         * Step3 设置默认进入的子应用
         */
        // setDefaultMountApp('/react');

        /**
         * Step4 启动应用
         */
        start();

        // runAfterFirstMounted(() => {
        //     console.log('[MainApp] first app mounted');
        // });
}