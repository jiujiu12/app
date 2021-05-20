<template>
  <div class="app-container create-group">
    <el-card class="" style="backgroud: #fff;">
      <h2>创建组织</h2>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="组织名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="组织积分">
          <el-input type="Number" v-model="form.score" />
        </el-form-item>
        <el-form-item label="组织时长">
          <el-input type="Number" v-model="form.score" />
        </el-form-item>
        <el-form-item label="组织地址">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="负责人">
          <el-select
            v-model="form.region"
            filterable
            placeholder="选择组织负责人"
          >
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-col :span="11">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="form.date2"
              type="fixed-time"
              placeholder="Pick a time"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="截止时间">
          <el-col :span="11">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="form.date2"
              type="fixed-time"
              placeholder="Pick a time"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="是否开始招募">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item label="招募人数">
          <el-input type="Number" v-model="form.score" />
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
        <el-form-item label="描述">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发起</el-button>
          <el-button @click="onCancel">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
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
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
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
.create-group {
  margin-top: 131px;
}
</style>
