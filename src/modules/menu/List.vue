<template>
	<div class="contents">
		<div class="clearfix">
			<CategoryList :type="'menu'" :data="data"/>
			<div class="column content">
				<ProductList v-if="!isEdit" :data="data" @showAddForm="isEdit = true"/>
        <EditProduct v-if="isEdit" :bundle="bundled"/>
			</div>
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
import ProductList from 'modules/generic/products/ProductList.vue'
import EditProduct from 'modules/generic/products/EditProduct.vue'
import CategoryList from 'modules/generic/products/CategoryList.vue'
export default {
  data() {
    return {
      isActive: false,
      hasError: false,
      isEdit: false,
      bundled: false,
      data: [{
        name: 'Bites'
      }, {
        name: 'Snacks'
      }, {
        name: 'Deep Fried Snacks'
      }, {
        name: 'Salads / Soups'
      }, {
        name: 'Main couress'
      }, {
        name: 'Pastas'
      }, {
        name: 'Sides'
      }, {
        name: 'Steaks'
      }, {
        name: 'Desserts'
      }]
    }
  },
  watch: {
    $route(to, from){
      console.log(to)
      this.isEdit = false
    }
  },
  components: {
    ProductList,
    CategoryList,
    EditProduct
  },
  methods: {
    redirectEdit(){
      this.bundled = true
      this.isEdit = false
      // e.currentTarget.classList.add('active')
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
