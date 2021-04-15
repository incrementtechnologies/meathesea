<template>
  <div>
    <div class="column menu" v-if="data">
      <ul>
        <li class="actives" @click="retrieveOne(data[0].id)">{{data[0].name}}</li>
        <li class="list" v-for="(item, i) in data" :key="i" @click="retrieve(item, (i-1))" v-if="i !== 0">{{item.name}}</li>
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
.actives {
  background-color:  #ffe1a6;
}
.activess {
  background-color: #ffff;
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
  mounted(){
  },
  methods: {
    classToggle() {
      if($('.activess')[0]) {
        document.getElementsByClassName('activess')[0].className = 'actives'
        document.getElementsByClassName('activess').className = 'actives'
        let active = document.getElementsByClassName('list')
        for (var i = 0; i < active.length; i++) {
          active[i].className = active[i].className.replace('active', '')
        }
      } else {
        document.getElementsByClassName('actives')[0].className = 'actives'
        let active = document.getElementsByClassName('list')
        for (var j = 0; j < active.length; j++) {
          active[j].className = active[j].className.replace('actives', '')
        }
      }
    },
    setActive(id) {
      this.isEdit = false
      this.bundled = false
      let active = document.getElementsByClassName('list')
      for (var i = 0; i < active.length; i++) {
        active[i].className = active[i].className.replace('active', '')
        console.log('test', active[0])
      }
      active[id].classList.add('active')
    },
    retrieve(item, i) {
      if(item.name === 'Set Meals') {
        this.setActive(i)
        this.$parent.bundled = true
        this.$parent.isEdit = true
        this.$parent.add = true
        if($('.actives')[0]) {
          document.getElementsByClassName('actives')[0].className = 'activess'
        }
        return
      }
      this.$parent.bundled = false
      this.$parent.category = item.id
      if($('.actives')[0]) {
        document.getElementsByClassName('actives')[0].className = 'activess'
      }
      this.setActive(i)
      this.$parent.retrieveProducts(item.id)
      this.$parent.isEdit = false
    },
    retrieveOne(id) {
      this.$parent.category = id
      this.$parent.retrieveProducts(id)
      this.$parent.isEdit = false
      this.classToggle()
    }
  }
}
</script>
