<template>
<!-- 公告管理 -->
  <el-card>
  <h2>公告管理</h2>
    <common-table ></common-table>
  </el-card>
</template>

<script>
import CommonTable from '@/components/Common/CommonTable'
export default {
  components: {
    CommonTable
  },
  data() {
    return {
      name: '',
      tableData: [],
      tableLabel: [
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
          prop: 'end_time'
        },
        
        
      ],
      pageObj: {
        total: 0,
        page: 1,
        limit: 10
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
