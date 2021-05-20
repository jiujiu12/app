<template>
  <!-- 表格组件 -->
  <div class="common-table">
    <!-- 表格工具 -->
    <slot>
      <div class="tableBar clearfix">
        <div class="table-title left-float">
          <slot name="table-title"></slot>
        </div>
        <div class="right-float"
             style="transform: translate(10px, 10px);">
          <slot name="toolBar"></slot>
        </div>
      </div>
      <hr />
    </slot>
    <el-table :data="tableData"
              size="mini"
              border
              :stripe="true"
              style="width: 100%">
      <template>
        <el-table-column v-for="(item, index) in tableLabel"
                         :key="index"
                         :prop="item.prop || ''"
                         :label="item.label"
                         :align="item.align || 'center'"
                         :sortable="item.sortable || false"
                         :fixed="item.fixed || false"
                         :show-overflow-tooltip="item.showOverflow || true">
          <template v-if="item.slot" v-slot="scope">
            <div v-if="item.oper">
              <el-button type="text"
                         v-for="(o, key) in item.oper"
                         @click="o.event(scope.row)"
                         :key="key">{{o.text}}</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <pagination :total="pageObj.total"
                :page.sync="pageObj.page"
                :limit.sync="pageObj.limit"
                @pagination="search(false)"></pagination>
  </div>
</template>

<script>
import Pagination from './Pagination.vue'
export default {
  components: { Pagination },
  props: {
    // 表单数据
    tableData: {
      required: true,
      type: Array,
      default: () => []
    },
    // 标题，字段
    tableLabel: {
      required: true,
      type: Array,
      default: () => []
    },
    pageObj: {
      required: false,
      type: Object
    },
    hasOp: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  created () {
    console.log(this.tableLabel)
    console.log(this.tableData)
  },
  methods: {
    search () {
      this.$emit('pagination', this.pageObj)
    }
  }
}
</script>

<style lang="scss" scoped>
.common-table {
  .el-table {
    color: rgb(65, 87, 167);
  }
  .el-table >>> th {
    color: rgb(65, 87, 167);
    background-color: rgb(198, 208, 247);
  }
  .el-table
    >>> .el-table--striped
    .el-table__body
    tr.el-table__row--striped
    td {
    background: #f3f5fd;
  }
}
</style>
