import request from '@/utils/request'
import qs from 'qs'
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
export function getUserWorkInfoChart(userWorkInfo) {
  return request({
    url: '/zentao/user/chart' + '?' + qs.stringify(userWorkInfo, { indices: false }),
    method: 'get'
  })
}
export function getUserWorkInfo(userWorkInfo) {
  return request({
    url: '/zentao/user/work-info' + '?' + qs.stringify(userWorkInfo, { indices: false }),
    method: 'get'
  })
}
export default { getUserList, getUserRoleList, getUserWorkInfoChart, getUserWorkInfo }
