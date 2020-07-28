import request from '@/utils/request'

export function getZtProjectList(data) {
  return request({
    url: 'zentao/getZtProjectList',
    method: 'post',
    data: data
  })
}

export function getProductProjectList(data) {
  return request({
    url: 'zentao/getProductProjectList',
    method: 'post',
    data: data
  })
}

export function getZtProjectCycle(projectId) {
  return request({
    url: 'zentao/getZtProjectCycle/' + projectId,
    method: 'get'
  })
}

export default { getZtProjectList, getProductProjectList, getZtProjectCycle }
