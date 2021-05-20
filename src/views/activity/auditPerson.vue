<template>
  <!-- 招募成员管理 -->
  <div>
    <el-card v-if="!isDetail"
             class="tc">
      <!-- <h2>招募成员管理</h2> -->
      <dynamic-form :form="form"
                    :header="'招募成员管理'"
                    :formJson="formJson">
        <template slot="btns">
          <el-button type="primary"
                     @click="getNoticeList"
                     size="mini">查询</el-button>
          <el-button type="warning"
                     @click="resetParam"
                     size="mini">重置</el-button>
        </template>
      </dynamic-form>
    </el-card>
    <el-card v-if="!isDetail"
             class="mgt-20">
      <common-table :tableData="tableData"
                    :tableLabel="tableLabel"
                    @pagination="getNoticeList"
                    :pageObj="pageObj">
      </common-table>
    </el-card>
    <el-dialog title="审核"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <dynamic-form :form="noticeForm"
                    :refAttr="'noticeForm'"
                    :formJson="noticeJson"
                    @submit="submitEvent"
                    :formLayout="1">
        <span slot="btns"
              class="dialog-footer">
          <el-button size="mini"
                     @click="dialogVisible = false">打回</el-button>
          <el-button size="mini"
                     type="primary"
                     @click="dialogVisible = false">通过</el-button>
          <!-- <el-button size="mini"
                     type="primary"
                     @click="toAddNotice">确 定</el-button> -->
        </span>
      </dynamic-form>
    </el-dialog>
    <el-card v-if="isDetail" class="tc">
      <h2>审核</h2>
      <hr>
      <el-form :model="form" label-width="90px">
        <el-row>
          <el-col offset="8"
                  span="8">
            <el-form-item label="审核意见">
              <el-input v-model="form.desc"
                        type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">通过审核</el-button>
          <el-button @click="onCancel">打回</el-button>
          <el-button @click="isDetail = false">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mgt-20 tc"
             v-if="isDetail"
             style="backgroud: #fff;">
      <h2>成员详情</h2>
      <hr>
      <el-form ref="form"
               disabled
               :model="form"
               label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="积分">
          <el-input type="Number"
                    v-model="form.score" />
        </el-form-item>
        <el-form-item label="服务时长">
          <el-input type="Number"
                    v-model="form.score" />
        </el-form-item>
        <el-form-item label="院系专业">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.ph" />
        </el-form-item>
        <el-form-item label="学号信息">
          <el-input v-model="form.no" />
        </el-form-item>
        <!-- <el-form-item label="负责人">
          <el-select v-model="form.region"
                     filterable
                     placeholder="选择活动负责人">
            <el-option label="Zone one"
                       value="shanghai" />
            <el-option label="Zone two"
                       value="beijing" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="注册时间">
          <el-col :span="11">
            <el-date-picker v-model="form.date1"
                            type="date"
                            placeholder="Pick a date"
                            style="width: 100%;" />
          </el-col>
          <el-col :span="2"
                  class="line">-</el-col>
          <el-col :span="11">
            <el-time-picker v-model="form.date2"
                            type="fixed-time"
                            placeholder="Pick a time"
                            style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="报名时间">
          <el-col :span="11">
            <el-date-picker v-model="form.date1"
                            type="date"
                            placeholder="Pick a date"
                            style="width: 100%;" />
          </el-col>
          <el-col :span="2"
                  class="line">-</el-col>
          <el-col :span="11">
            <el-time-picker v-model="form.date2"
                            type="fixed-time"
                            placeholder="Pick a time"
                            style="width: 100%;" />
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="Activity type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="Online activities" name="type" />
            <el-checkbox label="Promotion activities" name="type" />
            <el-checkbox label="Offline activities" name="type" />
            <el-checkbox label="Simple brand exposure" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Resources">
          <el-radio-group v-model="form.resource">
            <el-radio label="Sponsor" />
            <el-radio label="Venue" />
          </el-radio-group>
        </el-form-item> -->
      </el-form>
    </el-card>
  </div>
</template>

<script>
import CommonTable from '@/components/Common/CommonTable'
import DynamicForm from '@/components/Common/DynamicForm.vue'
import { getNotice, getNoticeDetail, addNotice, editNotice, delNotice } from '@/api/notice'

