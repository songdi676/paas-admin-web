import request from '@/utils/request'

export function getDeptInfo() {
  return request({
    url: 'zentao/getDeptInfo',
    method: 'get'
  })
}

export default { getDeptInfo }
