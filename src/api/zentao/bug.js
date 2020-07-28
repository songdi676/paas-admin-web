import request from '@/utils/request'

export function getBugInfo(projectId) {
  return request({
    url: 'zentao/getBugInfo/' + projectId,
    method: 'get'
  })
}

export default { getBugInfo }
