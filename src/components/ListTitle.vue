<template lang="html">
  <div>
    <div class="list-title">
      <title-item
        v-for="(item, index) in list"
        :index="index"
        :key="item.list_id"
        :data="item"
        ></title-item>
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
import TitleItem from './Title-item'
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
  components: { TitleItem },
  props: {
    list: Array
  },
  methods: {
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
