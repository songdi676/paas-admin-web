import request from '@/utils/request'

export function getProjectList(data) {
  return request({
    url: 'zentao/getUserList',
    method: 'post',
    data: data
  })
}

export function getUserRoleList() {
  return request({
    url: 'zentao/getUserRoleList',
    method: 'post'
  })
}

export default { getProjectList, getUserRoleList }
