<template>
	<div class="contents">
		<div class="clearfix">
			<CategoryList v-if="categories" :data="categories"/>
			<div class="column content">
				<ProductList v-if="!isEdit" :data="products" @showAddForm="isEdit = true"/>
        <EditProduct v-if="isEdit" :data="data" :category1="category1" :category2="category2" @onSave="update(data)" :bundle="false"/>
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
import axios from 'axios'
export default {
  data() {
    return {
      isActive: false,
      hasError: false,
      isEdit: false,
      data: null,
      categories: null,
      products: null,
      firstRetrieve: true,
      category1: null,
      category2: null,
      token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2MDQ1NjEwNDEsImV4cCI6MTkxOTkyMTA0MSwiaXNzIjoiaHR0cHM6Ly9tdHNiYWNrZW5kZGV2LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjpbImh0dHBzOi8vbXRzYmFja2VuZGRldi5henVyZXdlYnNpdGVzLm5ldC9yZXNvdXJjZXMiLCJub3BfYXBpIl0sImNsaWVudF9pZCI6IjkzZTZjNDNlLTJjOTUtNGY3Yi04YzJiLWEwMTA5YmExODFiYyIsInN1YiI6IjkzZTZjNDNlLTJjOTUtNGY3Yi04YzJiLWEwMTA5YmExODFiYyIsImF1dGhfdGltZSI6MTYwNDU2MTAzOSwiaWRwIjoibG9jYWwiLCJzY29wZSI6WyJub3BfYXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.qRvEbcmpAPO-qhMBJqk0jDCNbl_BsmBdVStz76P2uLQi37uS6SoitQ5AV31M8PijiOaLbJQQ4uddRpI7P45virWUseq7wq1Xi9KDpKduo9bnRKFHu3UwBJJo_Wmgl86V_tNiJpey7Xdswr80E6rWFCL-Nneh9kfcs9ka-Igg2cwLb0Hlt1BHd42IB-700S9g5SIQir4vcWPbWkotMyik2NORXwjS7lnta_lXlTnxC4xWMREMpBwt4x6J9eLLunmy9Dj6LypLWt20C-JEiCvBHEjDff0QviVEIcnsqys0CucZUQ-jCD3-jHoFPCC79-PmSFojcmXVG-M0FcON8iLArw'
    }
  },
  mounted() {
    this.retrieveCategories()
    this.retrieveCategory1()
    this.retrieveCategory2()
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
      this.isEdit = false
    },
    setActive(id) {
      this.isEdit = false
      let active = document.getElementsByClassName('list')
      for (var i = 0; i < active.length; i++) {
        active[i].className = active[i].className.replace('active', '')
      }
      active[id].classList.add('active')
    },
    retrieveCategories() {
      $('#loading').css({'display': 'block'})
      this.APIGetRequest('/get_deli_shop_categories?storeId=' + 1, response => {
        $('#loading').css({'display': 'none'})
        if(response.categories.length > 0) {
          this.categories = response.categories
          if(this.firstRetrieve === true) {
            this.retrieveProducts(this.categories[0].id)
            this.firstRetrieve = false
          }
        } else {
          this.categories = null
        }
      })
    },
    retrieveProducts(id) {
      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`/products?CategoryId=${id}`, response => {
        $('#loading').css({'display': 'none'})
        if(response.products.length > 0) {
          this.products = response.products
        } else {
          this.products = null
        }
      })
    },
    retrieveOneProduct(id) {
      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`/products/${id}`, response => {
        console.log('rtireve', response.data)
        $('#loading').css({'display': 'none'})
        if(response.data !== null) {
          this.data = response.data.products[0]
        } else {
          this.data = null
        }
      })
    },
    update(product){
      if(product.name !== '' && product.name !== null && product.full_description !== '' && product.price !== '' && product.old_price !== '' && product.old_price !== null){
        $('#loading').css({'display': 'block'})
        let Prod = {
          product: {
            Id: product.id,
            name: product.name,
            full_description: product.full_description,
            price: product.price,
            old_price: product.old_price
          }
        }
        this.APIPutRequest(`products/${product.id}`,
        Prod
        , response => {
          $('#loading').css({'display': 'none'})
        })
      }
    },
    retrieveCategory1(){
      this.APIGetRequest(`get_addOnCategory_1`, response => {
        this.category1 = response.add_on_category
      })
    },
    retrieveCategory2(){
      this.APIGetRequest(`get_addOnCategory_2`, response => {
        this.category2 = response.add_on_category
      })
    }
  }
}
</script>
