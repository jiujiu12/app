<template>
  <el-card class="mgt-20 activity">
    <el-row class="mgt-20">
      <el-col :span="8"
              v-for="(o) in activityList"
              offset="2"
              :key="o">
        <el-card :body-style="{ padding: '0px' }">
          <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181127%2F39b86192bf3f43b495636b4b89021f7d.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623588368&t=0673d7ac2a241ea9f79d52a5a1353551"
               class="image">
          <div style="padding: 14px;">
            <span>{{activityList.activity_name}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text"
                         @click="toChangeStatus(0)"
                         class="button">报名</el-button>
              <el-button type="text"
                         @click="toChangeStatus(0)"
                         class="button">详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="mgt-20">
      <el-col :span="8"
              offset="2"
              v-for="(o) in 2"
              :key="o">
        <el-card :body-style="{ padding: '0px' }">
          <img src="https://img0.baidu.com/it/u=291351334,1527507428&fm=26&fmt=auto&gp=0.jpg"
               class="image">
          <div style="padding: 14px;">
            <span>图书馆志愿者</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text"
                         @click="toChangeStatus(0)"
                         class="button">报名</el-button>
              <el-button type="text"
                         @click="toChangeStatus(0)"
                         class="button">详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <pagination :total="pageObj.total"
                :page.sync="pageObj.page"
                :limit.sync="pageObj.limit"></pagination>
  </el-card>
</template>

<script>
import Pagination from '@/components/Common/Pagination.vue';
import DynamicForm from '@/components/Common/DynamicForm.vue';
export default {
  components: { Pagination, DynamicForm },
  data () {
    return {
      pageObj: {
        total: 4,
        page: 1,
        limit: 4
      },
      activityList: [
        {
          activity_name: "图书馆志愿者",
          activity_status: 0, // 初始状态
          activity_person: ""
        },
        {
          activity_name: "图书馆志愿者",
          activity_status: 1,
          activity_person: ""
        }
      ]
    }
  },
}
</script>

<style scoped>
.activity {
  margin-top: 131px;
}
img {
  width: 100%;
}
</style>