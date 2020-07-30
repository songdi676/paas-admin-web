<template>
  <div class="data-box">
    <el-row :span="24">
      <el-col
        v-for="(item,index) in data"
        :key="index"
        :md="span"
        :xs="24"
        :sm="12"
      >
        <div class="item">
          <a
            :href="item.href?item.href:'javascript:void(0);'"
            :target="item.target"
            @click="item.click?item.click(item):''"
          >
            <div
              v-if="item.showIcon"
              class="item-icon"
              :style="{backgroundColor:item.color}"
            >
              <i :class="item.icon" />
            </div>
            <div class="item-info">
              <avue-count-up
                :animation="animation"
                :style="{color:item.color}"
                class="title"
                :end="item.count"
              />
              <div class="data-box-title">{{ item.title }}</div>
              <div v-for="(subItem,subIndex) in item.subData.slice(0, 2)" :key="subIndex+'sub'" class="info">
                <span v-if="!item.dict">{{ subItem.title }}</span>
                <span v-if="item.dict">{{ item.dict[subItem.title ] }}</span>
                <span :style="{color:item.color}">{{ subItem.value }}</span>
              </div>
            </div>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DataBox',
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {}
  },
  computed: {
    animation() {
      return this.option.animation
    },
    span() {
      return this.option.span || 8
    },
    data() {
      return this.option.data || []
    }
  },
  watch: {},
  created() { },
  mounted() { },
  methods: {
    filter(array) {
      return array.slice(0, 2)
    }
  }
}
</script>
<style scoped>
 .data-box-title {
    background-color:rgb(233, 233, 235);
    color: rgb(48, 47, 47);
    font-size: 15px;
    text-align: center;
}
</style>
