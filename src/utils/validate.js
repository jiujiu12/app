/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

// 手机号
export function validatePhone (rule, value, callback) {
  let reg = /^[1][3-9][0-9]{9}$/
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (!reg.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
// 身份证
export function validateIdNo (rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('请输入身份证号！'))
  } else {
    if (!reg.test(value) && value !== '') {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      callback()
    }
  }
}
// 密码校验
export function validatePwd (rule, newPw, callback) {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,14}$/
  if (newPw === '') {
    callback(new Error('请输入密码！'))
  } else if (!reg.test(newPw)) {
    callback(
      new Error('密码长度6-15位，必须有数字和字母，字母必须有大写有小写')
    )
  } else {
    callback()
  }
}
// 邮箱校验
export function validateEmail (rule, value, callback) {
  const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  if (value === '') {
    callback(new Error('请输入邮箱！'))
  } else if (!reg.test(value)) {
    callback(
      new Error('邮箱格式错误！')
    )
  } else {
    callback()
  }
}

export function validatePassword (rule, value, callback) {
  if (value.length === 0) {
    callback(new Error('请输入密码！'))
  } else if (value.length < 6) {
    callback(new Error('密码至少6位！'))
  } else {
    callback()
  }
}