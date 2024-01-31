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
      :pageSizeOptions="pageSizeOptions"
      @change="changeServer"
      skin="bh-table-hover"
    >
      <template #album_id="data">
        <strong>#{{ data.value.id }}</strong>
      </template>
      <template #image="data">
        <img :src="data.value.image" width='70px' />
      </template>
      <template #title="data">
        <span class="album-title">{{ data.value.title }}</span>
      </template>
      <template #artist="data">
        <span class="album-artist">{{ data.value.artist }}</span>
      </template>
      <template #nation="data">
        <span class="album-nation">{{ data.value.nation }}</span>
      </template>
      <template #action="data">
        <v-btn-group>
          <div hidden>{{ data.id }}</div>
          <v-btn-group>
            <v-tooltip text="데이터 수정">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon="mdi-content-save-edit" location="top" color="success"></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="삭제">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon="mdi-delete" location="top" color="red-darken-4"></v-btn>
              </template>
            </v-tooltip>
          </v-btn-group>
        </v-btn-group>
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
        { field: 'album_id', title: 'ID', isUnique: true },
        { field: 'image', title: '앨범커버' },
        { field: 'title', title: '앨범명' },
        { field: 'artist', title: '아티스트명' },
        { field: 'nation', title: '국가' },
        { field: 'release', title: '발매년도' },
        { field: 'action', title: 'ACTION' }
      ],
      rows: [],
      searchText: '',
      totalRows: 0,
      loading: true,
      params: {
        currentPage: 1,
        pagesize: 10,
        search: ''
      },
      pageSizeOptions: [10, 20, 30],
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
          vue.rows = res.data['items'].map(item => {
            return {
              'id': item.album_id,
              'image': 'https://server.moontomi.com/image/' + item.image_id,
              'title': item.title,
              'artist': item.artist.name,
              'nation': item.artist.nation,
              'release': item.release
            }
          })
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

.album-title {
  display: block !important;
  white-space: nowrap !important;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis !important;
}

.album-artist {
  display: block !important;
  white-space: nowrap !important;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis !important;
}

.album-nation {
  display: block !important;
  white-space: nowrap !important;
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis !important;
}
</style>