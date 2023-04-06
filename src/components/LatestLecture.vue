
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
                        <div class="contents-album">
                            {{ album.title }}
                        </div>
                        <div class="contents-artist">
                            {{ album.artist }}
                        </div>
                        <v-btn 
                            class="contents-btn" 
                            rounded="xl" 
                            variant="outlined"
                        >
                            평가하기
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
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

.blank {
    padding: 30px;
}

.main {
    font-family: 'LINE Seed';
    position: relative;
    overflow: hidden;
}

.background-image {
    position: relative;
    height: min(max(30vw, 200px), 500px);

    filter: brightness(80%) blur(10px);
    transform: scale(1.1);
}

.contents {
    position: absolute;
    height: min(max(30vw, 200px), 500px);
    top: min(max(1vw, 13px), 30px);
}

.contents-img {
    height: min(max(20vw, 120px), 300px);
    border: solid 0.5vw;
    border-color: aliceblue;
}

.contents-title {
    font-size: min(4vw, 50px);
}

.contents-album {
    font-size: min(2vw, 25px);
}

.contents-artist {
    font-size: min(2vw, 25px);
}

.contents-btn {
    font-weight: 700;
    font-size: min(1.8vw, 18px);
    margin-top: 1vw;
    border-width: 2px;
}

</style>