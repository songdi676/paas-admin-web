import request from '@/utils/request'

export function getZtBurnDept(project) {
  return request({
    url: `/zentao/burnDept/line-chart?project=${project}`,
    method: 'get'
  })
}

export default { getZtBurnDept }
