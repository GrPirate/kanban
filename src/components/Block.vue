<template lang="html">
  <div class="block-wrap">
    <div class="block-body">
      <block-item
        v-for="(task, index) in data.tasks"
        :key="index"
        :task-index="index"
        :lane-index="laneIndex"
        :block-index="blockIndex"
        :listdata="listdata"
        :task="task"
        ></block-item>
      <div class="task-wrap" v-show="visible" v-clickoutside="handleClose">
        <div class="list-add-card-wrap">
          <el-input
            v-model="addCard.cardName"></el-input>
          <div class="list-add-card-fun add-datetime">
            <div title="工时" style="cursor:pointer">
              <el-popover
                placement="bottom"
                width="200"
                :visible-arrow="false"
                v-model="addCard.visible"
                trigger="click">
                <div>
                  <i class="icon iconfont gr-icon-hourglass1"></i>
                  <span>工时</span>
                </div>
                <el-input v-model="addCard.estimate" size="small" style="margin-top: 10px;"></el-input>
                <el-button type="success" size="small" @click="saveEstimateAddCard" style="margin-top: 10px;">保存</el-button>
                <el-button type="text" style="margin-left: 10px;" @click="addCard.visible = false">取消</el-button>
                <i class="icon iconfont gr-icon-hourglass1" slot="reference"></i>
              </el-popover>
            </div>
            <div title="截止时间" class="time" style="position:relative">
              <i class="icon iconfont gr-icon-clock1"></i>
              <el-date-picker
                size="mini"
                v-model="addCard.deadline"
                @change="changeDeadLineAddCard($event)"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </div>
          <div class="add-card-footer">
            <el-button type="success" size="small">保存</el-button>
            <el-button type="text" @click="visible = false">取消</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="block-footer">
      <div class="list-add-card" v-show="!visible">
        <a href="#" class="list-add-card-btn" @click="visible = true">添加卡片</a>
      </div>
    </div>
  </div>
</template>
<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
import BlockItem from './Block-item.vue'

export default {
  name: 'block',
  data () {
    return {
      visible: false,
      addCard: {
        cardName: '',
        estimate: null,
        deadline: null,
        visible: false
      }
    }
  },
  directives: { Clickoutside },
  components: { BlockItem },
  props: {
    data: Object,
    laneIndex: Number,
    blockIndex: Number,
    listdata: Object
  },
  methods: {
    saveEstimateAddCard: function () {
      // 添加卡片中保存工时
    },
    changeDeadLineAddCard: function () {

    },
    handleClose: function () {
      this.visible = false
    }
  }
}
</script>

<style lang="less">
.block-wrap {
  background-color: #e5e9f2;
  flex: 0 0 300px;
  width: 300px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  box-shadow: none;
  border-top-width: 0;
  border-top-style: hidden;
  border-top-color: transparent;
  overflow: hidden;
  border-radius: 8px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.task-wrap {
  position: relative;
}

.add-datetime .time .el-date-editor {
  position: absolute;
  left: 0;
  width: 40px;
  opacity: 0;
}

.add-datetime .time .el-date-editor .el-input__prefix,
.add-datetime .time .el-date-editor .el-input__suffix {
  display: none;
}

.add-datetime .time .el-date-editor .el-input__inner {
  padding: 0;
  cursor: pointer;
}

.add-datetime {
  text-align: left;
}

.add-datetime div{
  display: inline-block;
}

.add-card-footer {
  text-align: left;
}

.block-wrap .block-footer {
  padding: 0 10px 5px 10px;
  border-top: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.block-wrap .block-footer .list-add-card {
  display: flex;
  width: 100%;
  height: 30px;
}
.list-add-card-btn {
  padding-left: 5px;
  color: #888;
  height: 30px;
  line-height: 30px;
  display: inline-block;
}

.list-add-card-wrap {
  margin: 10px;
}
</style>
