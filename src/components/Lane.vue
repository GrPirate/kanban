<template lang="html">
  <div class="lane-wrap">
    <block
      v-for="(block, index) in data.blocks"
      :key="block.block_id"
      :lane-index="laneIndex"
      :block-index="index"
      :listdata="listdata"
      :data="block"></block>
  </div>
</template>
<script>
import Block from './Block.vue'

export default {
  name: 'lane',
  data () {
    return {
      // titleVisible: true
    }
  },
  props: {
    data: Object,
    listdata: Object,
    laneIndex: Number
  },
  components: {
    Block
  },
  methods: {

  }
}
</script>

<style lang="less">
.lane-wrap {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin-top: 50px;
  margin-bottom: -20px;
}
</style>
