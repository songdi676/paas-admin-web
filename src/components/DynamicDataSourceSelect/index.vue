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

  data() {
    return {
      dynamicDataSourceList: []
    }
  },
  computed: {
    dataSource: {
      get() {
        return this.$store.state.user.dataSource
      },
      set(value) {
        this.$store.dispatch('changeDataSource', value)
      }
    }
  },
  mounted() {
    getDynamicDataSourceList().then(res => {
      this.dynamicDataSourceList = res
    })
  },

  methods: {
    changeDataBase(value) {
      this.$store.dispatch('changeDataSource', value)
    }
  }
}
</script>
