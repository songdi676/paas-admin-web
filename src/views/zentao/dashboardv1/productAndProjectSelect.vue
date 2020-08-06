<template>
  <div class="PPSelect">
    <div style="display: inline-block;margin-right: 20px;font-size: 20px">数据库</div>
    <DynamicDataSourceSelect system="zentao" @changeDataSource="changeDataSource" />
    <div style="display: inline-block;margin-right: 20px;font-size: 20px">Product</div>
    <el-select v-model="valueProduct" placeholder="请选择" size="mini" popper-class="selectMode" @change="productChange">
      <el-option
        v-for="item in optionsProduct"
        :key="item.value"
        class="selectOption"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div style="display: inline-block;margin-right: 20px;margin-left: 20px;font-size: 20px">Project</div>
    <el-select v-model="valueProject" placeholder="请选择" size="mini" popper-class="selectMode" @change="projectChange">
      <el-option
        v-for="item in optionsProject"
        :key="item.value"
        class="selectOption"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div id="title">禅道工时</div>
  </div>

</template>

<script>
import { getZtProductList } from '@/api/zentao/product'
import { getProductProjectList } from '@/api/zentao/project'

export default {
  name: 'ProductAndProjectSelect',
  data() {
    return {
      optionsProduct: [],
      valueProduct: '虎踞云',
      optionsProject: [],
      valueProject: ''
    }
  },
  created() {
    this.$eventBus.$on('changeZentaoDataSource', projectName => {
      this.getProduct()
    })
  },
  mounted() {

  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getProduct() {
      const data = {
        'pageNum': 1,
        'pageSize': 9999999
      }
      getZtProductList(data).then(res => {
        this.optionsProduct = res.content
        this.valueProduct = this.productList[0].id
        this.productName = this.productList[0].name
        this.getProject()
      })
    },

    getProject() {
      const data = {
        params: this.valueProduct,
        pageInfo: {
          'pageNum': 1,
          'pageSize': 9999999
        }
      }
      getProductProjectList(data).then(res => {
        this.optionsProject = res.content
        this.valueProject = this.projectList[0].id
        this.projectName = this.projectList[0].name
      })
    },
    changeDataSource(e) {
      this.$eventBus.$emit('changeZentaoDataSource', e)
    },
    productChange(e) {
      this.$eventBus.$emit('projectChange', e)
      this.getProject()
    },
    projectChange(projectName) {
      this.$eventBus.$emit('projectChange', projectName)
    }
  }
}
</script>

<style>

  .PPSelect{
    display: flex;
    flex-direction: row;
    padding-left: 52px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #32C5FF;
    letter-spacing: 0;
    text-align: center;
    background-image: linear-gradient(180deg, #021232 14%, #031A48 100%);
    width: 95%;
    height: 4%;
    padding-top: 18px;
  }
  #title{
    font-family: PingFangSC-Semibold;
    font-size: 28px;
    color: #32C5FF;
    letter-spacing: 1.98px;
    text-align: center;
    margin-bottom: 10px;
    margin-left: 12.5%;
  }
  .selectMode {
    background: #052767;
    color: #32C5FF;
    border:1px solid #052767;
  }
  .el-input__inner {
    background: #052767;
    color: #32C5FF;
    letter-spacing: 1.98px;
    border:1px solid #052767;
  }

  .selectOption {
    color: #32C5FF;
    letter-spacing: 1.98px;
    border:1px solid #052767;
  }
</style>
