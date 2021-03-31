<template>
<div>
  <button class="btn btn-outline-primary addBtn" style="float: right; margin-right: 77px" v-if="$route.name === 'menuItems' && category !== null && add === false" @click="$emit('showAddForm', true), isEdit = true, add = true">
    <b>add new</b></button>
  <div>
    <br><br>
  </div>
	<div class="contents">
		<div class="clearfix">
			<CategoryList :type="'menu'" :data="categories"/>
			<div class="column content">
				<ProductList v-if="!isEdit" :data="products" @showAddForm="isEdit = true"/>
        <EditProduct :categoryId="category" v-if="isEdit" :data=" add === true ? null : data" @onSave="update($event)" :bundle="bundled"/>
			</div>
		</div>
	</div>
</div>
</template>
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
      detail: null,
      bundled: false,
      categories: null,
      products: null,
      firstRetrieve: true,
      category: null,
      add: false
    }
  },
  watch: {
    $route(to, from){
      console.log(to)
      this.isEdit = false
    }
  },
  mounted() {
    this.retrieveCategories()
  },
  components: {
    ProductList,
    CategoryList,
    EditProduct
  },
  methods: {
    redirectEdit(){
      this.isEdit = false
      // e.currentTarget.classList.add('active')
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
      this.APIGetRequest('/get_restaurant_categories?storeId=1', response => {
        $('#loading').css({'display': 'none'})
        if(response.categories.length > 0) {
          this.categories = response.categories
          if(this.firstRetrieve === true) {
            this.retrieveProducts(this.categories[0].id)
            this.firstRetrieve = false
          }
        }
      })
    },
    retrieveProducts(id) {
      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`/products?CategoryId=${id}`, response => {
        if(response.products.length > 0) {
          this.products = response.products
          $('#loading').css({'display': 'none'})
        } else {
          $('#loading').css({'display': 'none'})
        }
      })
    },
    retrieveOneProduct(id) {
      $('#loading').css({'display': 'block'})
      this.APIGetRequest(`/products/${id}`, response => {
        $('#loading').css({'display': 'none'})
        if(response.products.length > 0) {
          this.data = response.products[0]
          // this.detail = response.products[0].full_description.replace('&lt;p&gt;', '')
          console.log('here', this.data)
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
            old_price: product.old_price,
            images: [
              {
                src: 'https://portal.meatthesea.com/product-images/' + this.images,
                attachment: null,
                position: 1
              }
            ]
          }
        }
        this.APIPutRequest(`products/${product.id}`,
        Prod
        , response => {
          $('#loading').css({'display': 'none'})
        })
      }
    }
    // save(id) {
    //   $('#loading').css({'display': 'block'})
    //   this.APIPutRequest(`products/${id.id}`, response => {
    //     $('#loading').css({'display': 'none'})
    //     console.log(response)
        // if(response.products.length > 0) {
        //   this.data = response.products[0]
        //   // this.detail = response.products[0].full_description.replace('&lt;p&gt;', '')
        //   console.log('here', this.data)
        // } else {
        //   this.data = null
        // }
    //   })
    // }
  }
}
</script>

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
  height: 300px;
}
</style>
