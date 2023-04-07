<template>
  <div class="main">
    <div class="hall-of-fame">
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

export default {
  name: 'App',
  components: {
    'hof-carousel': AlbumRankCarousel,
    'latest-lecture': LatestLecture,
    'new-arrivals': NewArrivals
  },
  data() {
    return {
      topAlbums: [
        {
          id: 90,
          image: 'https://moontomi.netlify.app/mock/90.jpg',
          title: 'Actor',
          artist: '緑黄色社会',
          rating: 6.7
        },
        {
          id: 91,
          image: 'https://moontomi.netlify.app/mock/91.jpg',
          title: 'Dragon New Warm Mountain I Believe in You',
          artist: 'Big Thief',
          rating: 7.3
        },
        {
          id: 92,
          image: 'https://moontomi.netlify.app/mock/92.jpg',
          title: 'Beats Within My Soul',
          artist: '바비 킴',
          rating: 9.0
        },
        {
          id: 93,
          image: 'https://moontomi.netlify.app/mock/93.jpg',
          title: '행진',
          artist: '들국화',
          rating: 8.2
        },
        {
          id: 94,
          image: 'https://moontomi.netlify.app/mock/94.jpg',
          title: '늑대가 나타났다',
          artist: '이랑',
          rating: 8.6
        },
        {
          id: 95,
          image: 'https://moontomi.netlify.app/mock/95.jpg',
          title: 'I Am a Bird Now',
          artist: 'Anthony And The Johnsons',
          rating: 6.0
        },
        {
          id: 96,
          image: 'https://moontomi.netlify.app/mock/96.jpg',
          title: 'The Anecdote',
          artist: 'E SENS',
          rating: 7.0
        },
        {
          id: 97,
          image: 'https://moontomi.netlify.app/mock/97.jpg',
          title: 'Funny Walkin\'',
          artist: '佐藤奈々子',
          rating: 7.8
        },
        {
          id: 98,
          image: 'https://moontomi.netlify.app/mock/98.jpg',
          title: '空中キャンプ',
          artist: 'フィッシュマンズ',
          rating: 7.5
        },
        {
          id: 99,
          image: 'https://moontomi.netlify.app/mock/99.jpg',
          title: 'Jubilee',
          artist: 'Japanese Breakfast',
          rating: 7.3
        }
      ],
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
      this.topAlbums.reverse()
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