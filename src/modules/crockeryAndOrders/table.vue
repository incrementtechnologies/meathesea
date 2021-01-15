<template>
  <div>
    <table class="table table-striped mt-4 dataTable">
      <thead>
        <tr class="tableHead">
          <th scope="col" class="font-weight-normal" v-for="(el, ndx) in headers" :key="ndx"> {{el.text}} </th>
        </tr>
      </thead>
      <tbody v-if="tableData.length > 0">
        <tr class="noBorder font-weight-bold" v-for="(el, index) in tableData" :key="index + 'data'">
          <td v-for="(h, x) in headers" :key="x"> {{(h.key.toLowerCase() === 'date') ? new Date(el[h.key]).toLocaleDateString().replaceAll("/", "-") : el[h.key]}} </td>
        </tr>
      </tbody>
    </table>
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
.dataTable {
  border: 1px solid #707070;
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
