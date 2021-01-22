<template>
  <div>
    <div class="column menu">
      <ul>
        <li class="list" v-for="(item, i) in data" :key="i" @click="setActive(i)">{{item.name}}</li>
        <li class="list" v-if="type === 'menu'" @click="setMeal(), setActive(data.length)">Set Meals</li>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
* {
  box-sizing: border-box;
}
.column {
  float: left;
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
.menu {
  width: 25%;
  padding-left: 100px;
  /* margin-top: 1.3%; */
}
.content {
  width: 70%;
}
.contents {
  /* margin-top: -20px; */
  margin-bottom: 2%;
}
.menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.active {
  background-color:  #ffe1a6;
}
.menu li {
  padding: 8px;
	border: 1px solid #cccccc;
  padding-top: 15px;
  height: 51px;
  cursor: pointer;
}
.content{
	margin: 0% 3% 3% 0%;
}
.column1{
	float: left;
  width: 50%;
  padding: 10px;
  height: 300px;
}
</style>
<script>
import EditProduct from 'modules/generic/products/EditProduct.vue'
export default {
  props: ['data', 'type'],
  data() {
    return {
      isActive: false,
      hasError: false,
      isEdit: false,
      bundled: false
    }
  },
  components: {
    EditProduct
  },
  watch: {
    $route(to, from){
      console.log(to)
      this.isEdit = false
    }
  },
  methods: {
    setMeal(){
      this.$parent.isEdit = true
    },
    setActive(id) {
      this.isEdit = false
      this.bundled = false
      let active = document.getElementsByClassName('list')
      for (var i = 0; i < active.length; i++) {
        active[i].className = active[i].className.replace('active', '')
      }
      active[id].classList.add('active')
    }
  }
}
</script>
