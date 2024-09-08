<template>
    <v-container class="main">
        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <v-row class="selected-archive pb-2" :key="selected.id" v-if="selected != null">
                <v-col cols="4">
                    <div 
                        class="selected-archive-image"
                        :style="{ 'background-image': 'url(' + selected.item.image + ')' }"
                    >
                    </div>
                </v-col>
                <v-col class="justify-center" cols="8">
                    <v-container class="selected-archive-content">
                        <v-row>
                            <h1>{{ selected.item.title }}</h1>
                        </v-row>
                        <v-row>
                            <h3>{{ selected.item.artist }}</h3>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </transition>
        <v-divider class="my-1"></v-divider>
        <v-row>
            <v-container class="archive-list d-flex justify-left">
                <div
                    class="archive-wrapper"
                    v-for="archive in archives"
                    :key="archive.id"
                >
                    <div
                        class="archive-box mx-1 my-1"
                        @click="selectArchive(archive)"
                        :style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + archive.item.image + ')' }"
                    >
                        <div class="archive-type px-2 py-2">
                            <v-chip class="archive-type-chip" v-if="archive.item.type == 'album'" color="green" variant="outlined" size="small">ALBUM</v-chip>
                            <v-chip class="archive-type-chip" v-else color="orange" variant="outlined" size="small">SINGLE</v-chip>
                        </div>
                        <div class="archive-content mx-2">
                            <div class="archive-title">
                                {{ archive.item.title }}
                            </div>
                            <div class="archive-artist">
                                {{ archive.item.artist }}
                            </div>
                            <div class="archive-rating">
                                <v-rating
                                    :model-value="archive.rating"
                                    color="yellow-darken-4"
                                    active-color="yellow-darken-4"
                                    half-increments
                                    readonly
                                    size="30"
                                ></v-rating>
                            </div>
                        </div>
                    </div>
                </div>
            </v-container>
        </v-row>
    </v-container>
</template>
<script>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
    name: 'ArchiveView',
    data() {
        return {
            archives: [],
            initialImage: null,
            selected: null
        }
    },
    mounted() {
        this.getArchives();
    },
    methods: {
        getArchives() {
            let vue = this
            
            axios.get(this.serverUrl + '/archive/list?page=1&limit=10&order=asc&min_rating=0&max_rating=10')
                .then(function(res) {
                    vue.archives = res.data
                    vue.selectArchive(res.data[0])
                })
        },
        selectArchive(item) {
            this.selected = item;
            console.log(item)
        },
        changeImage(newSrc) {
            this.imageSrc = newSrc;
        },
        beforeEnter(el) {
            el.style.opacity = 0;
        },
        enter(el, done) {
            el.offsetHeight; // trigger reflow
            el.style.transition = 'opacity 1s';
            el.style.opacity = 1;
            done();
        },
        leave(el, done) {
            el.style.transition = 'opacity 1s';
            el.style.opacity = 0;
        done();
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

@font-face {
    font-family: "Nohemi";
    src: url("../fonts/Nohemi-Medium.ttf") format("truetype");
    font-style: normal;
    font-weight: normal;
}

.main {
  font-family: 'LINE Seed';
  padding-bottom: 100px;
  width: 1064px;
  overflow-x: hidden;
}

.selected-archive {
    font-family: 'Nohemi'
}

/* .selected-archive-content {
    font-style: italic;
} */

.selected-archive-image {
    width: 100%;
    height: 300px;

    background-position: top;
    background-repeat: no-repeat;
    background-size: contain;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}

.archive-list {
    display: inline-flex;
    flex-wrap: wrap;
}

.archive-box {
    display: flex;
    flex-direction: column;

    width: 240px;
    height: 240px;

    background-position: center;
    background-repeat: no-repeat;
    background-size: 240px;

    cursor: pointer;
    overflow: hidden;
    
    -webkit-transition: background-size .5s ease-in-out;
    -moz-transition: background-size .5s ease-in-out;
    -ms-transition: background-size .5s ease-in-out;
    -o-transition: background-size .5s ease-in-out;
    transition: background-size .5s ease-in-out;
}

.archive-box:hover {
    opacity: 90%;
    background-size: 250px;
}

.archive-type-chip {
    border-width: 1.5px !important;
    font-weight: 900 !important;
}

.archive-content {
    margin-top: auto;
}

.archive-title {
    font-size: 1.2rem;
    color: white;
}

.archive-artist {
    font-size: 0.9rem;
    color: rgb(230, 230, 230);
}

</style>