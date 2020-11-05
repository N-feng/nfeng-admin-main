import { utils } from 'nfeng-ui-vue'
import { auth } from './config'

const { post } = utils

export function signup(params: any) {
  const url = '/auth/signup' // 注册
  return post(url, params)
}

export function login(params: any) {
  const url = '/auth/login' // 登录
  return post(url, params)
}

export function deleteAuth(params: any) {
  return post(auth.authDelete, params)
}

export function updateUser(params: any) {
  return post(auth.authUpdate, params)
}

export function getAuthDetail(params: any) {
  return post(auth.authDetail, params)
}

export function getAuthList() {
  return post(auth.authList)
}

export function getMenus(params: any) {
  return post(auth.getMenus, params)
}
