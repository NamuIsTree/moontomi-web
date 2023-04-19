<template>
  <div class="main">
    <div v-if="topAlbums.length" class="hall-of-fame">
      <hof-carousel :items="topAlbums" />
      <div class="hof-button d-flex justify-center pt-4 pb-10">
        <v-btn
          class="font-weight-black"
          variant="text"
          :key="reversed"
          @click="toggleHallOfFame"
        >
          <span v-if="reversed">HALL OF SHAME</span>
          <span v-else>HALL OF FAME</span>
        </v-btn>
      </div>
    </div>
    <latest-lecture :album="latestAlbum"/>
    <v-divider inset></v-divider>
    <new-arrivals :items="newArrivals"/>
  </div>
</template>

<script>
import AlbumRankCarousel from '@/components/AlbumRankCarousel.vue';
import LatestLecture from '@/components/LatestLecture.vue';
import NewArrivals from '@/components/NewArrivals.vue';
import axios from 'axios'

export default {
  name: 'App',
  components: {
    'hof-carousel': AlbumRankCarousel,
    'latest-lecture': LatestLecture,
    'new-arrivals': NewArrivals
  },
  mounted() {
    this.getTopAlbums()
  },
  data() {
    return {
      isLoaded: false,
      upperTop: [],
      lowerTop: [],
      topAlbums: [],
      reversed: false,
      latestAlbum: {
        id: 1,
        title: 'Future Nostalgia',
        artist: 'Dua Lipa',
        image: 'https://moontomi.netlify.app/mock/1.jpg'
      },
      newArrivals: [
        {
          id: 1,
          rating: 3.5,
          writer: '문교수',
          date: '2023-01-28',
          title: 'BROWNEYED SOUL',
          artist: '브라운 아이드 소울',
          comment: '브라운 아이드 소울의 홀로서기',
          image: 'https://moontomi.netlify.app/mock/review1.jpg'
        },
        {
          id: 2,
          rating: 2.0,
          writer: '나무트리',
          date: '2023-02-21',
          title: 'NOIR',
          artist: '유노윤호',
          comment: '열정만으로는 해결할 수 없는',
          image: 'https://moontomi.netlify.app/mock/review2.jpg'
        },
        {
          id: 3,
          rating: 4.0,
          writer: '후이자',
          date: '2023-03-01',
          title: 'Fleet Foxes',
          artist: 'Fleet Foxes',
          comment: '100년 전 시골 농가의 삶을 담은',
          image: 'https://moontomi.netlify.app/mock/review3.jpg'
        },
        {
          id: 4,
          rating: 4.0,
          writer: '선유랑',
          date: '2023-04-01',
          title: '2 4 : 2 6',
          artist: '빈지노',
          comment: '될성 부른 나무는 떡잎부터 다르다',
          image: 'https://moontomi.netlify.app/mock/review4.jpg'
        },
        {
          id: 5,
          rating: 3.5,
          writer: '설향박스팜',
          date: '2023-04-04',
          title: '파리의 숨결',
          artist: '살롱 드 오수경',
          comment: '파리의 낭만과 유년의 향수를 담아',
          image: 'https://moontomi.netlify.app/mock/review5.jpg'
        },
        {
          id: 6,
          rating: 3.5,
          writer: '문교수',
          date: '2023-04-06',
          title: 'Sensational',
          artist: 'Erika de Casier',
          comment: 'Erika de Casier의 두 번째',
          image: 'https://moontomi.netlify.app/mock/review6.jpg'
        },
      ]
    }
  },
  methods: {
    toggleHallOfFame() {
      this.reversed = !this.reversed

      if (this.reversed) {
        this.topAlbums = this.lowerTop
      } else {
        this.topAlbums = this.upperTop
      }
    },
    getTopAlbums: function() {
      let vue = this
      axios.get('http://server.moontomi.com/lecture/top')
      .then(function(res) {
        let data = res.data
        vue.upperTop = data['upper_top']
        vue.lowerTop = data['lower_top']

        vue.topAlbums = vue.upperTop
      })
    }
  }
}

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
  padding-bottom: 100px;
  max-width: 1400px;
  overflow-x: hidden;
}

.blank {
  padding: 2.5vw;
}

.hall-of-fame {
  font-weight: 900;
  text-align: left;
}

</style>