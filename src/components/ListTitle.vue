<template lang="html">
  <div>
    <div class="list-title" v-clickoutside="handleName">
      <div
        v-for="(item, index) in list"
        :key="item.list_id"
        class="panel">
        <div class="panel-head">
          <div class="list-title_name">
            <span class="list_name" @click="showRename(index, $event)">{{item.list_name}}</span>
            <span class="card_amount">(<b class="amount_b">{{item.tasks.length}}</b>)</span>
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
        <div class="list_rename hidden">
          <div class="panel-footer padding-three">
            <div class="form-signin">
              <div>
                <div class="form-group">
                  <el-input v-model="item.list_name" placeholder="请输入内容"></el-input>
                </div>
                <div class="form-group" style="display:flex;margin-top: 5px;">
                  <el-button type="success" size="small" @click="rename(item)">
                    保存
                  </el-button>
                  <el-button size="small" @click="handleName">
                    取消
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="add-list" v-if="addVisible">
        <el-button type="info" size="small" @click="addVisible = false">添加列表</el-button>
      </div>
      <div class="list_add" v-if="!addVisible" v-clickoutside="handleClose">
        <div class="panel-footer padding-three">
          <div class="form-signin">
            <div>
              <div class="form-group">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
              <div class="form-group" style="display:flex;margin-top: 5px;">
                <el-button type="success" size="small" @click="addList">
                  添加列表
                </el-button>
                <el-button size="small" @click="cancel">
                  取消
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
export default {
  name: 'list-title',
  data () {
    return {
      input: '',
      addVisible: true,
      titleDom: null,
      renameIndex: -1
    }
  },
  directives: { Clickoutside },
  props: {
    list: Array
  },
  methods: {
    showRename: function (index, e) {
      if (this.titleDom) {
        this.titleDom.className = 'list_rename hidden'
      }
      this.renameIndex = index
      let $rename = e.srcElement.parentNode.parentNode.nextSibling
      this.titleDom = $rename
      $rename.className = 'list_rename'
    },
    handleName: function () {
      if (!this.titleDom) return false
      this.titleDom.className = 'list_rename hidden'
    },
    addList: function () {
      // todo: 添加列表操作
      if (!this.input) return false
      this.addVisible = true
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    },
    cancel: function () {
      this.input = ''
      this.addVisible = true
    },
    handleClose: function () {
      this.addVisible = true
    },
    rename: function () {
      // Todo； title重命名
      this.handleName()
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
