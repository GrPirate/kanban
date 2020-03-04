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
        :expend="expend"
        :task="task"
        ></block-item>
      <div class="block-empty" style="z-index: 10;bottom: 9px;" v-if="!expend"></div>
      <div class="block-empty" style="z-index: 9;bottom: 6px;" v-if="!expend"></div>
      <div class="block-empty" style="z-index: 8;bottom: 3px;" v-if="!expend"></div>
    </div>
    <div class="block-footer"
      @mousedown.stop
      @click.stop>
      <div class="task-wrap" v-show="visible">
        <div class="list-add-card-wrap">
          <el-input
            placeholder="请填写卡片名称"
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
      <draggable>
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
          <div class="list-add-card" v-show="!visible">
            <a href="#" class="list-add-card-btn" @click="visible = true">添加卡片</a>
            <div class="card-expend" @click="toggleExpend">
              <i class="el-icon-arrow-up card-up" v-if="expend"></i>
              <i class="el-icon-arrow-down card-down" v-if="!expend"></i>
            </div>
          </div>
        </droppable>
      </draggable>
    </div>
  </div>
</template>
<script>
import Draggable from './draggable.vue'
import Droppable from './droppable.vue'
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
      },
      isShowDrop: false,
      isShowDefalut: true,
      expend: true, // 是否展开
      dropBox: {
        margin: '10px 0 0 0',
        height: '200px',
        backgroundColor: '#c4c9cc'
      }
    }
  },
  directives: { Clickoutside },
  components: {
    Draggable,
    Droppable,
    BlockItem
  },
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
    },
    onDragEnter (params) {
      // 克隆出来的节点获取
      var mark = document.querySelector('.x-drag-mark')
      let dragHeight = mark.children[0].style.height
      // 进入自身的dropbox不需要有交互
      // 显示阴影框并且修改框的样式
      this.isShowDrop = true
      this.dropBox.height = dragHeight
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
    },
    onDragLeave (params) {
      // 隐藏阴影框
      this.isShowDrop = false
    },
    toggleExpend () {
      this.expend = !this.expend
    }
  }
}
</script>

<style lang="less">
.block-body {
  position: relative;
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

.block-empty {
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 4px;
  margin: 0 10px;
  height: 20px;
  position: absolute;
  width: 93%;
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
  justify-content: space-between;
}
.list-add-card-btn {
  padding-left: 5px;
  color: #888;
  height: 30px;
  line-height: 30px;
  display: block;
}

.card-expend {
  line-height: 30px;
  cursor: pointer;
}

.card-expend .card-up,
.card-expend .card-down {
  transition: all .5s;
}

.card-expend .card-up:hover {
  transform: scale(1.5)
}

.card-expend .card-down:hover {
  transform: scale(1.5)
}

.list-add-card-wrap {
  margin-top: 10px;
}

.list-add-card-fun {
  margin-top: 10px;
}
</style>
