<template>
  <div>
    <!-- <center><H3> Analytics Page </H3></center> -->
    <div class="header">
      <div class="row">
        <div class="col" style="margin-top:50px">
          <a href class="mediumFont" id="header">Overview</a>
        </div>
        <div class="col"  style="margin-top:50px">
          <h6 class="smallFont">Range:</h6>
        </div>
        <div class="col" style="margin-top:40px">
          <div class="dropdown"  style="margin-left:-95% !important;">
            <button class="btn  dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="header"> 
              Last week
            </button>
            <ul class="dropdown-menu">
              <li><a href="#">Choice1</a></li>
              <li><a href="#">Choice2</a></li>
              <li><a href="#">Choice3</a></li>
            </ul>
          </div>
        </div>
        <div class="col" style="margin-top:50px;">
          <a href class="mediumFont" id="header">Send report</a>
        </div>
      </div>
    </div>
    <hr style="margin-right:17.5%" id="line">
    <div style="margin-right:20%;margin-top:5%">
      <div class="row">
        <div class="col">
          <div class="card sample">
            <div class="card-body _card ml-3">
              <div class="icon"> 
                <i class="fas fa-sort-amount-up fa-2x"  id="icon"></i>
              </div>   
              <div class="ml-3">
                <div class="d-flex justify-content-start">
                  <h4 class="largeFont">Sales revenue: HK$ XXXXXX</h4>
                </div>
                <div class="d-flex justify-content-start mt-2">
                  <h6 class="smallFont">10% up from last week</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card sample">
            <div class="card-body _card ml-3">
              <div class="icon"> 
                <i class="fas fa-sort-amount-down fa-2x"></i>
              </div>   
              <div class="ml-3">
                <div class="d-flex justify-content-start">
                  <h4 class="largeFont">Served customers: xx</h4>
                </div>
                <div class="d-flex justify-content-start mt-2">
                  <h6 class="smallFont">10% up from last week</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:4%">
        <div class="col">
          <div class="card sample">
            <div class="card-body _card ml-3">
              <div class="icon"> 
                <i class="fas fa-sort-amount-up fa-2x"></i>
              </div>   
              <div class="ml-3">
                <div class="d-flex justify-content-start">
                  <h4 class="largeFont">Total orders: XX</h4>
                </div>
                <div class="d-flex justify-content-start mt-2">
                  <h6 class="smallFont">10% up from last week</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card sample">
            <div class="card-body _card ml-3">
              <div class="icon"> 
                <i class="fas fa-sort-amount-down fa-2x"></i>
              </div>   
              <div class="ml-3">
                <div class="d-flex justify-content-start">
                  <h4 class="largeFont">New ratings: XX</h4>
                </div>
                <div class="d-flex justify-content-start mt-2">
                  <h6 class="smallFont">10% up from last week</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:4%">
        <div class="col">
          <div class="card sample">
            <div class="card-body ml-3">
              <h5 class="mediumFont">Most popular items</h5>
              <h6 class="smallFont">Product name</h6>
              <h6 class="smallFont">Product name</h6>
              <h6 class="smallFont">Product name</h6>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card sample">
            <div class="card-body ml-3">
              <h5 class="mediumFont">Average delivery items</h5>
              <h6 class="smallFont">During regular hours: XX mins</h6>
              <h6 class="smallFont">During rush hours: XX mins</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:4%">
        <div class="col">
          <div class="card sample">
            <div class="card-body ml-3">
              <h5 class="mediumFont">12 crockery returned</h5>
              <h6 class="smallFont">87% opted for collection after 2 hours</h6>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card sample">
            <div class="card-body ml-3">
              <h5 class="mediumFont">2 crockery outstanding</h5>
              <h6 class="smallFont">1 unsuccessful collection</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BootstrapVueIcons } from 'bootstrap-vue'
export default {
  data() {
    return {
    }
  }
}
</script>
<style scoped>
.header {
  margin-right: 0px;
}
.card {
  width: 100%;
  height: 130px;
}
.sample{
 -webkit-box-shadow: 0px 0px 19px -5px rgba(0,0,0,0.3); 
  box-shadow: 0px 0px 19px -5px rgba(0,0,0,0.3);
}
.largeFont {
  color: #0064b1;
  font-weight: bold;
}
.mediumFont {
  color: #0064b1;
  font-weight: bold;
}
.smallFont {
  color:gray;
}
.icon {
  color: #0064b1;
  background-color: lightgreen;
  width: 11%;
  height: 52%;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
._card {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.iconSize {
  size: 40px;
}
@media only screen and (max-width: 1700px) {
  .icon {
    width: 14% !important;
  }
  .largeFont {
    font-size: 10px;
  }
  .smallFont {
    font-size: 10px;
  }
  #header {
    font-size: 12px;
  }
}
@media only screen and (max-width: 1500px) {
  .icon {
    width: 16% !important;
  }
  .largeFont {
    font-size: 10px;
  }
  .smallFont {
    font-size: 10px;
  }
  .header {
    font-size: 10px;
  }
  .line {
    width: 100%;
  }
}
@media only screen and (max-width: 1200px) {
  .icon {
    width: 23% !important;
  }
    .largeFont {
    font-size: 10px;
  }
  .smallFont {
    font-size: 10px;
  }
  .header {
    font-size: 10px;
  }
  .line {
    width: 100%;
  }
}
@media only screen and (max-width: 1000px) {
  .icon {
    width: 18% !important;
  }
  .largeFont {
    font-size: 10px;
  }
  .smallFont {
    font-size: 10px;
  }
  .header {
    font-size: 10px;
  }
  .line {
    width: 100%;
  }
}
@media only screen and (max-width: 800px) {
  .icon {
    width: 25% !important;
  }
  .header {
    font-size: 10px;
  }
  .line {
    width: 100%;
  }
}
@media only screen and (max-width: 500px) {
  .icon {
    width: 20% !important;
  }
  .header {
    font-size: 10px;
  }
  .line {
    width: 100%;
  }
}
@media only screen and (max-width: 360px) {
  .icon {
    width: 30% !important;
  }
  .header {
    font-size: 10px;
  }
  .line {
    width: 100%;
  }
}
</style>
