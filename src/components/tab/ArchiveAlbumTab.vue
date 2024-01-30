<template>
  <data-table class="album-data-table" :rows="data" striped>
      <template #empty>
        <data-table-body-cell colspan="2">
          No record found.
        </data-table-body-cell>
      </template>
  </data-table>
</template>

<script>
/**
 * TODO: https://vue3-datatable-document.vercel.app/
 */

import { defineComponent } from 'vue';
import { DataTable, TableBodyCell } from '@jobinsjp/vue3-datatable'
import "@jobinsjp/vue3-datatable/dist/style.css"
import axios from 'axios';

export default defineComponent({
  name: 'ArchiveAlbumTab',
  data() {
    return {
      data: []
    }
  },
  components: {
    'data-table': DataTable,
    'data-table-body-cell': TableBodyCell
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData: function() {
      let vue = this
      axios.get(this.serverUrl + '/album/list?page=1&limit=15&order=asc')
        .then(function(res) {
          vue.data = res.data.map(element => {
            return {
              'id': element.album_id,
              'image': element.image_id,
              'title': element.title,
              'artist': element.artist.name,
              'nation': element.artist.nation,
              'release': element.release
            }
          });
        })
    }
  }
})
</script>

<style scoped>
@font-face {
  font-family: "LINE Seed";
  src: url("../../fonts/LINESeedKR-Rg.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

.album-data-table {
  font-family: 'LINE Seed';
}
</style>