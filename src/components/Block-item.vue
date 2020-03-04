<template lang="html">
  <div
    class="card-body"
    v-if="expend || taskIndex === 0"
    @mousedown.stop
    @click.stop>
    <draggable
      :data="{taskIndex, blockIndex, laneIndex, listdata}"
      @dragstart="onSourceDragStart"
      ref="drag-ele"
    >
      <droppable
        class="drop-box"
        @dragend="onDragEnd"
        @drop="onDrop"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
      >

        <!-- 检测到拖动时显示的 -->
        <div
          class="task-wrap"
          v-show="isShowDrop"
        >
          <div
            class="task-view"
            :style="dropBox"
          >
          </div>
        </div>
        <div
          class="task-wrap"
          v-if="isShowDefalut">
          <div class="task-view">
            <div class="edit-card">
              <span>
                <i class="icon iconfont gr-icon-pencil-alt"></i>
              </span>
              <span>
                <i class="icon iconfont gr-icon-trash-alt"></i>
              </span>
            </div>
            <div class="task-title">
              <h3 class="">{{task.task_name.slice(0, 5)}}</h3>
            </div>
            <div class="task-content">
              <p>{{task.task_name}}</p>
            </div>
            <div class="card-main">
              <div class="task-user">
                <a href="#"></a>
              </div>
              <div class="task-function">
                <div class="task-datetime">
                  <i class="icon iconfont gr-icon-clock1"></i>
                  <div class="time" :title="task.start_time | format('YYYY-MM-DD HH:mm:ss')" v-if="!!task.start_time">
                    <span>{{task.start_time | format('MMMDo')}}</span>
                    <el-date-picker
                      format="yyyy-MM-dd HH:mm:ss"
                      v-model="task.start_time"
                      @change="changeStartTime($event, task)"
                      type="datetime">
                    </el-date-picker>
                  </div>
                  <span v-if="!!task.start_time && !!task.deadline">-</span>
                  <div class="time" :title="task.deadline | format('YYYY-MM-DD HH:mm:ss')" v-if="!!task.deadline">
                    <span>{{task.deadline | format('MMMDo')}}</span>
                    <el-date-picker
                      v-model="task.deadline"
                      @change="changeDeadLine($event, task)"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                </div>
                <div class="task-estimate" v-if="!!task.estimate">
                  <el-popover
                    placement="bottom"
                    width="200"
                    :visible-arrow="false"
                    v-model="estimateVisible"
                    trigger="click">
                    <div>
                      <i class="icon iconfont gr-icon-hourglass1"></i>
                      <span>工时</span>
                    </div>
                    <el-input v-model="task.estimate" size="small" style="margin-top: 10px;"></el-input>
                    <el-button type="success" size="small" @click="saveEstimate(task)" style="margin-top: 10px;">保存</el-button>
                    <el-button type="text" style="margin-left: 10px;" @click="estimateVisible = false">取消</el-button>
                    <span title="工时" class="estimate" slot="reference">{{task.estimate}}</span>
                  </el-popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </droppable>
    </draggable>
  </div>
</template>
<script>
import Draggable from './draggable.vue'
import Droppable from './droppable.vue'
import moment from 'moment'
import Clickoutside from 'element-ui/src/utils/clickoutside'

