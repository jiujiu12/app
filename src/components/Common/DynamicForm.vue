<template>
  <div class="dynamic-form">
    <div v-if="header"
         name="header">
      <div class="tc form-title card-title">
        <h2>{{header}}</h2>
      </div>
      <hr />
    </div>
    <el-form :ref="refAttr"
             label-suffix=":"
             class="form-content"
             :model="form"
             size="mini"
             :disabled="allDisabled"
             :label-width="labelWidth">
      <el-row v-for="(config, index) in formConfig"
              :key="index">
        <el-col v-for="(item, i) in config"
                :key="item.val || i"
                :offset="item.offsetValue || offsetValue"
                :span="item.spanValue || formLayout === 1 ? 24 : 8">
          <el-form-item :label="item.label || ''"
                        :prop="item.val || ''"
                        :rules="validRules(item)">
            <template v-if="
                ['input', 'textarea', 'password', 'prepend', 'append'].includes(
                  item.type
                )
              ">
              <el-input :type="item.type"
                        :style="{ width: `${item.width || 270}px` }"
                        :disabled="item.isDisabled || false"
                        v-bind="item.other || ''"
                        v-model="form[item.val]">
                <template v-if="item.type === 'prepend'"
                          slot="prepend">
                  {{ item.prependValue || '' }}
                </template>
                <template v-if="item.type === 'append'"
                          slot="append">
                  {{ item.appendValue || '' }}
                </template>
              </el-input>
            </template>
            <template v-if="item.type === 'select'">
              <el-select v-bind="item.other || ''"
                         :style="{ width: `${item.width || 270}px` }"
                         v-model="form[item.val]"
                         :popper-append-to-body="item.isAppendToBody || false"
                         @change="getLabelNames($event, item.selectName || '')"
                         placeholder="">
                <el-option v-for="op in item.options"
                           :key="op[item.selectVal]"
                           :label="op[item.selectLabel]"
                           :value="op[item.selectVal]"></el-option>
              </el-select>
            </template>
            <template v-if="item.type === 'date'">
              <el-date-picker v-model="form[item.val]"
                              type="date"
                              :style="{ width: `${item.width || 270}px` }"
                              v-bind="item.other || ''"
                              value-format="yyyy-MM-dd"
                              format="yyyy-MM-dd"
                              placeholder="选择日期"
                              align="right"></el-date-picker>
            </template>
            <template v-if="item.type === 'datetime'">
              <el-date-picker v-model="form[item.val]"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              format="yyyy-MM-dd HH:mm:ss"
                              :style="{ width: `${item.width || 270}px` }"
                              v-bind="item.other || ''"
                              placeholder="选择日期时间"
                              align="right"></el-date-picker>
            </template>
            <template v-if="item.type === 'radio'">
              <el-radio-group v-bind="item.other || ''"
                              v-model="form[item.val]">
                <el-radio v-for="op in item.options"
                          :key="op[item.selectVal]"
                          :label="op[item.selectVal]">
                  {{ op[item.selectLabel] }}
                </el-radio>
              </el-radio-group>
            </template>
            <template v-if="item.type === 'checkbox'">
              <el-checkbox-group v-bind="item.other || ''"
                                 v-model="form[item.val]">
                <el-checkbox v-for="op in item.options"
                             :key="op[item.selectVal]"
                             :label="op[item.selectVal]">
                  {{ op[item.selectLabel] }}
                </el-checkbox>
              </el-checkbox-group>
            </template>
            <template v-if="item.type === 'switch'">
              <el-switch v-bind="item.other || ''"
                         v-model="form[item.val]"></el-switch>
            </template>
            <template v-if="item.type === 'others'">
              <slot name="others"></slot>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="tc">
        <el-button v-if="hasSubmit"
                   size="mini"
                   type="primary"
                   @click="submit"
                   class="">提交</el-button>
        <!-- 自定义按钮组 -->
        <slot name="btns"></slot>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    refAttr: {
      required: false,
      type: String,
      default: ''
    },
    form: {
      required: true,
      type: Object,
      default: () => { }
    },
    formJson: {
      required: true,
      type: Array,
      default: () => []
    },
    labelWidth: {
      required: false,
      type: String,
      default: '90px'
    },
    formLayout: {
      required: false,
      type: Number,
      default: 2
    },
    dateFormat: {
      required: false,
      type: String,
      default: ''
    },
    hasSubmit: {
      require: false,
      type: Boolean,
      default: false
    },
    allDisabled: {
      require: false,
      type: Boolean,
      default: false
    },
    header: {
      require: false,
      type: String
    }
  },
  computed: {
    // 表单校验
    validRules () {
      return attr => {
        if (!attr.validator) {
          return {
            required: attr.require || false,
            message: attr.errMsg || attr.placeholder || attr.label + '是必填项',
            trigger: attr.trigger || 'change'
          }
        }
        // 自定义表单校验规则
        return {
          required: attr.require || false,
          validator: attr.validator,
          trigger: attr.trigger || 'change'
        }
      }
    },
    // 计算偏移量
    offsetValue () {
      return this.formLayout === 1
        ? 0
        : Math.floor((24 - 8 * this.formLayout) / (this.formLayout + 1))
    },
    formConfig () {
      // 根据isShow判断表单是否展示，不定义isShow则默认展示
      let formShow = this.formJson.filter(item => {
        return item.isShow === undefined || item.isShow
      })
      // 解决el-col不加el-row偶尔会空行问题（IE）
      const formShowCopy = this._.cloneDeep(formShow)
      let formConfig = []
      let layout = this.formLayout === 0 ? 1 : this.formLayout
      for (let i = 0; i < formShowCopy.length / layout; i++) {
        let nums = this.formLayout
        formConfig[i] = []
        while (nums > 0) {
          formConfig[i].push(formShow.shift() || [])
          nums--
        }
      }
      return formConfig
    }
  },
  methods: {
    // 树结构选中事件
    choseCurrentNode (data) {
      this.$emit('choseCurrentNode', data)
    },
    // 检验表单验证是否通过
    isLegal (ruleForm) {
      let isLegal = true
      this.$refs[ruleForm].validate(valid => {
        if (!valid) {
          isLegal = false
          this.$notify.error('表单验证未通过！')
        }
      })
      return isLegal
    },
    // 提交，默认传递表单校验结果是否合法
    submit () {
      let isLegal = this.isLegal(this.refAttr)
      console.log(isLegal)
      this.$emit('submit', isLegal)
    },
    getLabelNames (val, paramName) {
      this.$emit('getLabelNames', { val, paramName })
    }
  }
}
</script>

<style scoped lang="scss">
.form-content {
  padding: 20px 0;
}
</style>
