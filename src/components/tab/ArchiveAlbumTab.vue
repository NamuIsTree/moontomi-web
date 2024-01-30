<template>
  <v-container class="mb-5">
    <v-text-field
      class="pb-0"
      label="앨범명 검색"
      type="text"
      v-model="params.search"
      v-on:keyup.enter="search"
    ></v-text-field>
    <data-table 
      class="album-data-table" 
      :rows="rows"
      :columns="cols"
      :totalRows="totalRows"
      :isServerMode="true"
      :loading="loading"
      :search="searchText"
      :page="params.currentPage"
      :pageSize="params.pagesize"
      @change="changeServer"
      skin="bh-table-hover"
    >
      <template #album_id="data">
        <strong>#{{ data.value.album_id }}</strong>
      </template>
      <template #image="data">
        <img :src="'https://server.moontomi.com/image/' + data.value.image_id" width='70px' />
      </template>
    </data-table>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import Vue3DataTable from '@bhplugin/vue3-datatable'
import "@bhplugin/vue3-datatable/dist/style.css"
import axios from 'axios';

export default defineComponent({
  name: 'ArchiveAlbumTab',
  data() {
    return {
      cols: [
        { field: 'album_id', title: 'ID', minWidth: '5', maxWidth: '5', isUnique: true },
        { field: 'image', title: '앨범커버' },
        { field: 'title', title: '앨범명', minWidth: '20', maxWidth: '20' },
        { field: 'artist.name', title: '아티스트명', minWidth: '15', maxWidth: '15' },
        { field: 'artist.nation', title: '국가', minWidth: '8', maxWidth: '8' },
        { field: 'release', title: '발매년도', minWidth: '8', maxWidth: '8' }
      ],
      rows: [],
      searchText: '',
      totalRows: 0,
      loading: true,
      params: {
        currentPage: 1,
        pagesize: 10,
        search: ''
      }
    }
  },
  components: {
    'data-table': Vue3DataTable
  },
  mounted() {
    this.getAlbums()
  },
  methods: {
    getAlbums: function() {
      let vue = this
      this.loading = true

      axios.get(this.serverUrl + '/album/list?page=' + vue.params.currentPage + '&limit=' + vue.params.pagesize + '&order=asc&keyword=' + vue.params.search)
        .then(function(res) {
          vue.totalRows = res.data['total_count']
          vue.rows = res.data['items']
        })

      this.loading = false
    },
    search: function() {
      this.searchText = this.params.search
      this.getAlbums()
    },
    changeServer: function(data) {
      this.params.currentPage = data.current_page
      this.params.pagesize = data.pagesize
      
      this.getAlbums()
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