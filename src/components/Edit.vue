<template lang="html">
  <div class="edit-background">
    <div class="edit-con" @click.stop>
      <el-row style="height:40px">
        <el-col :span="24">
          <i class="close-btn icon gr-icon-times" @click="closeEdit"></i>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="pic">
            <div class="column">
              <div
                class="pic-show"
                :style="imgSrc"
              >
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="text-container" id="edit-text-container">
            <div class="write-text" v-if="!writeText">
              <el-button type="info" @click="changeText" size="small">
                <i class="icon iconfont gr-icon-pencil-alt"></i>
              </el-button>
              <span class="edit-title">
                {{userdata.text}}
              </span>
            </div>
            <div class="write-text" v-if="writeText">
              <el-input
                type="text"
                ref="textInp"
                size="small"
                style="width:200px;margin-right:10px;"
                v-model="userdata.text"
                @blur="cancelText"
              ></el-input>
              <el-button type="success" size="small" @click="saveText">保存</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <div class="twelve">
            <div class="list">
              <div class="column">
                <h3>标签</h3>
                <LabelPicker
                @sendlabel="setLabel"
                :eventbus="eventBus"
                ></LabelPicker>
              </div>
            </div>
            <div class="list">
              <div class="column">
                <h3>到期日</h3>
                <picker
                  @senddate = "setDeadline"
                  :eventbus = "eventBus"
                ></picker>
              </div>
            </div>
            <div class="list">
              <div class="column">
                <h3>description</h3>
                <div class="editDes" v-if = "writeDes">
                  <div
                  id="leave-message-textarea"
                  contenteditable="true"
                  data-text="输入描述"
                  ref = "desInp"
                  @blur = "cancelDes"
                  ></div>
                  <button
                  class="ui button green saveDes"
                  @mousedown = "saveDes"
                  >保存</button>
                  <i class="icon close" style="font-size:18px" @click = "cancelDes"></i>
                </div>
                <div class="ui card fluid" v-if = "!writeDes">
                  <div class="content">
                    <div class="header" style="text-align: left;">描述</div>
                    <div class="meta" style="text-align: left;">
                      <!-- 第一次接受到userdata是一个{} -->
                      {{typeof userdata.des === 'undefined' || Object.keys(userdata.des).length === 0 ?'可添加描述' :timePast(userdata.des.addtime)}}&nbsp;&nbsp;
                      <a @click = "changeDes">编辑</a>
                      <a @click = "delDes">删除</a>
                    </div>
                    <div class="description" style="text-align: left;">
                      <p>{{userdata.des?userdata.des.text:''}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="list">
              <div class="column">
                <h3>评论</h3>
                <div class="ui minimal comments">
                  <div
                    class="comment"
                    v-for="(val,key) in userdata.comments"
                    :key="key"
                    v-show="userdata.comments.length"
                  >
                    <a class="avatar">
                      <img src="https://semantic-ui.com/images/avatar/small/matt.jpg">
                    </a>
                    <div class="content" style="text-align: left;">
                      <a class="author">{{val.userName}}</a>
                      <div class="metadata">
                        <span class="date">{{timePast(val.addtime)}}</span>
                      </div>
                      <div class="text">
                        {{val.text}}
                      </div>
                      <div class="actions">
                        <a class="reply" @click = "delComment(key)">删除</a>
                      </div>
                    </div>
                  </div>
                  <form class="ui reply form">
                    <div class="field green">
                      <textarea id = "comment-input" v-model = "inputVal"></textarea>
                    </div>
                    <el-button type="success">
                      <i class="icon gr-icon-edit"></i> 添加回复
                    </el-button>
                  </form>
                </div>
                <!-- column -->
              </div>
              <!-- row list -->
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="four wide column" style="padding:10px;">
            <div class="ui one column grid">
              <div class="column">
                <h3>添加</h3>
              </div>
              <div class="column">
                <button
                  class="green fluid ui button"
                  @click = "showDate"
                >
                <i class="gr-icon-calendar icon"></i>
                到期日</button>
              </div>
              <div class="column">
                <button
                  class="fluid ui button"
                  @click = "changeDes"
                >
                <i class="gr-icon-file-alt icon"></i>
                描述</button>
              </div>
              <div class="column">
                <button
                  class="fluid ui button"
                  @click.stop = "showLabel"
                >
                <i class="gr-icon-tags icon"></i>
                标签</button>
              </div>
              <div class="column">
                <button class="fluid ui button">
                <i class="icon gr-icon-paperclip"></i>
                附件</button>
              </div>
              <div class="column">
                <h3>操作</h3>
              </div>
              <div class="column">
                <button class="fluid ui button" style="text-decoration:line-through">
                <i class="icon gr-icon-copy"></i>
                复制</button>
              </div>
              <div class="column">
                <button class="fluid ui button" style="text-decoration:line-through">
                <i class="icon gr-icon-arrows-alt"></i>
                移动</button>
              </div>
              <div class="column">
                <button class="fluid ui button" style="text-decoration:line-through">
                <i class="gr-icon-user icon"></i>
                归档</button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
// import userdata from '../mock/mock.js'
import picker from '@/components/Date-picker'
import LabelPicker from '@/components/Label-picker'
import Vue from 'vue'
// 编辑面板组件间通信
let eventBus = new Vue({})
export default {
  name: 'edit',
  props: {
    // 编辑面板与列表子项的通信
    databus: Object
  },
  data () {
    return {
      userdata: {},
      eventBus,
      inputVal: '',
      writeDes: false,
      writeText: false
    }
  },
  components: {
    picker,
    LabelPicker
  },
  mounted () {
    this.databus.$on(
      'sendListData',
      function (data) {
        // 获取列表项的数据
        this.userdata = data
        // 传递给日期文本框
        // 因为数据是异步获取的 不能直接props获取
        this.eventBus.$emit('changePicker', this.userdata.deadline)
        // 传递的标签信息
        this.eventBus.$emit('sentlabel', this.userdata.labels)
      }.bind(this)
    )
    this.eventBus.$on(
      'getlabel',
      function (labels) {
        this.userdata.labels = labels
      }.bind(this)
    )
  },
  computed: {
    // 判断图片的路径
    imgSrc () {
      let obj = null
      if (typeof this.userdata.attachments === 'object' && this.userdata.attachments.length) {
        obj = { backgroundImage: `url(${this.userdata.attachments[0].src})` }
      }
      return obj
    }
  },
  methods: {
    // 过去的时间
    timePast (timeObj) {
      let str = ''
      let hours, months, years, days, mins
      let now = new Date()
      let count = (now.getTime() - timeObj.getTime()) / 1000
      count = Math.round(count)
      str = count + '秒前'
      years = Math.floor(count / (365 * 24 * 3600))
      months = Math.floor((count / (30 * 24 * 3600)) % 12)
      days = Math.floor((count / (24 * 3600)) % 30)
      hours = Math.floor((count / 3600) % 24)
      mins = Math.floor((count / 60) % 60)
      str = this.timeFormat(years, months, days, hours, mins)
      return str
    },
    // 格式化过去的时间
    timeFormat (years, months, days, hours, mins) {
      let str = ''
      if (years) {
        str = years + '年前'
      } else if (months) {
        str = months + '个月前'
      } else if (days) {
        str = days + '天前'
      } else if (hours) {
        str = hours + '小时前'
      } else {
        str = mins === 0 ? '刚刚' : mins + '分钟前'
      }
      return str
    },
    // 接受并修改到期日
    setDeadline (date) {
      this.userdata.deadline = date
    },
    // 关闭面板
    closeEdit () {
      this.$emit('closeedit')
    },
    // 接受并且修改标签信息
    setLabel (val) {
      this.userdata.labels = val
    },
    // 修改标题
    changeText () {
      this.writeText = true
      Vue.nextTick(() => {
        this.$refs.textInp.focus()
        this.$refs.textInp.value = this.userdata.text
      })
    },
    // 保存标题修改
    saveText () {
      // let val = this.$refs.textInp.value.trim()
      // if (val === '') return
      // this.userdata.text = val
      // this.$refs.textInp.value = ''
      this.writeText = false
    },
    cancelText () {
      this.writeText = false
      // this.$refs.textInp.value = ''
    },
    // 添加一条评论
    addComment () {
      if (!(this.inputVal = this.inputVal.trim())) return
      this.userdata.comments.push({
        id: Date.now(),
        userName: 'Author(作者)',
        text: this.inputVal,
        addtime: new Date()
      })
      this.inputVal = ''
    },
    // 删除一条评论
    delComment (key) {
      this.userdata.comments.splice(key, 1)
    },
    // 弹出修改描述框
    changeDes () {
      let _this = this
      this.writeDes = true
      Vue.nextTick(function () {
        _this.$refs.desInp.innerText = _this.userdata.des.text ? _this.userdata.des.text : ''
        // 聚焦
        _this.$refs.desInp.focus()
        // 设置光标到最后
        let range = getSelection(_this.$refs.desInp).getRangeAt(0)
        range.setStart(range.startContainer, _this.$refs.desInp.innerText.length)
      })
    },
    // 保存描述修改
    saveDes () {
      let val = this.$refs.desInp.innerText
      if ((val = val.trim()) === '') return
      // 如果直接des.text = 是没有用的 并不能更新视图
      // 只能监听到第一层的变化
      this.userdata.des = {
        text: val,
        addtime: new Date()
      }
      this.$refs.desInp.innerText = ''
      this.writeDes = false
    },
    // 删除描述
    delDes () {
      this.userdata.des = {}
    },
    // 取消修改
    cancelDes () {
      this.writeDes = false
      this.$refs.desInp.innerText = ''
    },
    // {右侧按钮部分}
    // 显示标签
    showLabel () {
      eventBus.$emit('showLabel')
    },
    // 显示日历
    showDate () {
      eventBus.$emit('showDate')
    }
  }
}
</script>

<style lang="less">
/*遮罩*/
.edit-background {
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  z-index: 99;
}
/*最外层容器*/
.edit-con {
  box-shadow: 5px 5px 16px rgba(0, 0, 0, 0.5);
  width: 580px;
  position: absolute;
  background: white;
  left: calc(50% - 265px);
  top: 20px;
  /*头部图片容器*/
  .pic {
    height: 160px;
    background-color: black;
    text-align: center;
    /*放背景图的div*/
    .pic-show {
      display: inline-block;
      width: 40%;
      height: 100%;
      /*background-image:url('http://www.semantic-ui-cn.com/images/avatar/large/elliot.jpg');*/
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
  /*标题*/
  .text-container {
    .edit-title {
      font-size: 20px;
      font-weight: bold;
      vertical-align: bottom;
      display: inline-block;
      line-height: 30px;
      margin-left: 10px;
    }
  }
  /*标签,描述,评论都是一个list*/
  .twelve {
    padding: 20px;
    .list {
      margin-bottom: 10px;
      padding-left: 0;
      h3{
        text-align: left;
      }
    }
  }
  /*头部白色横条*/
  .close {
    height: 36px;
    position: relative;
  }
  /*关闭 按钮*/
  .close-btn {
    position: absolute;
    right: 2px;
    top: 10px;
    font-size: 1.5rem;
    cursor: pointer;
  }
}
#edit-text-container {
  padding: 20px;
  .write-text {
    display: flex;
  }
}
/*评论输入框*/
.edit-con #comment-input {
  resize: none;
  width: 100%;
  height: 40px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  font: normal 18px/20px '微软雅黑';
}
/*描述编辑输入框*/
#leave-message-textarea {
  width: 100%;
  min-height: 100px;
  max-height: 140px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  outline: 0;
  border: 1px solid #c3c5c6;
  font-size: 14px;
  color: #595959;
  overflow-x: hidden;
  overflow-y: auto;
  background: #e6e8e8;
  -webkit-user-modify: read-write-plaintext-only;
}
#leave-message-textarea:focus {
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}
</style>
