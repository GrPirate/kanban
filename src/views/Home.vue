<template lang="html">
  <div class="body">
    <!-- 公用弹出层 -->
    <keep-alive>
      <Edit
        @closeedit="hideEdit"
        v-if="editing"
        :databus="dataBus"
      ></Edit>
      <min-edit
        v-if="quickEdit"
        :databus="dataBus"
      >
      </min-edit>
      <pop-over
        v-if="isShowHeadOpt"
        @clearlist="clearList"
        :databus="dataBus"
      ></pop-over>
    </keep-alive>
    <div class="top">
      <div class="header-left">
        <el-button type="primary" icon="el-icon-menu" size="small">看板</el-button>
        <el-input
          style="width:180px;margin-left:10px;"
          placeholder="请输入搜索信息"
          icon="search"
          size="small"
        >
        </el-input>
      </div>
      <h2>TRELLO</h2>
      <div class="Btns">
        <el-button class="Btn" size="mini">
          <i class="icon gr-icon-plus"></i>
        </el-button>
        <el-button class="Btn" size="mini">
          <i class="icon gr-icon-info-circle"></i>
        </el-button>
        <el-button class="Btn" size="mini">
          <i class="icon gr-icon-envelope"></i>
        </el-button>
        <el-button class="Btn" size="mini">
          <i class="icon gr-icon-pen"></i>
        </el-button>
      </div>
      <div class="box-show">
        <ul class="showList">
          <li class="showTitle">
            <h3>标题</h3>
            <i class="el-icon-close"></i>
          </li>
          <ul>
            <li><h4>个人资料</h4></li>
            <li><h4>卡</h4></li>
            <li><h4>设置</h4></li>
            <li><h4>帮助</h4></li>
            <li><h4>快捷键</h4></li>
            <li><h4>更改语言</h4></li>
            <li><h4>退出</h4></li>
          </ul>
        </ul>
      </div>
    </div>
    <div class="information">
      <h3>看板标题</h3>
      <i class="el-icon-star-off"></i>
      <span>
        <i class="el-icon-more"></i>
        <a>显示菜单</a>
      </span>
    </div>
    <div
      class="scroll-wrap"
      ref="scrollWrap"
      @mousedown="moveContent"
      @mousemove.prevent
    >
      <div class="todo-content" ref="todoContent" id="todo-content">
        <list-title
        :list="res.list"></list-title>
        <lane
          v-for="(lane, index) in res.lanes"
          :key="lane.lane_id"
          :lane-index="index"
          :listdata="res"
          :data="lane"></lane>
        <div class="add-lane" v-if="!addVisible">
          <el-button type="info" @click="addVisible = true">添加泳道</el-button>
        </div>
        <div class="lane_add" v-if="addVisible" v-clickoutside="handleClose">
          <div class="panel-footer padding-three">
            <div class="form-signin">
              <div>
                <div class="form-group">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
                <div class="form-group" style="display:flex;margin-top: 5px;">
                  <el-button type="success" size="small" @click="addLane">
                    添加泳道
                  </el-button>
                  <el-button size="small" @click="addVisible = false">
                    取消
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- 主要内容模块 -->
        <!-- <list
        v-for="(listdata,key) in data"
        :listdata="listdata"
        :key="key"
        :index="key"
        :maindata="data"
        @startedit="showEdit"
        @quickedit="quickedit"
        @headoption="showOpt"
        @mousedown.stop
        :databus="dataBus"
        ></list>
        <div
          @click.stop class="add-card-wrap"
          :class="{'show-add-card': isAddList}"
        >
          <input
            type="text"
            class="add-card"
            placeholder="添加一个列表..."
            @mouseup="showAddList"
            @mousedown.prevent
          >
          <div class="add-card-edit">
            <input
              type="text"
              class="add-card-inp"
              placeholder="添加一个列表..."
              ref="addCardInp"
            >
            <el-button type="success" @click="saveAddList" size="small">保存</el-button>
          </div>
        </div> -->
      </div>
    </div>
    <div class="scroll-foo" ref="scrollFoo" v-show="showScroll">
      <div
        class="scroll-bar"
        ref="scrollBar"
        @mousedown="barMove"
      >
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
// import List from '@/components/List'
import ListTitle from '@/components/ListTitle'
import Lane from '@/components/Lane'
import Edit from '@/components/Edit'
import data from '../mock/mock.js'
import res from '../mock/data.js'
import MinEdit from '@/components/CardEditor'
import PopOver from '@/components/PopOver'
import Clickoutside from 'element-ui/src/utils/clickoutside'
let dataBus = new Vue({})
export default {
  name: 'home',
  data () {
    return {
      editing: false,
      quickEdit: false,
      data,
      res,
      dataBus,
      isAddList: false,
      showScroll: false,
      isShowHeadOpt: false,
      addVisible: false,
      input: '' // 添加泳道临时值
    }
  },
  directives: { Clickoutside },
  components: {
    // List,
    Edit,
    MinEdit,
    PopOver,
    ListTitle,
    Lane
  },
  methods: {
    // 控制是否 弹出编辑框
    hideEdit () {
      this.editing = false
    },
    showEdit () {
      this.editing = true
    },
    quickedit () {
      this.quickEdit = true
    },
    // 弹出表头的列表
    showOpt () {
      this.isShowHeadOpt = true
    },
    // 是否弹出添加列表框
    showAddList () {
      this.$refs.addCardInp.focus()
      this.isAddList = true
    },
    saveAddList () {
      let val = this.$refs.addCardInp.value.trim()
      if (val === '') return
      this.data.push(
        {
          title: val,
          item: []
        }
      )
      this.isAddList = false
      this.$refs.addCardInp.value = ''
      // 滚动条 和 todoContent的位置
      this.moveScrollBar()
    },
    // 滚动条移动
    moveScrollBar () {
      Vue.nextTick(function () {
        let bar = this.$refs.scrollBar
        let foo = this.$refs.scrollFoo
        const scrollWrap = this.$refs.scrollWrap
        const todoContent = this.$refs.todoContent
        if (todoContent.clientWidth <= scrollWrap.clientWidth) {
          // console.log('清除')
          this.showScroll = false
          return
        }
        // 显示滚动条
        this.showScroll = true
        Vue.nextTick(function () {
          // 计算滚动条宽度
          bar.style.width = (scrollWrap.clientWidth / todoContent.clientWidth) * foo.clientWidth + 'px'
          // console.log(bar.style.width)
          todoContent.style.left = -(todoContent.clientWidth - scrollWrap.clientWidth) + 'px'
          // 滚动条偏移
          bar.style.left = foo.clientWidth - bar.clientWidth + 'px'
        })
      }.bind(this))
    },
    // 清除列表时调整滚动条
    clearList () {
      this.moveScrollBar()
    },
    // 左右滚动内容区
    moveContent (e) {
      let startX = e.pageX
      const scrollWrap = this.$refs.scrollWrap
      const todoContent = this.$refs.todoContent
      let disWidth = todoContent.clientWidth - scrollWrap.clientWidth
      // 还没超出
      if (disWidth < 0) return
      // 滚动条部分
      let bar = this.$refs.scrollBar
      let foo = this.$refs.scrollFoo
      let barLeft = bar.offsetLeft
      // .
      let defaultLeft = todoContent.offsetLeft
      scrollWrap.onmousemove = function (e) {
        let moveX = e.pageX
        let disX = moveX - startX
        let L = defaultLeft + disX
        if (L >= 0) {
          L = 0
          disX = L - defaultLeft
        }
        if (L < -disWidth) {
          L = -disWidth
          disX = L - defaultLeft
        }
        todoContent.style.left = L + 'px'
        // .滚动条部分
        let rate = disX / disWidth
        let barMove = (foo.clientWidth - bar.clientWidth) * rate
        bar.style.left = barLeft - barMove + 'px'
      }
      scrollWrap.onmouseup = function (e) {
        this.onmousemove = this.onmouseup = null
      }
    },
    barMove (e) {
      let bar = this.$refs.scrollBar
      let foo = this.$refs.scrollFoo
      const scrollWrap = this.$refs.scrollWrap
      const todoContent = this.$refs.todoContent
      let todoLeft = todoContent.offsetLeft
      let startX = e.pageX
      let disX = startX - bar.offsetLeft
      document.onmousemove = function (e) {
        let x = e.pageX - disX
        let moveDis = startX - e.pageX
        if (x <= 0) {
          x = 0
          moveDis = startX - disX
        }
        if (x >= foo.clientWidth - bar.clientWidth) {
          x = foo.clientWidth - bar.clientWidth
          moveDis = startX - x - disX
        }
        bar.style.left = x + 'px'
        // 内容框移动部分
        let rate = moveDis / (foo.clientWidth - bar.clientWidth)
        let disWidth = todoContent.clientWidth - scrollWrap.clientWidth
        todoContent.style.left = todoLeft + disWidth * rate + 'px'
      }
      document.onmouseup = function () {
        this.onmousemove = this.onmouseup = null
      }
    },
    handleClose () {
      this.addVisible = false
    },
    addLane () {
      // 添加泳道
    }
  },
  updated () {
    document.onclick = () => {
      // 清除编辑todo信息框
      this.editing = false
      // 清除增加列表输入框
      this.isAddList = false
      this.quickEdit = false
      // 清除表头列表
      this.isShowHeadOpt = false
      this.$refs.addCardInp.value = ''
    }
  }
}
</script>

<style lang="less">
@import '../assets/style/main.less';
.add-lane {
  margin: 40px 10px;
  text-align: left;
}
.lane_add {
  z-index: 1000;
  width: 257px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding: 5px;
  border-radius: 4px;
  -webkit-box-shadow: 0 0 8px #000;
  box-shadow: 0 0 8px #000;
}
</style>
