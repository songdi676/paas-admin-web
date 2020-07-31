import request from '@/utils/request'

export function getZtBurnDept(project) {
  return request({
    url: '/zentao/burnDept/getZtBurnDept/' + project,
    method: 'get'
  })
}

export default { getZtBurnDept }
