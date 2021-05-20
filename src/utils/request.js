import axios from 'axios'
import {Message, Loading} from 'element-ui'
import qs from 'qs'

// 添加请求的拦截器
let loading
// 接口请求的时候开始loading图
function startLoading (target) {
  loading = Loading.service({
    target: document.querySelector(target),
    text: '加载中,请稍后...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.3)'
  })
}
// 以下代码为请求结束loading图停止
let needLoadingRequestCount = 0
function showLoading (target) {
  if (needLoadingRequestCount === 0) {
    startLoading(target)
  }
  needLoadingRequestCount++
}
function hideLoading () {
  if (needLoadingRequestCount <= 0) {
    return
  }
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    loading.close()
  }
}
// 创建axios实例
const service = axios.create({
  baseURL: 'app/', // api的base_url
  withCredentials: true, // 是否允许带cookie
  timeout: 60000 // 请求超时时间
})
// request请求拦截器
service.interceptors.request.use(config => {
  if (config.url.toLowerCase() !== 'login') {
    // 如果请求的地址不是login，设置token和工号
    config.headers.Authorization = sessionStorage.getItem('token')
    config.headers.SystemUserCode = sessionStorage.getItem('system_user_code')
  }
  // if (config.isShowLoading) {
  //   showLoading(config.target)
  // }
  setTimeout(() => {
    if (config.isShowLoading) {
      showLoading(config.target)
    }
  }, 200)
  return config
}, error => {
  hideLoading()
  return Promise.reject(error)
})

// respone响应拦截器
service.interceptors.response.use(response => {
  // 关闭loading
  setTimeout(() => {
    if (response.config.isShowLoading) {
      hideLoading()
    }
  }, 300)
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
  // return response
},
error => {
  // 关闭loading
  setTimeout(() => {
    hideLoading()
  }, 300)
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误'
        break
      case 401:
        error.message = '未授权，请登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器内部错误'
        break
      case 501:
        error.message = '服务未实现'
        break
      case 502:
        error.message = '网关错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网关超时'
        break
      case 505:
        error.message = 'HTTP版本不受支持'
        break
      default:
        error.message = `连接错误${error.response.status}`
    }
    Message.error(error.message)
  }
  return Promise.reject(error.response)
}
)

const request = (url, params, config, method) => {
  if (config.hasOwnProperty('type')) {
    if (config.type === 'formData') {
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      params = qs.stringify(params)
    }
  }
  let configs = Object.assign({
    headers: {
      'Content-Type': 'application/json'
    },
    isShowLoading: false,
    target: '.main-content-right'
  }, config)
  return new Promise((resolve, reject) => {
    service[method](url, params, configs).then(res => {
      console.log(res)
      resolve(res.data)
    }).catch(error => {
      console.log(error)
      reject(error)
    })
  })
}
export default {
  get (url, params = {}, config = {}) {
    return request(url, params, config, 'get')
  },
  upload (url, params, config = {}) {
    let configs = Object.assign({
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }, config)
    return request(url, params, configs, 'post')
  },
  post (url, params = {}, config = {}) {
    return request(url, params, config, 'post')
  },
  filePost (url, params = {}, config = {}) {
    let configs = Object.assign({
      method: 'post',
      url: url,
      data: params,
      isShowLoading: true,
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'blob',
      target: '.main-content-right'
    }, config)
    return new Promise((resolve, reject) => {
      service(configs).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryForPost (url, params, isShowLoading = true, target = 'body') {
    return new Promise((resolve, reject) => {
      service({
        method: 'post',
        url: url,
        params,
        isShowLoading: isShowLoading,
        headers: {
          'Content-Type': 'application/json'
        },
        target: target
      }).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
