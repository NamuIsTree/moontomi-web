<template>
  <div class="main">
    <v-container>
        <v-tabs
            v-model="tab"
            color="#ff8080"
            centered
        >
            <v-tab value="album" href="#album">Album</v-tab>
            <v-tab value="artist" href="#artist">Artist</v-tab>
            <v-tab value="genre" href="#genre">Genre</v-tab>
        </v-tabs>

        <v-window v-model="tab">
            <v-window-item id="album" value="album">
                <archive-album-tab />
            </v-window-item>
            <v-window-item id="artist" value="artist">
                <archive-artist-tab />
            </v-window-item>
            <v-window-item id="genre" value="genre">
                <archive-genre-tab />
            </v-window-item>
        </v-window>
    </v-container>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import ArchiveAlbumTab from '@/components/tab/ArchiveAlbumTab.vue'
import ArchiveArtistTab from '@/components/tab/ArchiveArtistTab.vue'
import ArchiveGenreTab from '@/components/tab/ArchiveGenreTab.vue'

const indexes = ["album", "artist", "genre"]

export default defineComponent({
    name: 'ArchiveView',
    data: () => ({
        tab: null
    }),
    mounted() {
        this.setTabIndex()
    },
    components: {
        'archive-album-tab': ArchiveAlbumTab,
        'archive-artist-tab': ArchiveArtistTab,
        'archive-genre-tab': ArchiveGenreTab
    },
    methods: {
        setTabIndex: function() {
            // select initial tab with anchor link
            var tabIndex = 'album'

            var hash = window.location.hash
            let anchor = hash.substring(1)

            if (indexes.includes(anchor)) {
                tabIndex = anchor
            }

            this.tab = tabIndex
        }
    }
})
</script>