export default {
  name: 'block-item',
  data () {
    return {
      visible: false,
      estimateVisible: false,
      addCard: {
        cardName: '',
        estimate: null,
        deadline: null,
        visible: false
      },
      isShowDrop: false,
      isShowDefalut: true,
      isShowLabel: false,
      itemChecked: false,
      dropBox: {
        height: '200px',
        backgroundColor: '#c4c9cc'
      }
    }
  },
  components: {
    Draggable,
    Droppable
  },
  directives: { Clickoutside },
  props: {
    task: Object,
    taskIndex: Number,
    laneIndex: Number,
    blockIndex: Number,
    listdata: Object,
    expend: Boolean
  },
  filters: {
    format (val, arg) {
      if (!val) return
      val = val.toString()
      let m = moment(val).format(arg)
      return m
    }
  },
  methods: {
    changeStartTime: function (e, task) {
      console.log(e, task)
      // 设置任务开始时间
    },
    changeDeadLine: function (e, task) {
      console.log(e, task)
      // 设置任务结束时间
    },
    saveEstimate: function (task) {
      this.estimateVisible = false
      // 保存工时操作
    },
    computedShowLabel () {
      this.isShowLabel = false
      this.item.labels.forEach(label => {
        if (label.picked === true) {
          this.isShowLabel = true
        }
      })
      return this.isShowLabel
    },
    // 拖放插件方法
    onSourceDragStart (params) {
      // 克隆的节点旋转角度
      var mark = document.querySelector('.x-drag-mark')
      mark.style.transform = 'rotate(2deg)'
    },
    onDragEnd (params) {
      // 隐藏阴影框
      // 还原默认的内容框
      this.isShowDrop = false
      this.isShowDefalut = true
    },
    onDrop (params) {
      // debugger
      // drop 的列表添加数据
      let tid = params.data.taskIndex
      let bid = params.data.blockIndex
      let lid = params.data.laneIndex
      this.listdata.lanes[this.laneIndex].blocks[this.blockIndex].tasks.splice(this.taskIndex, 0, params.data.listdata.lanes[lid].blocks[bid].tasks[tid])
      // this.listdata.tasks.splice(this.index, 0, params.data.listdata.tasks[params.data.index])
      // 原列表删除该数据
      if (params.data.listdata.lanes[lid].blocks[bid].block_id === this.listdata.lanes[this.laneIndex].blocks[this.blockIndex].block_id && params.data.index > this.index) {
        // 同一列表下 并且 由下往上移 注意删除的索引要+1
        params.data.listdata.lanes[lid].blocks[bid].tasks.splice(tid + 1, 1)
        return
      }
      params.data.listdata.lanes[lid].blocks[bid].tasks.splice(tid, 1)
    },
    onDragEnter (params) {
      // 克隆出来的节点获取
      var mark = document.querySelector('.x-drag-mark')
      let dragHeight = mark.children[0].style.height
      // 进入自身的dropbox不需要有交互
      if (params.sourceNode === this.$refs['drag-ele'].$el) {
        this.isShowDefalut = false
      }
      // 显示阴影框并且修改框的样式
      this.isShowDrop = true
      this.dropBox.height = dragHeight
    },
    onDragLeave (params) {
      // 隐藏阴影框
      this.isShowDrop = false
    }
  },
  created: function () {
    moment.locale('zh-cn')
  }
}
</script>

<style lang="less">
.x-drag-mark {
  z-index: 9999 !important;
}
.card-body {
  position: relative;
  z-index: 99;
}
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

.task-wrap .task-view {
  position: relative;
  margin: 10px;
  border-radius: 5px;
  background: white;
  padding: 10px;
  cursor: pointer;
}

.task-wrap .task-view .edit-card {
  position: absolute;
  right: 0;
  color: #9e9e9e;
}

.task-title h3 {
  text-align: left;
  white-space: normal;
}

.task-content {
  margin: 10px 0;
}

.task-content p {
  white-space: normal;
  text-align: left;
}

/***********card-main************/
.card-main {
  width: 100%;
  height: 40px;
}

.task-user {
  float: left;
  height: 50px;
}

.task-user a {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: inline-block;
  background: antiquewhite;
}

.card-main .task-function {
  float: right;
  height: 40px;
  line-height: 40px;
}

.task-datetime {
  display: inline-block;
  margin-right: 5px;
}

.task-datetime .time {
  cursor: pointer;
  display: inline-block;
  margin: 0 4px;
  position: relative;
}

.task-datetime .time .el-date-editor {
  position: absolute;
  left: 0;
  width: 40px;
  opacity: 0;
}

.task-datetime .time .el-date-editor .el-input__prefix,
.task-datetime .time .el-date-editor .el-input__suffix {
  display: none;
}

.task-datetime .time .el-date-editor .el-input__inner {
  padding: 0;
  cursor: pointer;
}

.task-estimate {
  display: inline-block;
  margin-right: 5px;
}

.task-estimate span.estimate {
  display: inline-block;
  padding: 2px 8px;
  background: #475668;
  line-height: 16px;
  border-radius: 15px;
  color: white;
}

</style>
