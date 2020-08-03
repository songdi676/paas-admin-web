import request from '@/utils/request'
import qs from 'qs'
export function getProjectMeasuresBoxes(liveMeasures) {
  return request({
    url: '/sonar/project-measures/data-boxes' + '?' + qs.stringify(liveMeasures, { indices: false }),
    method: 'get'
  })
}

export default { getProjectMeasuresBoxes }
