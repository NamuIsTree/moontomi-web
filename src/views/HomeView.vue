<template>
  <div class="main">
    <div class="hall-of-fame">
      <h1 id="hall-of-fame-title">명예의 전당</h1>
      <hof-carousel :items="items" />
    </div>
  </div>
</template>

<script>
import AlbumRankCarousel from '@/components/AlbumRankCarousel.vue';

export default {
  name: 'App',
  components: {
    'hof-carousel': AlbumRankCarousel
  },
  data() {
    return {
      items: [
        {
          id: 90,
          image: 'http://localhost:8080/mock/90.jpg',
          title: 'Actor',
          artist: '緑黄色社会',
          rating: 6.7
        },
        {
          id: 91,
          image: 'http://localhost:8080/mock/91.jpg',
          title: 'Dragon New Warm Mountain I Believe in You',
          artist: 'Big Thief',
          rating: 7.3
        },
        {
          id: 92,
          image: 'http://localhost:8080/mock/92.jpg',
          title: 'Beats Within My Soul',
          artist: '바비 킴',
          rating: 9.0
        },
        {
          id: 93,
          image: 'http://localhost:8080/mock/93.jpg',
          title: '행진',
          artist: '들국화',
          rating: 8.2
        },
        {
          id: 94,
          image: 'http://localhost:8080/mock/94.jpg',
          title: '늑대가 나타났다',
          artist: '이랑',
          rating: 8.6
        },
        {
          id: 95,
          image: 'http://localhost:8080/mock/95.jpg',
          title: 'I Am a Bird Now',
          artist: 'Anthony And The Johnsons',
          rating: 6.0
        },
        {
          id: 96,
          image: 'http://localhost:8080/mock/96.jpg',
          title: 'The Anecdote',
          artist: 'E SENS',
          rating: 7.0
        },
        {
          id: 97,
          image: 'http://localhost:8080/mock/97.jpg',
          title: 'Funny Walkin\'',
          artist: '佐藤奈々子',
          rating: 7.8
        },
        {
          id: 98,
          image: 'http://localhost:8080/mock/98.jpg',
          title: '空中キャンプ',
          artist: 'フィッシュマンズ',
          rating: 7.5
        },
        {
          id: 99,
          image: 'http://localhost:8080/mock/99.jpg',
          title: 'Jubilee',
          artist: 'Japanese Breakfast',
          rating: 7.3
        }
      ]
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

.hall-of-fame {
  font-family: 'LINE Seed';
  font-weight: 900;
  text-align: center;
}

#hall-of-fame-title {
  padding-top: 15px;
}


</style>