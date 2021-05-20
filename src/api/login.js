import request from '@/utils/request'

export function login(data) {
  return request.post('api/user/signIn', data)
}

export function work() {
  return request({
    url: 'work',
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: 'api/user/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout(params = {}) {
  return request.post('api/user/logout', params)
}
