import request from '@/utils/request'

export function getNotice (params) {
  return request.post('notice/getNotice', params, {
    isShowLoading: true,
    target: '.el-table__body'
  })
}

export function getNoticeDetail (params) {
  return request.post('/notice/getNoticeDetail', params, {
    isShowLoading: true,
    target: '.el-dialog'
  })
}

export function addNotice (params) {
  return request.post('notice/addNotice', params, {
    isShowLoading: true,
    target: '.el-table__body'
  })
}
export function editNotice (params) {
  return request.post('notice/editNotice', params, {
    isShowLoading: true,
    target: '.el-table__body'
  })
}
export function delNotice (params) {
  return request.post('notice/delNotice', params, {
    isShowLoading: true,
    target: '.el-table__body'
  })
}
