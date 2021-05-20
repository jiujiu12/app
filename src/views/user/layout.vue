<template>
  <div class="main">
    <div class="head"
         data-step="1"
         data-intro="这是目录栏，你可以快速去到你想去的地方，同时你查看实时本地天气">
      <div class="head-top">
        <div class="top-container">
          <div class="head-left">
            <div class="hoverlink"
                 @click="dialogVisible = true"><i class="el-icon-map-location"></i>太原科技大学</div>
            <div class="client"
                 v-if="isLog">
              <p>您好，</p>
              <p> yh </p>
              <p>的业主</p>
              <p @click="toLogout"
                 style="margin-left: 20px;">登出</p>
            </div>
            <div class="client hoverlink"
                 v-else>
              <div>退出登陆</div>
              <!-- <p>|</p>
              <p>注册</p> -->
            </div>
          </div>
        </div>
      </div>
      <div class="head-bottom">
        <div class="container">
          <!-- <el-image style="height: 81px;width: 153px" :src="require('../common/img/logo.png')"></el-image> -->
          <div class="nav">
            <router-link :to="{name: 'userhome'}"
                         class="nav-item hoverlink"
                         @click="home">首页</router-link>
            <router-link :to="{name: 'activity'}"
                         class="nav-item hoverlink"
                         :class="{active:select===1}"
                         @click="hot">报名</router-link>
            <p class="nav-item hoverlink"
               :class="{active:select===2}"
               @click="wish">新闻</p>
            <router-link :to="{name: 'shop'}"
                         class="nav-item hoverlink"
                         :class="{active:select===3}"
                         @click="shop">兑换商城</router-link>
            <div class="avatar-wrapper">
              <el-avatar icon="el-icon-user-solid"></el-avatar>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="50%">
      <!-- <baidu-map :zoom="17"
                 class="map"
                 :center="center"
                 @ready="handler"
                 style="width: 1000px;height:500px;">
      </baidu-map> -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <guide ref="guide"></guide> -->
    <foot></foot>
  </div>
</template>

<script type="text/ecmascript-6">
// import { getWeather } from '../api/weather'
// import { mapGetters, mapActions } from 'vuex'
// import Poppers from '../components/popper'
import Foot from '@/components/user/foot'
// import { loading } from '../components/loading'
// import Guide from '../components/guide'
// import { AMAP_KEY } from '../../config'
export default {
  components: {
    Foot
  },
  data () {
    return {
      select: 0,
      temp: {},
      air: {},
      color: '',
      step: 0,
      dialogVisible: false
    }
  },
  computed: {
    // isLog () {
    //   return this.userInfo.account !== 'undefined'
    // },
    // ...mapGetters([
    //   'userInfo'
    // ])
  },
  // created () {
  //   this._getLocation()
  // },
  // mounted () {
  //   if (!window.localStorage.getItem('guide')) {
  //     this.$nextTick(() => {
  //       this.$refs.guide.start(this)
  //     })
  //   }
  // },
  methods: {
    home () {
      this.$router.push('/home').catch(err => err)
      this.select = 0
    },
    hot () {
      this.$router.push('/hot').catch(err => err)
      this.select = 1
    },
    wish () {
      this.$router.push('/wish').catch(err => err)
      this.select = 2
    },
    shop () {
      this.$router.push('/shop').catch(err => err)
      this.select = 3
    },
    normalAir (province, city) {
      getWeather(province, city).then((res) => {
        let data = res.data
        this.air = data.air
        this.temp = data.temp
        let aqiName = this.air['aqi_name']
        switch (aqiName) {
          case '良':
            this.$refs.air.style.background = '#f0cc35'
            this.color = '#f0cc35'
            this.$refs.circle.style.backgroundPosition = '-216px -21px'
            break
          case '优':
            this.$refs.air.style.background = '#91BF5C'
            this.color = '#91BF5C'
            this.$refs.circle.style.backgroundPosition = '-216px 0px'
            break
          case '轻度污染':
            this.color = '#F1AB62'
            this.$refs.air.style.background = '#F1AB62'
            this.$refs.circle.style.backgroundPosition = '-216px -42px'
            break
        }
      })
    },
    toLogout () {
      this.logout()
      this.$router.push('/welcome').catch(err => err)
    },
    openLoading () {
      loading(true)
      setTimeout(() => {
        loading(false)
      }, 3000)
    },
    _getLocation () {
      // 采用高德地图的ip定位，解决ipv6地址不能读取定位
      // 请自行去高德地图申请属于自己的key
      // const url = `https://restapi.amap.com/v3/ip?key=${AMAP_KEY}`
      // import(/* webpackChunkName: "jsonp" */'jsonp').then(({ default: _jsonp }) => {
      //   _jsonp(url, null, (err, data) => {
      //     if (err) {
      //       this.normalAir('浙江省', '杭州市')
      //     } else {
      //       let city = data.city || '杭州市'
      //       let province = data.province || '浙江省'
      //       this.normalAir(province, city)
      //     }
      //   })
      // })
    },
    // ...mapActions({
    //   logout: 'logOut'
    // })
  },
  // components: {
  //   Poppers,
  //   Foot,
  //   Guide
  // }
}
</script>

