import { utils } from 'nfeng-ui-vue'
import { task } from './config'

const { post } = utils

export function addTask(params: any) {
  return post(task.taskAdd, params)
}

export function deleteTask(taskId: any) {
  return post(task.taskDelete, { taskId })
}

export function updateTask(params: any) {
  return post(task.taskUpdate, params)
}

export function getTask(taskId: any) {
  return post(task.taskDetail, { taskId })
}

export function getTaskList() {
  return post(task.taskList)
}
