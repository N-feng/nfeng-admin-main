import { AxiosError, AxiosResponse } from 'axios';
import { message } from 'antd';

/**
 * 针对请求成功：返回的 code 码做不同的响应处理
 */
class ServerResponseSuccessManager {
    /**
     * 状态码解析器
     * @param response
     */
    codeParser(response: AxiosResponse) {
        const data = response?.data;
        if (data.code !== 200 && data.code !== 0) {
            if (data.code === 401) {
                this.goTologin()
            } else if (data.code !== 498 && data.code !== 499) {
                message.error(data.msg || data.message || '网络错误')
            }
        }
    }

    /**
     * 登录失效回登录页
     */
    goTologin() {
        message.error('登录已过期，请重新登录');
        setTimeout(() => {
            window.location.href = '/login';
        }, 1000);
    }
}

/**
 * 针对请求失败的响应处理
 */
class ServerResponseFailedManager {
    /**
     * 请求失败时，需要提示的信息
     */
    getErrorMessage(error: AxiosError) {
        const { response } = error
        const statusText = response?.statusText;
        message.error(statusText);
    }
}

export const serverResponseSuccessManager = new ServerResponseSuccessManager();
export const serverResponseFailedManager = new ServerResponseFailedManager();