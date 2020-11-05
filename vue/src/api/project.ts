import { utils } from 'nfeng-ui-vue'
import { project } from './config'

const { post } = utils

export function addProject(params: any) {
  return post(project.projectAdd, params)
}

export function deleteProject(projectId: any) {
  return post(project.projectDelete, { projectId })
}

export function updateProject(params: any) {
  return post(project.projectUpdate, params)
}

export function getProject(projectId: any) {
  return post(project.projectDetail, { projectId })
}

export function getProjectList() {
  return post(project.projectList)
}
