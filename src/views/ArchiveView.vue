<template>
    <v-container class="main d-flex justify-center">
        <v-container v-bind:class="{'shrink-selected': shrink}" class="selected-archive-wrapper align-center elevation-8" v-if="selected != null" fixed>
            <v-row>
                <v-col class="d-flex justify-start" style="padding-top: 0px !important; padding-bottom: 0px !important;">
                    &nbsp;&nbsp; #{{ selected.id.toString().padStart(3, '0') }}
                </v-col>
                <v-col class="d-flex justify-end" style="padding-top: 0px !important; padding-bottom: 0px !important;">
                    {{ selected.date }} &nbsp;
                </v-col>
            </v-row>
            <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <v-row class="selected-archive pb-2" :key="selected.id">
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
                                <v-col cols="2">
                                    <v-chip class="archive-type-chip" v-if="selected.item.type == 'album'" color="green" variant="outlined" size="small">ALBUM</v-chip>
                                    <v-chip class="archive-type-chip" v-else color="orange" variant="outlined" size="small">SINGLE</v-chip>
                                </v-col>
                                <v-col class="d-flex justify-end" cols="10">
                                    <v-chip
                                        class="selected-archive-genre mx-1"
                                        size="small"
                                        v-for="genre in selected.item.genres"
                                        :key="genre.genre_id"
                                    >
                                        {{ genre.name }} | {{ genre.category }}
                                    </v-chip>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <h1 class="selected-archive-title">{{ selected.item.title }}</h1>
                                    <h3>{{ selected.item.artist }} ({{ selected.item.release }})</h3>
                                </v-col>
                                <v-col class="d-flex justify-end" cols="6">
                                    <v-rating
                                        :model-value="selected.rating"
                                        color="yellow-darken-4"
                                        active-color="yellow-darken-4"
                                        half-increments
                                        readonly
                                        size="50"
                                    ></v-rating>
                                    <br>
                                </v-col>
                            </v-row>
                            <v-row class="pt-2" v-if="selected.item.links">
                                <iframe 
                                    style="border-radius:12px"
                                    :src="selected.item.links.spotify"
                                    width="100%" 
                                    height="156" 
                                    frameBorder="1" 
                                    allowfullscreen="" 
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                    loading="lazy">
                                </iframe>
                            </v-row>
                        </v-container>
                    </v-col>
                </v-row>
            </transition>
            <!-- <v-row class="selected-archive-writer d-flex justify-end">
                    recommended by [ {{ selected.writer }} ] &nbsp;&nbsp;&nbsp;
            </v-row> -->
        </v-container>
        <v-row v-bind:class="{'shrink-select-group': shrink}" class="select-group">
            <v-container>
                <v-row>
                    <v-col cols="3">
                        <v-select density="comfortable" label="정렬 기준"></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-select density="comfortable" label="작성연도"></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-select density="comfortable" label="별점"></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-select density="comfortable" label="장르"></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-row>
        <v-row v-bind:class="{ 'shrink-canvas': shrink }" class="selected-archive-canvas" style="padding-top: 0px !important;">
            <v-col></v-col>
        </v-row>
        <v-row class="justify-center">
            <v-container class="archive-list d-flex justify-left">
                <div
                    class="archive-wrapper"
                    v-for="archive in archives"
                    :key="archive.id"
                >
                    <div
                        class="archive-box mx-2 my-2"
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
            shrink: false,
            initialImage: null,
            selected: null
        }
    },
    mounted() {
        window.addEventListener('scroll', () => {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 50) {
                this.shrink = true;
            } else {
                this.shrink = false;
            }
        });

        this.getArchives();
    },
    methods: {
        getArchives() {
            let vue = this
            
            axios.get(this.serverUrl + '/archive/list?page=1&limit=50&order=asc&min_rating=0&max_rating=1000')
                .then(function(res) {
                    vue.archives = res.data
                    vue.selectArchive(res.data[0])
                })
        },
        selectArchive(item) {
            this.selected = item;
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

@font-face {
    font-family: "Nohemi Bold";
    src: url("../fonts/Nohemi-Bold.ttf") format("truetype");
    font-style: normal;
    font-weight: normal;
}

.main {
    font-family: 'LINE Seed';
    padding-bottom: 100px;
    width: 1064px;
}

.selected-archive-wrapper {
    display: inline-block;
    position: fixed;
    top: 100px;

    width: 1032px;

    font-family: 'Nohemi Bold';
    line-height: 200%;

    color: #fff;
    border-radius: 7px;
    border: none;
    background: linear-gradient(-45deg,  rgba(36, 45, 60, 0.8) 40%, rgba(36, 45, 60, 0.7) 50%,  rgba(36, 45, 60, 0.8) 60%);
    animation: shimmer 6s infinite;
    background-size: 300%;
    background-position-x: 100%;

    z-index: 999;
    transition: 0.3s;
    transition-timing-function: cubic-bezier(0.295, 0.695, 0.290, 1.005);
}

.select-group {
    display: inline-block;
    position: fixed;
    top: 480px;
    width: 1032px;

    z-index: 998;
    transition: 0.3s;
    transition-timing-function: cubic-bezier(0.295, 0.695, 0.290, 1.005);
}

.selected-archive-canvas {
    display: inline-block;
    position: fixed;
    top: 100px;
    width: 1032px;

    background-color: white;

    height: 460px;
    z-index: 500;
    transition: 0.3s;
    transition-timing-function: cubic-bezier(0.295, 0.695, 0.290, 1.005);
}

.shrink-selected {
    top: 60px !important;
}

.shrink-select-group {
    top: 440px;
}

.shrink-canvas {
    top: 60px !important;
}

@keyframes shimmer {
  from {
    background-position-x: 100%;
  }
  to {
    background-position-x: 0%;
  }
}

.selected-archive-writer {
    font-family: 'LINE Seed';
}

.selected-archive-content {
    height: 300px;
}

/* .selected-archive-title {
} */

/* use this one to move from left to right direction */
@keyframes move-left-to-right {
    from {
        transform: translateX(-50%);
    }
    to {
        transform: translateX(0);
    }
}

/* use this one to move from right to left direction */
@keyframes move-right-to-left {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-50%);
    }
}

.selected-archive-genre {
    font-family: 'LINE Seed';
    text-transform: uppercase;
}

.selected-archive-image {
    width: 100%;
    height: 300px;

    background-position: top;
    background-repeat: no-repeat;
    background-size: contain;
}

.archive-list {
    display: inline-flex;
    flex-wrap: wrap;

    padding-top: 450px;
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
    font-family: 'Nohemi Bold';
    border-width: 2px !important;
    background-color: rgba(0, 0, 0, 0.35);
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