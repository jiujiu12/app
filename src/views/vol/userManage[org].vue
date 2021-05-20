<template>
  <div>
    <el-card class="tc">
      <h2>用户管理</h2>
      <dynamic-form :form="form"
                    :formJson="formJson">
        <template slot="btns">
          <el-button type="primary"
                     size="mini">查询</el-button>
          <el-button type="warning"
                     size="mini">重置</el-button>
          <el-button plain
                     size="mini">新增</el-button>
        </template>
      </dynamic-form>
    </el-card>
    <el-card class="mgt-20">
      <common-table :tableData="tableData"
                    :tableLabel="tableLabel"
                    :pageObj="pageObj">
      </common-table>
    </el-card>
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CommonTable from '@/components/Common/CommonTable'
import DynamicForm from '@/components/Common/DynamicForm.vue'
const editEvent = (row) => {
  console.log('edit', row)
}
const detailEvent = (row) => {
  console.log('detail', row)
  return 1
}
const delEvent = (row) => {
  console.log('del', row)
  alert('确认将用户从组织中删除吗？')
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
          label: '用户名',
          val: 'notice_title'
        },
        {
          type: 'datetime',
          label: '注册时间',
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
          group_name: '用户测试',
          create_time: '2021-05-06',
          org_admin_name: '小明',
          admin_ph: '18899009900',
          admin_addr: '经济管理学院 信息管理与信息系统',
          group_des: '用户测试测试测试试'
        }
      ],
      pageObj: {
        total: 1,
        page: 1,
        limit: 10
      }
    }
  },
  computed: {
    tableLabel () {
      return [
        {
          label: '用户名',
          prop: 'group_name'
        },
        {
          label: '注册时间',
          prop: 'create_time'
        },
        {
          label: '真实姓名',
          prop: 'org_admin_name'
        },
        {
          label: '号码',
          prop: 'admin_ph'
        },
        {
          label: '院系专业',
          prop: 'admin_addr'
        },
        {
          label: '用户描述',
          prop: 'group_des'
        },
        {
          label: '操作',
          slot: true,
          oper: [
            {
              text: '查看',
              event: detailEvent
            },
            {
              text: '删除',
              event: delEvent
            }
          ]
        }
      ]
    }
  },
  created () {
    console.log(this.detailEvent)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
