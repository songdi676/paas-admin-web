<template>
  <el-select v-model="dataSource" size="small" class="filter-item" placeholder="请选择数据源">
    <el-option
      v-for="item in dynamicDataSourceList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      @change="changeDataBase"
    /></el-select>
</template>
<script>
import { getDynamicDataSourceList } from '@/api/mnt/database'

export default {
  name: 'DynamicDataSourceSelect',
  props: {
    system: {
      type: String,
      default: 'admin'
    }
  },
  data() {
    return {
      dataSourceMap: {
        system: this.system,
        dataSource: ''
      },
      dynamicDataSourceList: []
    }
  },
  computed: {
    dataSource: {
      get() {
        return this.$store.state.user.dataSource
      },
      set(value) {
        this.dataSourceMap.dataSource = value
        this.dataSourceMap.system = this.system
        this.$store.dispatch('changeDataSource', this.dataSourceMap)
        this.$emit('changeDataSource', this.dataSourceMap)
      }
    }
  },
  created() {
    getDynamicDataSourceList(this.system).then(res => {
      this.dynamicDataSourceList = res
      if (res.length > 0) {
        this.dataSourceMap.dataSource = res[0].value
        this.dataSourceMap.system = this.system
        this.$store.dispatch('changeDataSource', this.dataSourceMap)
        this.$emit('changeDataSource', this.dataSourceMap)
      }
    })
  },

  methods: {
    changeDataBase(value) {
      this.dataSourceMap.dataSource = value
      this.dataSourceMap.system = this.system
      this.$store.dispatch('changeDataSource', this.dataSourceMap)
      this.$emit('changeDataSource', this.dataSourceMap)
    }
  }
}
</script>
