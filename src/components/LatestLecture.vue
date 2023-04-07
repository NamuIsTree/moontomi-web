
<template>
    <div class="blank" />
    <div class="main justify-content align-center">
        <v-img
            class="background-image"
            :src="album.image"
            cover
        />
        <v-container class="contents" fluid>
            <v-row align-self="center" class="fill-height fill-width">
                <v-col  align-self="center">
                    <div class="text-center">
                        <img
                            class="contents-img"
                            :src="album.image"
                        />
                    </div>
                </v-col>
                <v-col align-self="center">
                    <div class="text-center text-white">
                        <div class="contents-title">
                            금주 음평회
                        </div>
                        <div class="contents-album font-italic">
                            {{ album.title }}
                        </div>
                        <div class="contents-artist font-italic">
                            {{ album.artist }}
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <div class="d-flex justify-center pt-4 pb-10">
      <v-btn
        class="link-button font-weight-black"
        variant="text"
        :href="'/#/lecture/' + album.id"
      >
        GO TO COMMENT >>
      </v-btn>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LatestLecture',
    props: {
        album: {
            type: Object,
            required: true
        }
    }
})
</script>


<style scoped>
@font-face {
  font-family: "LINE Seed";
  src: url("../fonts/LINESeedKR-Rg.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

.main {
    font-family: 'LINE Seed';
    position: relative;
    overflow: hidden;
}

.background-image {
    position: relative;
    height: min(max(30vw, 200px), 500px);

    filter: brightness(80%) blur(0.6vw);
    transform: scale(1.1);
}

.contents {
    position: absolute;
    height: min(max(30vw, 200px), 500px);
    top: min(max(1vw, 14px), 30px);
}

.contents-img {
    height: min(max(20vw, 120px), 300px);
    border: solid 0.5vw;
    border-color: aliceblue;
}

.contents-title {
    font-size: min(max(4vw, 25px), 50px);
}

.contents-album {
  font-size: min(max(3vw, 15px), 40px);
}

.contents-artist {
  font-size: min(max(2.5vw, 13px), 32px);
}

</style>