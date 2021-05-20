<template>
  <div class="app-container">
    <el-card class=""
             style="backgroud: #fff;">
      <dynamic-form :form="form"
                    :header="'活动管理'"
                    :formJson="formJson">
        <template slot="btns">
          <el-button type="primary"
                     size="mini">查询</el-button>
          <el-button type="warning"
                     size="mini">重置</el-button>
          <el-button plain
                     size="mini">
            <router-link :to="{name: 'create'}">新增</router-link>
          </el-button>
        </template>
      </dynamic-form>
    </el-card>
    <el-card class="mgt-20">
      <el-row>
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
                           class="button">招募</el-button>
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
                           @click="toChangeStatus(1)"
                           class="button">停止招募</el-button>
                <el-button type="text"
                           class="button">已招募：20</el-button>
                <el-button type="text"
                           class="button">需招募人数：40</el-button>
                <router-link type="text"
                             :to="{name: 'auditPerson'}"
                             class="button">审核</router-link>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <pagination :total="pageObj.total"
                  :page.sync="pageObj.page"
                  :limit.sync="pageObj.limit"></pagination>
    </el-card>
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <span>{{dialogText}}</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="changeStatus(dialogStatus)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
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
      form: {
        activity_name: "",
        activity_status: "",
        activity_person: ""
      },
      formJson: [
        {
          type: 'input',
          label: '活动标题',
          val: 'activity_name'
        },
        {
          type: 'input',
          label: '活动状态',
          val: 'activity_status'
        },
        {
          type: 'input',
          label: '负责人',
          val: 'activity_person'
        }
      ],
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
      ],
      dialogVisible: false,
      dialogText: '',
      dialogStatus: 0
    };
  },
  methods: {
    onSubmit () {
      this.$message("submit!");
    },
    onCancel () {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    },
    toChangeStatus (status) {
      this.dialogVisible = true
      if (status === 0) {
        this.dialogText = '是否开始招募'
        this.dialogStatus = 0
      } else {
        this.dialogText = '是否停止招募'
        this.dialogStatus = 1
      }
    },
    changeStatus (status) {
      this.dialogVisible = false
      if (status === 0) {
        this.dialogText = '是否开始招募'
        this.dialogStatus = 1
      } else {
        this.dialogText = '是否停止招募'
        this.dialogStatus = 2
      }
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
img {
  width: 100%;
}
</style>
