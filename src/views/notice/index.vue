<template>
  <!-- 公告管理 -->
  <div>
    <el-card class="tc">
      <!-- <h2>公告管理</h2> -->
      <dynamic-form :form="form"
                    :header="'公告管理'"
                    :formJson="formJson">
        <template slot="btns">
          <el-button type="primary"
                     @click="getNoticeList"
                     size="mini">查询</el-button>
          <el-button type="warning"
                     size="mini">重置</el-button>
          <el-button plain
                     @click="toAdd"
                     size="mini">新增</el-button>
        </template>
      </dynamic-form>
    </el-card>
    <el-card class="mgt-20">
      <common-table :tableData="tableData"
                    :tableLabel="tableLabel"
                    @pagination="getNoticeList"
                    :pageObj="pageObj">
      </common-table>
    </el-card>
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <dynamic-form :form="noticeForm"
                    :refAttr="'noticeForm'"
                    :allDisabled="isDetail"
                    :formJson="noticeJson"
                    @submit="submitEvent"
                    :hasSubmit="!isDetail"
                    :formLayout="1">
        <span slot="btns"
              class="dialog-footer">
          <el-button size="mini"
                     v-if="!isDetail"
                     @click="dialogVisible = false">取 消</el-button>
          <!-- <el-button size="mini"
                     type="primary"
                     @click="toAddNotice">确 定</el-button> -->
        </span>
      </dynamic-form>
    </el-dialog>
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
          label: '公告标题',
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
          notice_title: '公告测试',
          create_time: '2021-05-06',
          end_time: '2022-05-06',
          notice_des: '公告测试测试测试试'
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
          label: '公告标题',
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
          label: '公告描述',
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
              text: '编辑',
              event: this.toEdit
            },
            {
              text: '删除',
              event: delEvent
            }
          ]
        }
      ]
    },
    noticeJson () {
      return [
        {
          type: 'input',
          val: 'notice_title',
          label: '公告标题',
          require: true,
          trigger: 'blur'
        },
        {
          type: 'datetime',
          val: 'create_time',
          label: '创建时间',
          require: true,
          isDisabled: true,
          isShow: this.isDetail,
          trigger: 'blur'
        },
        {
          type: 'datetime',
          val: 'end_time',
          label: '截止日期',
          require: true,
          trigger: 'blur'
        },
        {
          type: 'textarea',
          val: 'notice_des',
          label: '公告描述  ',
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
    // 获取公告列表
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
    // 添加公告
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
      this.dialogVisible = true
      this.editNoticeId = notice_id
      this.isDetail = true
      this.isEdit = false
      this.toNoticeDetail(notice_id)
    },
    // 编辑公告
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
    // 删除公告
    async toDelNotice (noticeId) {
      const res = await delNotice({ noticeId })
      if (res.success) {
        this.$notify.success(res.message)
      } else {
        this.$notify.error(res.message)
      }
    },
    // 获取公告详情
    async toNoticeDetail (noticeId) {
      this.dialogVisible = true
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
