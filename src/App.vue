<template>
  <div id="app">
    <router-view /> 
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  background: #fcfcfc;
}
body .el-table th.gutter {
  display: table-cell !important;
}

body .el-table colgroup.gutter {
  display: table-cell !important;
}
</style>
