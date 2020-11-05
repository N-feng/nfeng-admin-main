import { utils } from 'nfeng-ui-vue'
import { role } from './config'

const { post } = utils

export function addRole(roleData: any) {
  const {
    roleName, roleType, roleMenu, permissions,
  } = roleData
  return post(role.roleAdd, {
    roleName, roleType, roleMenu, permissions,
  })
}

export function deleteRole(roleData: any) {
  const { roleName } = roleData
  return post(role.roleDelete, { roleName })
}

export function updateRole(roleData: any) {
  const {
    roleName, roleType, roleMenu, permissions,
  } = roleData
  return post(role.roleUpdate, {
    roleName, roleType, roleMenu, permissions,
  })
}

export function getRoleDetail(roleName: any) {
  return post(role.roleDetail, { roleName })
}

export function getRoleList() {
  return post(role.roleList)
}
