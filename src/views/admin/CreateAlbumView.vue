<template>
    <div class="main">
        <v-container class="album-create-main">
            <v-row>
                앨범을 등록합니다.
            </v-row>
            <v-row>
                <input type="file" id="upload-cover" hidden />
                <label for="upload-cover">
                    <img 
                        :class="{ 'on-hover': isHovering }"
                        src="/default/default_image.svg" width="150"/>
                </label>
            </v-row>
        </v-container>
    </div>
</template>

<script scoped>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CreateAlbumView',
    data() {
        return {
            album: {
                title: '',
                artist_id: null,
                image_id: null,
                tracks: [],
                release: ''
            }
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

.album-create-main {
    font-family: 'LINE Seed';
}
</style>