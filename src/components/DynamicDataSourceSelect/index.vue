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
    type: {
      type: String,
      default: 'admin'
    }
  },
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
        this.$emit('changeDataSource', value)
      }
    }
  },
  created() {
    getDynamicDataSourceList(this.type).then(res => {
      this.dynamicDataSourceList = res
      if (res.length > 0) {
        this.$store.dispatch('changeDataSource', res[0].value)
        this.$emit('changeDataSource', res[0].value)
      }
    })
  },

  methods: {
    changeDataBase(value) {
      this.$store.dispatch('changeDataSource', value)
      this.$emit('changeDataSource', value)
    }
  }
}
</script>
