import request from '@/utils/request'

export function getUserList(data) {
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

export default { getUserList, getUserRoleList }
