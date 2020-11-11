import request from '../utils/request';

export function login(params: any) {
    return request.post('/api/sysmgr-web/auth/common-login', params)
}