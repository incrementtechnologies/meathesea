<template>
<span>
 <tbody v-for="(button,ndx) in buttons" style="display: inline-block;">
  	<button class="navbar-btn" :style="(button.colorLine === 'blue') ? 'color: blue; border: 1px solid #0064B1;' : 'color: red; border: 1px solid red;'" @click="returnComponent(ndx)">{{ button.text }}</button>
</tbody>
</span>
</template>
<style scoped>
.navbar-btn {
  margin-top: 10px;
  margin-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  height: 52px;
  border-radius: 50px;
}
.elWrapper {
  /* margin-left: 5px;
  margin-right: 5px; */
}
@media (max-width: 1450px) {
  .elWrapper {
    font-size: 12px;
  }
}
@media (max-width: 1300px) {
  .elWrapper {
    width: 100% !important;
  }
}
</style>
<script>
import Vue from 'vue'
export default {
  props: ['buttons'],
  methods: {
    returnComponent(ndx){
      this.$emit('btnClick', ndx)
    }
  }
}
</script>
