<template>
  <div class="home">
    <div class="slider">
      <div class="slider-box">
        <!-- <slider></slider> -->
        <div class="info"
             data-intro="这是你的个人主页哦"
             data-step="6">
          <div class="logo">
            <!-- <el-avatar shape="square"
                       :size="100"
                       src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar> -->
          </div>
          <div class="name">
            Hi,欢迎111
            {{locationMsg}}111
            <!-- {{nickname}} -->
          </div>
          <div class="room">
            <!-- {{room}} -->
            <el-divider></el-divider>
          </div>
          <div class="detail">
            <div class="item">
              <!-- <p class="num">{{helps}}</p> -->
              <router-link :to="{name: 'actHis'}">活动</router-link>
            </div>
            <div class="item">
              <!-- <p class="num">{{goods}}</p> -->
              <router-link :to="{name: '#'}">消息</router-link>
            </div>
            <div class="item">
              <!-- <p class="num">{{comment}}</p> -->
              <router-link :to="{name: '#'}">评价</router-link>
            </div>
            <div class="item">
              <!-- <p class="num">{{count}}</p> -->
              <router-link :to="{path: '#'}">积分</router-link>
            </div>
          </div>
          <div class="my">
            <el-button style="width: 300px;"
                       type="primary"
                       @click="toMyHome">进入我的主页</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-wrapper">
        <div class="items good"
             data-step="2"
             data-intro="在这里你搜索找到你想要的东西">
          <i class="iconfont iconhands icon"></i>
          <el-divider></el-divider>
          <router-link :to="{name: 'activity'}"
                       class="title">
            我要报名</router-link>
        </div>
        <div class="items hots"
             data-step="3"
             data-intro="在这里你可以看到那些热心的住户">
          <i class="iconfont iconremen icon"></i>
          <el-divider></el-divider>
          <p class="title">热点资讯</p>
        </div>
        <div class="items helps"
             data-step="4"
             data-intro="在这里你可以看到人家的求助">
          <i style="font-size: 76px;"
             class="el-icon-s-data"></i>
          <el-divider></el-divider>
          <p class="title">活动统计</p>
        </div>
        <div class="items infos"
             data-step="5"
             data-intro="快速进入到你曾经帮助过和求助的历史记录">
          <i class="iconfont iconxingxing1 icon"></i>
          <el-divider></el-divider>
          <router-link :to="{name: 'createGroup'}"
                       class="title">创建组织</router-link>
        </div>
      </div>
    </div>
    <div class="study"
         ref="study">
      <div class="container">
        <div class="title">使用教程</div>
        <div class="text">从申请到完成，只需4步轻松搞定</div>
        <div class="process">
          <div class="icon-wrapper">
            <div class="icon">
              <i class="iconfont iconpen item"></i>
            </div>
            <div class="icon">
              <i class="iconfont iconyonghu item"></i>
            </div>
            <div class="icon">
              <i class="iconfont iconlouzuo item"></i>
            </div>
            <div class="icon">
              <i class="iconfont iconwancheng item"></i>
            </div>
          </div>
          <div class="process-text">
            <el-steps :active="step"
                      align-center>
              <el-step title="1、报名活动"
                       description="志愿者报名活动"></el-step>
              <el-step title="2、用户审核"
                       description="活动负责人审核报名信息"></el-step>
              <el-step title="3、查看报名成功活动状态"
                       description="审核通过之后，志愿者可以查看活动状态"></el-step>
              <el-step title="4、完成"
                       description="活动时间开始后，志愿者可以进行签到签退"></el-step>
            </el-steps>
          </div>
        </div>
      </div>
    </div>
    <div class="intro search"
         ref="search">
      <div class="intro-container">
        <div class="text">
          <h1>我要报名</h1>
          <p>通过该版块的搜索，你会找到你想要的报名的活动，点击进去，按照提示内容完成报名</p>
        </div>
        <div class="img"
             :class="{'active': isShowSearch == false }">
          <!-- <el-image :src="require('../common/img/search.png')"
                    :lazy="true"></el-image> -->
        </div>
      </div>
    </div>
    <div class="intro hot"
         ref="hot">
      <div class="intro-container">
        <div class="img"
             :class="{'active': isShowHot == false }">
          <!-- <el-image :src="require('../common/img/hot.png')"
                    :lazy="true"></el-image> -->
        </div>
        <div class="text">
          <h1>热门活动</h1>
          <p>通过该版块，寻找热门活动</p>
        </div>
      </div>
    </div>
    <div class="intro help"
         ref="help">
      <div class="intro-container">
        <div class="text">
          <h1>活动统计</h1>
          <p>通过该版块，查询参与过的活动统计信息</p>
        </div>
        <div class="img"
             :class="{'active': isShowHelp === false}">
          <!-- <el-image :src="require('../common/img/help.png')"
                    :lazy="true"></el-image> -->
        </div>
      </div>
    </div>
    <div class="intro shop"
         ref="shop">
      <div class="intro-container">
        <div class="img"
             :class="{'active': isShowShop === false}">
          <!-- <el-image :src="require('../common/img/shop.png')"
                    :lazy="true"></el-image> -->
        </div>
        <div class="text">
          <h1>证书兑换</h1>
          <p>使用积分，兑换商品</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getCurrentCityName } from '@/utils/index'
