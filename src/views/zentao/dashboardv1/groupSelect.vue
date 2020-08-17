<template>
  <div class="topSelect">
    <div style="padding-top: 5px;font-size: 18px;">工时预览</div>
    <div style="display: inline-block;margin-left: 70%;padding-top: 5px;">选择小组：</div>
    <el-select v-model="valueGroup" placeholder="选择小组" size="mini" popper-class="selectMode" @change="groupChange">
      <el-option value="" label="全部" />
      <el-option
        v-for="item in optionsGroup"
        :key="item.name"
        class="selectOption"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script>
import { getDeptListByProject } from '@/api/zentao/dept'

export default {
  name: 'GroupSelect',
  props: {
    project: {
      type: Number,
      required: true
    }},
  data() {
    return {
      optionsGroup: [],
      valueGroup: ''
    }
  },
  watch: { 'project': function() {
    if (!this.project) {
      return
    }
    getDeptListByProject(this.project).then(r => {
      this.optionsGroup = r
    })
  } },
  created() {
    this.getGroup()
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    groupChange(groupName) {
      this.$eventBus.$emit('groupChange', groupName)
    }
  }
}
</script>

<style>
  .topSelect{
    display: flex;
    flex-direction: row;
    padding-left: 30px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #32C5FF;
    letter-spacing: 0;
    /* text-align: center; */
    background-image: linear-gradient(180deg, #02215E 14%, #082D78 100%);
    width: 100%;
    height: 50px;
    padding-top: 13px;
    /*  */
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
