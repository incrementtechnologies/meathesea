<template>
  <div>
    <div class="container2" v-for="(item, i) in 6" :key="i">
      <div class="row">
        <div class="column">
          <i class="fas fa-edit" style="font-size: 2em; margin-left: 20px; margin-right: 20px;" @click="update()"></i>
        </div>
        <div class="column">
          <img :src="require('assets/img/sample.png')" alt="Girl in a jacket" width="70" height="30">
        </div>
        <div class="column">
          <p class="name">Product name</p>
        </div>
        <div class="column available">
          <div class="right">
            <h5 class="a">AVAILABLE: </h5>
            <label class="switch">
              <input type="checkbox" :checked="false">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
* {
  box-sizing: border-box;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
.available {
  flex-grow: 1;
}
.right{
  float: right;
  margin-right: 25px;
}
.slider:before {
  position: absolute;
  font-family: "FontAwesome";
  content: "\f058";
  display: inline-block;
  font-size: 30px;
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  color: green;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.column {
  float: left;
}
.content {
  width: 70%;
}
.active {
  background-color:  #ffe1a6;
}
.a {
  display: inline;
	float: left;
  margin-right: 10px;
}
.name{
	margin-left: 20px;
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
.container2{
  width: 80%;
  border: 1px solid #c9c9c9;
  padding: 20px 10px 10px 10px;
	height: 70px;
}
</style>
<script>
export default {
  data(){
    return {
    }
  },
  methods: {
    update() {
      this.$parent.isEdit = true
    }
  }
}
</script>
