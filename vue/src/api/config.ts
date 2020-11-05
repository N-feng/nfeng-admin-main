export const global = {
  getRoleNameList: '/global/roleNameList',
}

export const auth = {
  authDelete: '/auth/delete', // 删除
  authUpdate: '/auth/update', // 修改用户
  authDetail: '/auth/detail', // 用户详情
  authList: '/auth/list', // 用户列表
  getMenus: '/global/menus',
}

export const role = {
  roleAdd: '/role/add',
  roleDelete: '/role/delete',
  roleUpdate: '/role/update',
  roleDetail: '/role/detail',
  roleList: '/role/list',
}

export const task = {
  taskAdd: '/task/add',
  taskDelete: '/task/delete',
  taskUpdate: '/task/update',
  taskDetail: '/task/detail',
  taskList: '/task/list',
}

export const img = {
  imgAdd: '/img/add',
  imgCosAdd: 'img/cosAdd',
  imgDelete: '/img/delete',
  imgList: '/img/list',
  imgFind: '/img/find',
}

export const note = {
  noteAdd: '/note/add',
  noteDelete: '/note/delete',
  noteUpdate: '/note/update',
  noteDetail: '/note/detail',
  noteList: '/note/list',
}

export const project = {
  projectAdd: '/project/add',
  projectDelete: '/project/delete',
  projectUpdate: '/project/update',
  projectDetail: '/project/detail',
  projectList: '/project/list',
}

export default {
  ...global,
  ...auth,
  ...role,
  ...img,
  ...task,
  ...note,
  ...project,
}
