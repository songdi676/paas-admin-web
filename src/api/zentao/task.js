import request from '@/utils/request'

/* 获取迭代里任务分类总数*/
export function getZtTaskInfo(project) {
  return request({
    url: 'zentao/getZtTaskInfo/' + project,
    method: 'get'
  })
}

/* 预计消耗工时*/
export function getEsTimate(project) {
  return request({
    url: 'zentao/getEsTimate/' + project,
    method: 'get'
  })
}

/* 获取迭代已消耗工时*/
export function getConsumed(project) {
  return request({
    url: 'zentao/getConsumed/' + project,
    method: 'get'
  })
}

/* 获取迭代剩余工时*/
export function getLeft(project) {
  return request({
    url: 'zentao/getLeft/' + project,
    method: 'get'
  })
}

/* 获取本次迭代总超时任务数*/
export function getDeadLine(project) {
  return request({
    url: 'zentao/getDeadLine/' + project,
    method: 'get'
  })
}

/* (个人效率指标)迭代分配任务数*/
export function getUserTask(project, userName) {
  return request({
    url: 'zentao/getUserTask/' + project + '/' + userName,
    method: 'get'
  })
}

/* (个人效率指标)迭代进行中的任务数*/
export function getUserDoingTask(project, userName) {
  return request({
    url: 'zentao/getUserDoingTask/' + project + '/' + userName,
    method: 'get'
  })
}

/* (个人效率指标)迭代关闭的任务数*/
export function getUserClosedTask(project, userName) {
  return request({
    url: 'zentao/getUserClosedTask/' + project + '/' + userName,
    method: 'get'
  })
}

/* (个人效率指标)迭代分配的任务量*/
export function getUserEstimateTask(project, userName) {
  return request({
    url: 'zentao/getUserEstimateTask/' + project + '/' + userName,
    method: 'get'
  })
}

/* (个人效率指标)迭代完成的工作量*/
export function getUserConsumedTask(project, userName) {
  return request({
    url: 'zentao/getUserConsumedTask/' + project + '/' + userName,
    method: 'get'
  })
}

/* (个人效率指标)迭代个人超时工作量*/
export function getUserDeadLine(project, userName) {
  return request({
    url: 'zentao/getUserDeadLine/' + project + '/' + userName,
    method: 'get'
  })
}

/* 获取迭代时间信息*/
export function getTaskTimeInfo(project) {
  return request({
    url: 'zentao/getTaskTimeInfo/' + project,
    method: 'get'
  })
}

/* 获取迭代时间信息*/
export function getTaskTimeInfoByUserName(project, userName) {
  return request({
    url: 'zentao/getTaskTimeInfoByUserName/' + project + '/' + userName,
    method: 'get'
  })
}

export default {
  getZtTaskInfo,
  getEsTimate,
  getUserDeadLine,
  getUserConsumedTask,
  getUserEstimateTask,
  getUserClosedTask,
  getUserDoingTask,
  getUserTask,
  getDeadLine,
  getLeft,
  getConsumed,
  getTaskTimeInfo,
  getTaskTimeInfoByUserName
}
