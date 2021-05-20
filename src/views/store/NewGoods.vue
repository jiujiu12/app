<template>
  <div class="app-container">
    <el-card class=""
             style="backgroud: #fff;">
      <h2>商品上架</h2>
      <el-form ref="form"
               :model="form"
               label-width="120px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="所需积分">
          <el-input type="Number"
                    v-model="form.score" />
        </el-form-item>
        <el-form-item label="是否限量">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item v-if="form.delivery" label="限制数量">
          <el-input type="Number"
                    v-model="form.num" />
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                     list-type="picture-card"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"
                 :src="dialogImageUrl"
                 alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="开始时间">
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
        <el-form-item label="截止时间">
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
        <el-form-item label="描述">
          <el-input v-model="form.desc"
                    type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">发起</el-button>
          <el-button @click="onCancel">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
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
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
