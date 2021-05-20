<template>
  <div class="foot">
    <div class="foot-wrapper">
      <div class="intro">
        <p class="title">网站制作人</p>
        <p class="text">任苗苗</p>
        <p class="title">网站介绍</p>
        <p class="text">网站内容均可自行注册后可使用</p>
        <p class="title">网站版权</p>
        <p class="text">网站设计内容均为本人所拥有</p>
      </div>
      <div class="resume">
        <p class="title">网站前端</p>
        <p class="text">Javascript, Scss, Vuejs,Vuex,Vue-router,Element-UI</p>
        <p class="title">网站后端</p>
        <p class="text">NodeJs, Koa, Mysql</p>
      </div>
      <!-- <div class="link">
        <el-image style="width: 200px;height: 200px" :src="url"></el-image>
      </div> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      // url: require('../common/img/erweima.jpg')
    }
  }
}
</script>

<style scoped lang="scss">
  .foot {
    width: 100%;
    background-color: #e5e5e5;
    min-height: 340px;

    .foot-wrapper{
      margin: 0 auto;
      width: 80%;
      display: flex;

      .intro{
        line-height: 35px;
        padding-top: 50px;
        margin-right :50px;
        .title{
          font-size: $font-size-large;
        }
        .text{
          color: $color-text-desc;
          font-size: $font-size-medium;
        }
      }
      .resume{
        line-height: 35px;
        padding-top: 50px;
        flex :1;
        .title{
          font-size: $font-size-large;
        }
        .text{
          color: $color-text-desc;
          font-size: $font-size-medium;
        }
      }
      .link{
        padding-top :50px;
      }
    }
  }
</style>
