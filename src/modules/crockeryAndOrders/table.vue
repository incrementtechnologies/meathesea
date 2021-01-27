<template>
  <div>
    <table class="table table-striped dataTable" v-if="headers.length && tableData.length > 0">
      <thead>
        <tr class="tableHead">
          <th scope="col" class="font-weight-normal" v-for="(el, ndx) in headers" :key="ndx"> {{el.text}} </th>
        </tr>
      </thead>
      <tbody v-if="tableData.length > 0">
        <tr class="noBorder font-weight-bold" v-for="(el, index) in tableData" :key="index + 'data'">
          <td 
            v-for="(h, x) in headers" 
            :key="x"
          > 
            {{
              (el[h.key] === null || el[h.key] === "" || el[h.key] === undefined) ? '---' :
              (h.key.toLowerCase() === 'created_on_utc') ? new Date(el[h.key]).toLocaleDateString().replaceAll("/", "-") : el[h.key]
            }} 
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="notFoundContainer">
      <div class="notFound text-center">
        <img :src="require('src/assets/img/logo_white.png')" style="width: 20%; height: auto;"/>
        <div class="mt-2">
          <b class="font-weight-normal"> 404 | No data yet.</b>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['tableData', 'headers'],
  data() {
    return {}
  },
  watch: {
    headers: function(_new, old) {
      return this.headers
    },
    tableData: function(_new, old) {
      return this.tableData
    }
  },
  mounted() {}
}
</script>
<style scoped>
.notFoundContainer {
  min-height: 80vh;
}
.notFound {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  display: inline-block;
}
.dataTable {
  border-top: 1px solid #707070;
  border-bottom: 1px solid #707070;
  border-left: 1px solid #707070;
  border-right: 1px solid #707070;
  color: #4D4E4F;
}
.noBorder td{
  border: none !important;
}
.tableHead th{
  border-top: 1px solid #707070 !important;
  border-bottom: 1px solid #707070 !important;
}
</style>
