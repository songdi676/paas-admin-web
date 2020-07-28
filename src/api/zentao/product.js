import request from '@/utils/request'

export function getZtProductList(data) {
  return request({
    url: 'zentao/getZtProductList',
    method: 'post',
    data: data
  })
}

export default { getZtProductList }
