<template>
  <transition name="log">
    <div class="login">
      <div class="left">
        <div class="left-bg"></div>
        <div class="left-text">
          <p class="title">ABOUT US</p>
          <p class="text">志愿者服务平台</p>
        </div>
      </div>

      <div class="right">
        <el-card class="loginForm">
          <el-scrollbar style="height: 450.5px;">
            <el-menu :default-active="activeIndex"
                     class="el-menu-demo"
                     mode="horizontal"
                     @select="handleSelect">
              <el-menu-item style="width: 50%"
                            index="login">登录</el-menu-item>
              <el-menu-item style="width: 50%"
                            index="sign">注册</el-menu-item>
            </el-menu>
            <div class="form-box"
                 v-if="activeIndex === 'login'">
              <el-form :model="loginForm"
                       :rules="loginRules"
                       ref="loginForm">
                <el-form-item prop="username">
                  <el-input v-model="loginForm.username"
                            prefix-icon="el-icon-s-custom"
                            placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password"
                            placeholder="密码"
                            show-password
                            prefix-icon="el-icon-unlock"
                            v-model="loginForm.password"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- <el-checkbox v-model="checked">自动登陆</el-checkbox> -->
                </el-form-item>
                <el-form-item>
                  <el-button class="but"
                             style="width: 100%"
                             @click="handleLogin"
                             size="medium"
                             type="primary">提交
                  </el-button>
                </el-form-item>
              </el-form>
              <div class="select">
                <p class="forget-pwd"
                   style="float: right;color: #666;font-size: 14px;">忘记密码</p>
              </div>
            </div>
            <div class="form-box"
                 v-if="activeIndex === 'sign'">
              <el-form :model="signForm"
                       :rules="signRules"
                       ref="signForm">
                <el-form-item prop="username">
                  <el-input v-model="signForm.username"
                            prefix-icon="el-icon-s-custom"
                            placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password"
                            placeholder="密码"
                            show-password
                            prefix-icon="el-icon-unlock"
                            v-model="signForm.password"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-row><el-rol></el-rol></el-row>
                <el-row><el-rol></el-rol></el-row>
                <el-form-item prop="confirmPassword">
                  <el-input type="password"
                            placeholder="确认密码"
                            show-password
                            prefix-icon="el-icon-success"
                            v-model="signForm.confirmPassword"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="phone">
                  <el-input v-model="signForm.phone"
                            prefix-icon="el-icon-phone"
                            placeholder="联系方式"></el-input>
                </el-form-item>
                <el-form-item prop="email">
                  <el-input v-model="signForm.email"
                            prefix-icon="el-icon-message"
                            placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- <el-checkbox v-model="checked">自动登陆</el-checkbox> -->
                </el-form-item>
                <el-form-item>
                  <el-button class="but"
                             style="width: 100%"
                             @click="handleLogin"
                             size="medium"
                             type="primary">提交
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-scrollbar>
        </el-card>
        <div class="right_bg_one">
          <img :src="require('../../assets/img/bg-login-t.png')"
               alt="">
        </div>
        <div class="right_bg_two">
          <img :src="require('../../assets/img/bg-login-b.png')"
               alt="">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { validatePhone, validateEmail, validatePassword } from '@/utils/validate'
import { login } from '@/api/login'
export default {
  name: 'Login',
  data () {
    const confirmTwoPassword = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请确认密码！'))
      } else if (value !== this.signForm.password) {
        callback(new Error('两次密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      activeIndex: 'login',
      loginForm: {
        username: '',
        password: '',
        source: 'form'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '输入用户名' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      signForm: {
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      signRules: {
        username: [{ required: true, trigger: 'blur', message: '输入用户名' }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: confirmTwoPassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  created () {
    this.loginForm = {
      username: 'admin',
      password: '123456',
      source: 'form'
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.activeIndex = key
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          // const res = await login({
          //   userName: this.loginForm.username,
          //   password: this.loginForm.password
          // })
          // console.log(res)
          // if (res.success) {
          //   res.token = 'admin token'
          //   this.$router.push({ path: this.redirect || '/' })
          // }
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$notify.success({
              title: '提示',
              message: '登陆成功！',
              showClose: false
            })
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$notify.error('请完善表单后提交！')
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.el-menu {
  background-color: #fff !important;
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

<style scoped lang="scss">
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .left {
    background-color: #1b91f3;
    width: 44%;
    height: 100%;
    float: left;
    position: relative;

    .left-text {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      top: 50%;
    }
    .title {
      font-size: 25px;
      color: white;
      font-weight: 700;
      margin-bottom: 20px;
    }
    .text {
      font-size: 20px;
      color: white;
      margin-bottom: 10px;
    }
  }
  .right {
    float: right;
    width: 56%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .loginForm {
      width: 398px;
      height: 463.5px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      display: flex;
      flex-direction: column;
      z-index: 10;
      text-align: center;
      .form-box {
        padding-top: 20px;
      }
    }
    .title {
      font-weight: normal;
    }
    .right_bg_two {
      position: absolute;
      right: 0;
      bottom: -4px;
    }
    .right_bg_one {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .login {
    }
  }

  &.log-enter,
  &.log-leave-to {
    transform: translateX(130%);
    opacity: 0;
  }

  .title {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
  }

  .logo {
    margin-top: 12px;
    margin-bottom: 18px;
    text-align: center;
  }
  .select {
    display: flex;
    width: 300px;
    margin: 0 auto;
    justify-content: space-around;
  }
  .select-item {
    cursor: pointer;
    text-align: center;
  }
}
</style>
