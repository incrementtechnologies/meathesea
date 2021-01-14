<template>
	<div class="contents">
		<div class="clearfix">
			<div class="column menu">
				<ul>
					<li class="list" v-for="(item, i) in 15" :key="i" @click="setActive(i)">The Flight</li>
				</ul>
			</div>
			<div class="column content">
				<Menu v-if="!isEdit"/>
        <EditProduct v-if="isEdit"/>
			</div>
		</div>
	</div>
</template>

<style lang="css">
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
  width: 18%;
  padding-left: 100px;
}
.content {
  width: 70%;

}
.contents {
  margin-top: 2%;
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
import Menu from 'modules/products/Menu.vue'
import EditProduct from 'modules/products/EditProduct.vue'
export default {
  data() {
    return {
      isActive: false,
      hasError: false,
      isEdit: false
    }
  },
  components: {
    Menu,
    EditProduct
  },
  methods: {
    setActive(id) {
      let active = document.getElementsByClassName('list')
      for (var i = 0; i < active.length; i++) {
        active[i].className = active[i].className.replace('active', '')
      }
      active[id].classList.add('active')
    }
  }
}
</script>
