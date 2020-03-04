<template lang="html">
<div
  @mousedown.stop
  @click.stop>
  <!-- <draggable
    :data="{index}"
    ref="drag-ele"
  >
    <droppable
      class="drop-box"
      @drop="onDrop"
    > -->
      <div class="panel">
        <div class="panel-head">
          <div class="list-title_name">
            <span class="list_name" @click="visible = true">{{data.list_name}}</span>
            <span class="card_amount">(<b class="amount_b">{{data.tasks.length}}</b>)</span>
            <el-popover
              placement="bottom-start"
              width="100"
              trigger="click">
              <ul>
                <li>删除列表</li>
              </ul>
              <a href="#" title="编辑" class="edit-right" slot="reference">
                <i class="icon iconfont gr-icon-bars"></i>
              </a>
            </el-popover>
          </div>
        </div>
        <div class="list_rename" v-if="visible" v-clickoutside="handleClose">
          <div class="panel-footer padding-three">
            <div class="form-signin">
              <div>
                <div class="form-group">
                  <el-input v-model="data.list_name" placeholder="请输入内容"></el-input>
                </div>
                <div class="form-group" style="display:flex;margin-top: 5px;">
                  <el-button type="success" size="small" @click="rename(data)">
                    保存
                  </el-button>
                  <el-button size="small" @click="visible = false">
                    取消
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- </droppable>
  </draggable> -->
</div>
</template>
<script>
// import Draggable from './draggable.vue'
// import Droppable from './droppable.vue'
import Clickoutside from 'element-ui/src/utils/clickoutside'
export default {
  name: 'list-title',
  data () {
    return {
      visible: false
    }
  },
  directives: { Clickoutside },
  props: {
    data: Object,
    index: Number
  },
  // components: {
  //   Draggable,
  //   Droppable
  // },
  methods: {
    handleClose: function () {
      this.visible = false
    },
    rename: function () {
      // Todo； title重命名
      this.visible = false
    },
    onDrop (params) {
      // drop 的列表添加数据
    }
  }
}
</script>

<style lang="less">
.hidden {
  display: none!important;
  visibility: hidden!important;
}
.list-title {
  display: flex;
  position: fixed;
  left: 0;
  z-index: 999;
  align-items: flex-start;
}
.list-title .panel {
  width: 300px;
  margin: 0 10px;
  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-width: 0;
  position: relative;
  display: -ms-flexbox;
  display: flex;
  background-color: #e5e9f2;
}

.list-title .panel .panel-head {
  padding: 10px 15px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-positive: 2;
  flex-grow: 2;
}

.list-title_name {
  height: 30px;
  line-height: 30px;
  font-size: 17px;
  display: flex;
}

.list-title_name .list_name {
  cursor: pointer;
  word-wrap: break-word;
  max-width: 173px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  font-weight: 700;
  color: #000;
}

.list-title_name .card_amount {
  display: inline-block;
  overflow: hidden;
  color: #000;
  margin-left: 5px;
  font-weight: 900;
  line-height: initial;
}
.list-title_name .card_amount .amount_b {
  display: inline-block;
  color: #48b2f7;
  margin: 0 3px;
  font-weight: 700;
}
a.edit-right {
  position: absolute;
  right: 6px;
  color: #9faec1;
}

a.edit-right:hover {
  color: #000;
}

.add-list {
  // border-radius: 5px;
  // height: 36px;
}

.list_add, .list_rename {
  z-index: 1000;
  width: 257px;
  flex-shrink: 0;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 0 8px #000;
}

.list_rename {
  position: absolute;
}
</style>
