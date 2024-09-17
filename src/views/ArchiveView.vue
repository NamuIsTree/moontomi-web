<template>
    <v-container class="main d-flex justify-center" v-if="selected" >
        <v-container 
            v-bind:class="{'shrink-selected': shrink}" 
            class="selected-archive-wrapper align-center elevation-8" 
            :style="{ 'padding': onMobile ? '16px !important' : '16px' }"
            fixed
        >
            <v-row class="selected-archive-meta">
                <v-col class="d-flex justify-start" style="padding-top: 0px !important; padding-bottom: 0px !important;" :style="{ 'padding-left': onMobile ? '16px !important' : onPad ? '32px !important' : '16px'}">
                    #{{ selected.id.toString().padStart(3, '0') }} 
                    <span :class="{ 'd-none': onMobile }" class="selected-archive-writer pl-2">by [ {{ selected.writer }} ]</span>
                </v-col>
                <v-col class="d-flex justify-end" style="padding-top: 0px !important; padding-bottom: 0px !important;">
                    {{ selected.date }} &nbsp;
                </v-col>
            </v-row>
            <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <v-row class="selected-archive pb-2" :key="selected.id">
                    <v-col class="selected-archive-image-wrapper" :class="{ 'd-none': onPad || onMobile }" cols="auto">
                        <div 
                            class="selected-archive-image"
                            :style="{ 'background-image': 'url(' + selected.item.image + ')' }"
                        >
                        </div>
                    </v-col>
                    <v-col class="justify-center" :style="{ 'padding': onMobile ? '0px !important' : '16px' }">
                        <v-container class="selected-archive-content" :style="{ 'padding-top': onMobile ? '12px' : '0px !important' }">
                            <v-row>
                                <v-col class="d-flex align-center" :cols="(onMobile) ? '6' : '4'">
                                    <v-chip class="archive-type-chip" v-if="selected.item.type == 'album'" color="green" variant="outlined" size="small">ALBUM</v-chip>
                                    <v-chip class="archive-type-chip" v-else color="orange" variant="outlined" size="small">SINGLE</v-chip>
                                    <v-tooltip text="공유 링크 복사">
                                        <template v-slot:activator="{ props }">
                                            <v-icon v-bind="props" class="pl-2" icon="mdi-share-variant-outline" @click="copyLink"></v-icon>
                                        </template>
                                    </v-tooltip>
                                </v-col>
                                <v-col class="d-flex justify-end" v-if="!onMobile" cols="8">
                                    <v-chip
                                        class="selected-archive-genre mx-1"
                                        size="small"
                                        v-for="genre in selected.item.genres"
                                        :key="genre.genre_id"
                                    >
                                        <span v-if="genre.name !== 'Root'">
                                            {{ genre.name }} | {{ genre.category }}
                                        </span>
                                        <span v-else>
                                            {{ genre.category }}
                                        </span>
                                    </v-chip>
                                </v-col>
                                <v-col class="d-flex justify-end" v-else cols="6">
                                    <v-chip
                                        class="selected-archive-genre mx-1"
                                        size="small"
                                        v-if="selected.item.genres != null"
                                    >
                                        {{ selected.item.genres[0].category }}
                                    </v-chip>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col :cols="(onMobile) ? '12' : '8'">
                                    <div class="selected-archive-title">{{ selected.item.title }}</div>
                                    <div class="selected-archive-artist" style="opacity: 0.7;">{{ selected.item.artist }} ({{ selected.item.release }})</div>
                                </v-col>
                                <v-col class="d-flex justify-end" cols="4" :style="{ 'display': onMobile ? 'none !important' : 'block' }">
                                    <v-rating
                                        :model-value="selected.rating"
                                        color="yellow-darken-4"
                                        active-color="yellow-darken-4"
                                        half-increments
                                        readonly
                                        :size="(onPad || onMobile) ? '32' : '41'"
                                    ></v-rating>
                                    <br>
                                </v-col>
                            </v-row>
                            <v-row :style="{ 'display': onMobile ? 'block' : 'none !important', 'padding': '1px !important' }">
                                <v-col :style="{ 'display': onMobile ? 'block' : 'none !important', 'padding': '1px !important' }">
                                    &nbsp; <v-rating
                                        :model-value="selected.rating"
                                        color="yellow-darken-4"
                                        active-color="yellow-darken-4"
                                        half-increments
                                        readonly
                                        :size="(onPad || onMobile) ? '32' : '41'"
                                    ></v-rating>
                                </v-col>
                            </v-row>
                            <v-row class="pt-2" v-if="selected.item.links">
                                <iframe 
                                    style="border-radius:12px"
                                    :src="selected.item.links.spotify"
                                    :width="onMobile ? 330 : '100%'" 
                                    :height="onMobile ? 85 : 156" 
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
        </v-container>
        <v-row v-bind:class="{'shrink-select-group': shrink}" class="select-group">
            <v-container>
                <v-row>
                    <v-col :cols="onPad ? '4' : onMobile ? '6' : '3'">
                        <v-select 
                            density="comfortable"
                            label="정렬 기준"
                            :model-value="sortOption.label"
                            :items="sortOptions"
                            @update:model-value="updateSortOption"
                        ></v-select>
                    </v-col>
                    <v-col :cols="onPad ? '4' : onMobile ? '6' : '3'">
                        <v-select density="comfortable" label="별점" no-data-text="아직 지원하지 않습니다."></v-select>
                    </v-col>
                    <v-col :class="{ 'd-none': onPad || onMobile }" :cols="onPad ? '4' : '3'">
                        <v-select density="comfortable" label="장르" no-data-text="아직 지원하지 않습니다."></v-select>
                    </v-col>
                    <v-col :class="{ 'd-none': onMobile }" :cols="onPad ? '4' : '3'">
                        <v-text-field density="comfortable" label="검색" disabled></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-row>
        <v-row v-bind:class="{ 'shrink-canvas': shrink }" class="selected-archive-canvas" style="padding-top: 0px !important;">
            <v-col></v-col>
        </v-row>
        <v-row class="justify-center" :style="{ 'padding': onMobile ? '0px !important' : '16px' }">
            <v-container class="archive-list d-flex justify-left">
                <div
                    class="archive-wrapper"
                    v-for="archive in archives"
                    :key="archive.id"
                >
                    <div
                        class="archive-box"
                        @click="selectArchive(archive)"
                        :style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + archive.item.image + ')' }"
                    >
                        <div class="archive-type">
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
                                    :size="(onPad || onMobile) ? '24' : '30'"
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
import useClipboard from 'vue-clipboard3'
import axios from 'axios'

