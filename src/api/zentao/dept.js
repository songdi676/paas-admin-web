import request from '@/utils/request'
import qs from 'qs'

export function getDeptInfo() {
  return request({
    url: 'zentao/getDeptInfo',
    method: 'get'
  })
}

export function getDeptListByProject(project) {
  return request({
    url: `zentao/dept/project/${project}`,
    method: 'get'
  })
}

export function getTaskEestimate(project) {
  return request({
    url: `zentao/task-estimate//project/${project}`,
    method: 'get'
  })
}

export default { getDeptInfo, getDeptListByProject, getTaskEestimate }
