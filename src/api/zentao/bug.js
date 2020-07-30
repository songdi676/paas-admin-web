import request from '@/utils/request'
import qs from 'qs'

export function getBugList(zttask) {
  return request({
    url: '/zentao/bug' + '?' + qs.stringify(zttask, { indices: false }),
    method: 'get'
  })
}

export function getBugStatus(zttask) {
  return request({
    url: '/zentao/bug/status' + '?' + qs.stringify(zttask, { indices: false }),
    method: 'get'
  })
}
export function getBugDataBox(zttask) {
  return request({
    url: '/zentao/bug/data-box' + '?' + qs.stringify(zttask, { indices: false }),
    method: 'get'
  })
}

export function getBugInfo(projectId) {
  return request({
    url: 'zentao/getBugInfo/' + projectId,
    method: 'get'
  })
}

export default { getBugInfo, getBugStatus, getBugList, getBugDataBox }