const editEvent = (row) => {
  console.log('edit', row)
}
const detailEvent = (row) => {
  console.log('detail', row)
  return 1
}
const delEvent = (row) => {
  console.log('del', row)
}
export default {
  components: {
    CommonTable,
    DynamicForm
  },
  data () {
    return {
      name: '',
      formJson: [
        {
          type: 'input',
          label: '招募成员',
          val: 'notice_title'
        },
        {
          type: 'datetime',
          label: '创建时间',
          val: 'create_time'
        },
        {
          type: 'datetime',
          label: '截止时间',
          val: 'end_time'
        }
      ],
      form: {
        notice_title: '',
        create_time: '2021-05-06',
        end_time: '2022-05-06'
      },
      tableData: [
        {
          notice_title: '招募成员测试',
          create_time: '2021-05-06',
          end_time: '2022-05-06',
          notice_des: '招募成员测试测试测试试'
        }
      ],
      pageObj: {
        total: 1,
        page: 1,
        limit: 5
      },
      dialogTitle: '新增',
      dialogVisible: false,
      noticeForm: {
        notice_title: '',
        create_time: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
        end_time: '',
        notice_des: ''
      },
      isAdd: false,
      isEdit: false,
      editNoticeId: '',
      isDetail: false
    }
  },
  computed: {
    tableLabel () {
      return [
        {
          label: '招募成员标题',
          prop: 'notice_title'
        },
        {
          label: '发布时间',
          prop: 'create_time'
        },
        {
          label: '截至日期',
          prop: 'end_time'
        },
        {
          label: '招募成员描述',
          prop: 'notice_des'
        },
        {
          label: '操作',
          slot: true,
          oper: [
            {
              text: '查看',
              event: this.toDetail
            },
            {
              text: '审核',
              event: this.toAdd
            }
          ]
        }
      ]
    },
    noticeJson () {
      return [
        {
          type: 'textarea',
          val: 'notice_des',
          label: '审核意见',
          require: true,
          trigger: 'blur'
        }
      ]
    },
    submitEvent () {
      return this.isAdd ? this.toAddNotice : this.toEditNotice
    }
  },
  created () {
    console.log(this.detailEvent)
    this.noticeForm = {
      notice_title: '',
      create_time: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
      end_time: '',
      notice_des: ''
    }
    this.getNoticeList()
  },
  methods: {
    // 获取招募成员列表
    async getNoticeList () {
      const params = {
        page: this.pageObj.page,
        limit: this.pageObj.limit
      }
      const res = await getNotice(params)
      if (res.success) {
        this.tableData = res.data.tableData
        this.pageObj.total = res.data.total
      }
    },
    toAdd () {
      this.isAdd = true
      this.dialogVisible = true
      this.noticeForm = {
        notice_title: '',
        create_time: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
        end_time: '',
        notice_des: ''
      }
    },
    // 添加招募成员
    async toAddNotice (isLegal) {
      if (!isLegal) {
        return
      }
      const res = await addNotice(this.noticeForm)
      if (res.success) {
        this.dialogVisible = false
        this.toAdd = false
        this.$notify.success(res.message)
        this.getNoticeList()
      } else {
        this.dialogVisible = false
        this.$notify.error(res.message)
      }
    },
    toEdit ({ notice_id }) {
      this.dialogVisible = true
      this.editNoticeId = notice_id
      this.isEdit = true
      this.isDetail = false
      this.toNoticeDetail(notice_id)
    },
    toDetail ({ notice_id }) {
      // this.dialogVisible = true
      this.editNoticeId = notice_id
      this.isDetail = true
      this.isEdit = false
      this.toNoticeDetail(notice_id)
    },
    // 编辑招募成员
    async toEditNotice (isLegal) {
      if (!isLegal) {
        return
      }
      const param = {
        noticeId: this.editNoticeId,
        options: {
          notice_title: this.noticeForm.notice_title,
          end_time: this.noticeForm.end_time,
          notice_des: this.noticeForm.notice_des
        }
      }
      console.log(param)
      const res = await editNotice(param)
      if (res.success) {
        this.dialogVisible = false
        this.$notify.success(res.message)
        this.getNoticeList()
      } else {
        this.dialogVisible = false
        this.$notify.error(res.message)
      }
    },
    // 删除招募成员
    async toDelNotice (noticeId) {
      const res = await delNotice({ noticeId })
      if (res.success) {
        this.$notify.success(res.message)
      } else {
        this.$notify.error(res.message)
      }
    },
    // 获取招募成员详情
    async toNoticeDetail (noticeId) {
      // this.dialogVisible = true
      const res = await getNoticeDetail({ noticeId })
      let temp = {
        create_time: this.$moment(res.data.create_time).format('YYYY-MM-DD HH:mm:ss'),
        end_time: this.$moment(res.data.end_time).format('YYYY-MM-DD HH:mm:ss')
      }
      if (res.success) {
        this.noticeForm = Object.assign(res.data, temp)
      } else {
        this.$notify.error(res.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