const sortOptions = [
    { title: '최신순', value: { label: '최신순', code: 'desc'} },
    { title: '작성순', value: { label: '작성순', code: 'asc'} }
]

const { toClipboard } = useClipboard()

export default defineComponent({
    name: 'ArchiveView',
    data() {
        return {
            archives: [],
            shrink: false,
            sortOption: sortOptions[0].value,
            sortOptions: sortOptions,
            initialImage: null,
            onPad: false,
            onMobile: false,
            selected: null
        }
    },
    mounted() {
        this.handleResize()
        window.addEventListener('resize', this.handleResize)

        window.addEventListener('scroll', () => {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 50) {
                this.shrink = true;
            } else {
                this.shrink = false;
            }
        });

        let vue = this
        let archive_id = vue.$route.params.id
        
        if (archive_id) {
            axios.get(vue.serverUrl + '/archive/' + archive_id)
                .then(function(res) {
                    vue.selected = res.data
                })

            this.getArchives(false);
        } else {
            this.getArchives(true);
        }
    },
    methods: {
        getArchives(updateSelectedArchive) {
            let vue = this
            let path = '/archive/list?page=1&limit=50&order=' + vue.sortOption.code + '&min_rating=0&max_rating=1000'
            
            axios.get(vue.serverUrl + path)
                .then(function(res) {
                    vue.archives = res.data
                    if (updateSelectedArchive) {
                        vue.selectArchive(res.data[0])
                    }
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
        },
        async copyLink() {
            let vue = this;
            await toClipboard('https://moontomi.com/archive/' + vue.selected.id)
            alert('공유 링크가 복사되었습니다.')
        },
        updateSortOption(v) {
            this.sortOption = v;
            this.getArchives(false);
        },
        handleResize() {
            this.onMobile = (window.innerWidth < 768)
            this.onPad = (window.innerWidth >= 768 && window.innerWidth < 1280)
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

@media screen and (max-width: 768px) {
        
    .main {
        font-family: 'LINE Seed';
        padding-bottom: 100px;
        width: 340px;
    }

    .selected-archive-wrapper {
        display: inline-block;
        position: fixed;
        top: 100px;

        width: 340px;
        height: 278px;

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
    
    .selected-archive-meta {
        opacity: 0.7;
    }

    .selected-archive-writer {
        font-family: 'LINE Seed';
    }

    .select-group {
        display: inline-block;
        position: fixed;
        top: 390px;
        width: 340px;

        z-index: 998;
        transition: 0.3s;
        transition-timing-function: cubic-bezier(0.295, 0.695, 0.290, 1.005);
    }

    .selected-archive-canvas {
        display: inline-block;
        position: fixed;
        top: 100px;
        width: 340px;

        background-color: white;

        height: 370px;
        z-index: 500;
        transition: 0.3s;
        transition-timing-function: cubic-bezier(0.295, 0.695, 0.290, 1.005);
    }

    .shrink-selected {
        top: 60px !important;
    }

    .shrink-select-group {
        top: 350px;
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

    .selected-archive-content {
        height: 300px;
    }

    .selected-archive-title {
        font-size: 1.5rem;
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

        padding-top: 360px;
        padding-left: 0px !important;
        padding-right: 0px !important;
    }

    .archive-box {
        display: flex;
        flex-direction: column;

        width: 158px;
        height: 158px;

        background-position: center;
        background-repeat: no-repeat;
        background-size: 160px;

        margin: 4px;

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
        background-size: 180px;
    }

    .archive-type {
        margin: 4px;
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
        font-size: 0.9rem;
        color: white;
    }

    .archive-artist {
        font-size: 0.8rem;
        color: rgb(230, 230, 230);
    }
}

@media screen and (min-width: 768px) and (max-width: 1280px) {
        
    .main {
        font-family: 'LINE Seed';
        padding-bottom: 100px;
        width: 640px;
    }

    .selected-archive-wrapper {
        display: inline-block;
        position: fixed;
        top: 100px;

        width: 640px;
        height: 327px;

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
    
    .selected-archive-meta {
        opacity: 0.7;
    }

    .selected-archive-writer {
        font-family: 'LINE Seed';
    }

    .select-group {
        display: inline-block;
        position: fixed;
        top: 440px;
        width: 640px;

        z-index: 998;
        transition: 0.3s;
        transition-timing-function: cubic-bezier(0.295, 0.695, 0.290, 1.005);
    }

    .selected-archive-canvas {
        display: inline-block;
        position: fixed;
        top: 100px;
        width: 640px;

        background-color: white;

        height: 400px;
        z-index: 500;
        transition: 0.3s;
        transition-timing-function: cubic-bezier(0.295, 0.695, 0.290, 1.005);
    }

    .shrink-selected {
        top: 60px !important;
    }

    .shrink-select-group {
        top: 400px;
    }

    .shrink-canvas {
        top: 60px !important;
        height: 420px;
    }

    @keyframes shimmer {
    from {
        background-position-x: 100%;
    }
    to {
        background-position-x: 0%;
    }
    }

    .selected-archive-content {
        height: 300px;
    }

    .selected-archive-title {
        font-size: 1.7rem;
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

        width: 640px;
        padding-top: 390px;
    }

    .archive-box {
        display: flex;
        flex-direction: column;

        width: 192px;
        height: 192px;

        background-position: center;
        background-repeat: no-repeat;
        background-size: 200px;

        margin: 5px;

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

    .archive-type {
        margin: 8px;
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
        font-size: 0.9rem;
        color: white;
    }

    .archive-artist {
        font-size: 0.8rem;
        color: rgb(230, 230, 230);
    }
}

@media screen and (min-width: 1280px) {
        
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
        height: 327px;

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

    .selected-archive-meta {
        opacity: 0.7;
    }

    .selected-archive-writer {
        font-family: 'LINE Seed';
    }

    .select-group {
        display: inline-block;
        position: fixed;
        top: 440px;
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

        height: 400px;
        z-index: 500;
        transition: 0.3s;
        transition-timing-function: cubic-bezier(0.295, 0.695, 0.290, 1.005);
    }

    .shrink-selected {
        top: 60px !important;
    }

    .shrink-select-group {
        top: 400px;
    }

    .shrink-canvas {
        top: 80px !important;
    }

    @keyframes shimmer {
    from {
        background-position-x: 100%;
    }
    to {
        background-position-x: 0%;
    }
    }

    .selected-archive-content {
        height: 300px;
    }

    .selected-archive-title {
        font-size: 1.7rem;
    }

    .selected-archive-genre {
        font-family: 'LINE Seed';
        text-transform: uppercase;
    }

    .selected-archive-image {
        width: 272px;
        height: 272px;

        background-position: top;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .archive-list {
        display: inline-flex;
        flex-wrap: wrap;
        width: 1063px;

        padding-top: 390px;
    }

    .archive-box {
        display: flex;
        flex-direction: column;

        width: 241px;
        height: 241px;

        background-position: center;
        background-repeat: no-repeat;
        background-size: 240px;

        cursor: pointer;
        overflow: hidden;

        margin: 8px;
        
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

    .archive-type {
        margin: 8px;
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
}

</style>