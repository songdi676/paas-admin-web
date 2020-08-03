import request from '@/utils/request'
import qs from 'qs'
export function getProjectList(liveMeasures) {
  return request({
    url: 'sonar/live-measures' + '?' + qs.stringify(liveMeasures, { indices: false }),
    method: 'get'
  })
}

export default { getProjectList }
