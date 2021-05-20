import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n


import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// import '@/assets/styles/index.scss' // permission control
import '@/styles/index.scss' // global css

/** 引入lodash **/
import _ from 'lodash'
import moment from 'moment'
import BaiduMap from 'vue-baidu-map'

moment.locale('zh-cn')
Vue.use(BaiduMap, {
  ak: 'zVNSDf9e2YKqIwrujQYiG09W4oIonBb4'
})
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
Vue.prototype.$isLegal = (obj, ruleForm) => {
  let isLegal = true
  console.log(obj, ruleForm)
  obj.$refs[ruleForm].validate(valid => {
    if (!valid) {
      isLegal = false
      obj.$notify.error('表单验证未通过！')
    }
  })
  return isLegal
}
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
Vue.prototype._ = _
Vue.prototype.$moment = moment
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