// import BMap from 'BMap'
// import Slider from '../components/slider'
// import { mapGetters } from 'vuex'
// import { debounce } from '../common/js/util'
export default {
  data () {
    return {
      // 进度条动画展示，只允许展示一次
      isShowProcess: false,
      step: 0,
      processScrollTop: '',
      currentScroll: 0,
      isShowSearch: true,
      isShowHelp: true,
      isShowHot: true,
      isShowShop: true,
      locationMsg: '',
      center: { lng: 0, lat: 0 }
    }
  },
  computed: {
    // nickname () {
    //   return this.userInfo.account || 'name'
    // },
    // room () {
    //   return this.userInfo.building + '幢' + this.userInfo.unit + '单元' + this.userInfo.room
    // },
    // helps () {
    //   return this.userInfo.wishes
    // },
    // count () {
    //   return this.userInfo.count
    // },
    // comment () {
    //   return this.userInfo.comment
    // },
    // goods () {
    //   return this.userInfo.goods
    // },
    // ...mapGetters([
    //   'userInfo'
    // ])
  },
  // mounted () {
  //   this.$nextTick(() => {
  //     // this.initScroll()
  //     getCurrentCityName().then((city) => {
  //       console.log(city)
  //       this.locationMsg = city
  //     })
  //   })
  // },
  created () {
    // let myCity = new BMap.LocalCity();
    // myCity.get((result) => {
    //   let geoc = new BMap.Geocoder();
    //   geoc.getLocation(result.center, (rs) => {
    //     // rs 中携带着所有的定位信息，这里只获取了城市(city)和所在的区(district)
    //     let addComp = rs.addressComponents;
    //     let result = addComp.city + addComp.district;
    //     this.locationMsg = result
    //     console.log(result)
    //   });
    // }, { enableHighAccuracy: true });
    setTimeout(() => {
      this.$nextTick(() => {
        // this.initScroll()
        getCurrentCityName().then((city) => {
          console.log(city)
          this.locationMsg = city
        })
      })
    }, 500)
  },
  methods: {
    handler ({ BMap, map }) {
      console.log(BMap, map)
      console.log(navigator.geolocation.getCurrentPosition)
      navigator.geolocation.getCurrentPosition((pos) => {
        this.center.lng = pos.coords.longitude
        this.center.lat = pos.coords.latitude
        console.log(pos, this.center)
      })
    },
    toMyHome () {
      this.$router.push('/myHome').catch(err => err)
    },
    onHot () {
      this.$router.push('/hot').catch(err => err)
    },
    onHelp () {
      this.$router.push('/help').catch(err => err)
    },
    onDrift () {
      this.$router.push('/drift').catch(err => err)
    },
    onWish () {
      this.$router.push('/wish').catch(err => err)
    },
    // 进度条展示
    initScroll () {
      this.processScrollTop = this.$refs.study.offsetTop - 300
      // debounce 函数防止滚动栏抖动
      window.addEventListener('scroll', (event) => debounce(this.handleScroll(event), 800))
    },
    handleScroll (e) {
      this.currentScroll = e.target.scrollingElement.scrollTop
      if (this.currentScroll > this.processScrollTop && this.currentScroll < 1206) {
        this.isShowProcess = true
        this.showProcess()
      }
      if (this.currentScroll > 1206 && this.currentScroll < 1591 && this.isShowSearch === true) {
        this.isShowSearch = false
      }
      if (this.currentScroll > 1591 && this.currentScroll < 1976 && this.isShowHot === true) {
        this.isShowHot = false
      }
      if (this.currentScroll > 1976 && this.currentScroll < 2361 && this.isShowHelp === true) {
        this.isShowHelp = false
      }
      if (this.currentScroll > 2361 && this.isShowShop === true) {
        this.isShowShop = false
      }
    },
    showProcess () {
      let timer = setInterval(() => {
        this.step = this.step + 1
        if (this.step === 4) {
          clearInterval(timer)
        }
      }, 2000)
    }
  },
  components: {
    // Slider
  }
}
</script>