<style scoped lang="scss">
html {
  background-color: #f6f6f6;
}
.main {
  width: 100vw;
  height: 100%;

  .head {
    width: 100vw;
    border-bottom: 1px solid $color-background-d;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #f9f9f9;
    /*overflow :hidden*/
    z-index: 10;
    .head-top {
      background-color: #f9f9f9;
      border-bottom: 1px solid #f2f2f2;
      height: 31px;
      .top-container {
        width: $width-container;
        margin: 0 auto;
        height: 31px;
        color: #666;
        cursor: pointer;

        .head-left {
          height: 31px;
          display: flex;
          line-height: 31px;
          justify-content: space-between;

          .client {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
    .hoverlink:hover {
      color: $color-theme;
    }
    .head-bottom {
      background-color: $color-background;
      height: 80%;
      box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);

      .container {
        width: $width-container;
        display: flex;
        margin: 0 auto;

        .nav {
          margin-left: 140px;
          display: flex;
          width: 450px;
          justify-content: space-around;

          .nav-item {
            width: 75px;
            height: 75px;
            line-height: 75px;
            margin-top: 3px;
            text-align: center;
          }
          .nav-item:hover {
            color: $color-theme;
            cursor: pointer;
          }
          .active {
            border-bottom: 3px solid $color-theme;
          }
        }
        .weather {
          margin-left: 140px;
          display: flex;
          height: 50px;
          margin-top: 15px;
          align-items: flex-end;

          .temp {
            font-size: 50px;
            line-height: 50px;
            color: $color-theme;
          }
          .weather-info {
            display: flex;
            align-items: flex-end;

            .name {
              font-size: $font-size-large-xx;
              margin-right: 30px;
            }
            .air-info {
              .title {
                width: 254px;
                text-align: center;
                font-size: $font-size-large-xx;
              }
              .air {
                display: flex;
                align-items: center;
                height: 24px;
                line-height: 24px;
                font-size: $font-size-medium;
                background-color: #91bf5c;
                padding: 3px 10px 3px 10px;
                border-radius: 16px;

                &.el-popper {
                  padding: 0px;
                }
                .circle {
                  width: 18px;
                  height: 18px;
                  border-radius: 18px;
                  margin-right: 8px;
                  background-color: #fff;
                  // background-image: url("https://mat1.gtimg.com/pingjs/ext2020/weather/2017/images/sprites/sprite-7d98dbada9.png");
                  background-position: -216px 0px;
                  background-size: 234px 212px !important;
                }
              }
              .body {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;

                .single {
                  width: 84px;
                  height: 84px;
                  font-size: $font-size-medium;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }

  .cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(5, 5, 5, 1);
    opacity: 0.5;
    z-index: 998;
  }
  .intro {
    min-width: 300px;
    min-height: 170px;
    z-index: 998;
    background-color: white;
    border: 1px solid red;
    position: fixed;
    top: 150px;
    left: 400px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 15px;
  }
  .box {
    left: 0;
    right: 0;
    height: 100%;
    margin-top: 111px;
    z-index: -1;
  }
}
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
  background: white;
}
</style>
