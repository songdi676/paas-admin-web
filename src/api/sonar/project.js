import request from '@/utils/request'
import qs from 'qs'
export function getProjectList(project) {
  return request({
    url: 'sonar/projects' + '?' + qs.stringify(project, { indices: false }),
    method: 'get'
  })
}

export default { getProjectList }