<style scoped lang="scss">
.home {
  margin-top: 126px;
  .slider {
    background: $color-theme;
    height: 500px;
    .slider-box {
      position: relative;
      margin: 0 auto;
      width: $width-container;
      height: 100%;
      .info {
        position: absolute;
        right: 0px;
        bottom: 50px;
        width: 400px;
        height: 400px;
        background-color: $color-background;
        z-index: 5;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .logo {
          padding: 40px 0 20px 0;
        }
        .name {
          width: 100%;
          font-size: $font-size-large;
          text-align: center;
          margin-bottom: 20px;
        }
        .room {
          width: 350px;
          font-size: $font-size-medium;
          text-align: center;
        }
        .detail {
          display: flex;
          width: 350px;
          justify-content: space-around;
          margin-bottom: 25px;
          .item {
            width: 50px;
            height: 50px;
            text-align: center;
            .num {
              color: $color-theme;
            }
          }
        }
      }
    }
  }
  .section {
    width: 100%;
    margin-top: 30px;
    .section-wrapper {
      width: 60%;
      margin: 0 auto;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 50px 20px 50px 20px;
      .items {
        width: 160px;
        height: 200px;
        border: 1px solid #cccccc;
        box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.1);
        padding: 10px 15px 10px 15px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: white;
        &.good {
          background-color: $color-theme;
        }
        &.hots {
          background-color: #f56c6c;
        }
        &.helps {
          background-color: #e6a23c;
        }
        &.infos {
          background-color: #909399;
        }
        .icon {
          font-size: 70px;
        }
        .title {
          font-size: 30px;
        }
      }
    }
  }
  .study {
    width: 100%;
    padding: 80px 0px;
    margin-top: 30px;
    background-color: white;
    .container {
      align-items: center;
      width: $width-container;
      margin: 0 auto;
      display: flex;
      flex-direction: column;

      .title {
        font-size: 40px;
        color: $color-theme;
      }
      .text {
        padding: 10px 5px;
        font-size: $font-size-large;
      }
      .process {
        width: 100%;

        .icon-wrapper {
          margin: 20px 0px;
          display: flex;
          display: flex;
          justify-content: space-around;
          .icon {
            width: 100px;
            height: 100px;
            text-align: center;
            border-radius: 100px;
            border: 10px solid $color-theme;
            .item {
              font-size: 40px;
              line-height: 100px;
            }
          }
        }
      }
    }
  }
  .intro {
    width: 100%;
    padding: 80px 0px;

    &.hot,
    &.shop {
      background-color: white;
    }
    .intro-container {
      margin: 0 auto;
      width: $width-container;
      display: flex;
      justify-content: space-around;

      .text {
        width: 50%;

        h1 {
          margin-bottom: 20px;
          color: $color-theme;
        }
      }
      .img {
        width: 400px;
        height: 225px;

        // &.active{
        //   animation: 0.88s myImg;
        // }
      }
    }
  }
}
.el-divider--horizontal {
  margin: 0;
}
.icon {
  font-size: 76px;
}
// @keyframes myImg {
//   0%
//     transform: scale(1)
//   50%
//     transform: scale(1.2)
//   100%
//     transform: scale(1)
// }
.map {
  width: 100%;
  height: 300px;
}
</style>
