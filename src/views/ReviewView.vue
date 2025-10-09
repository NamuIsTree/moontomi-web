<template>
  <v-container class="main">
    <v-container>
      <v-container class="pt-0">
        <v-row>
          <v-col cols="12" class="d-flex justify-center align-center">
            <div class="selected-option text-center">
              {{ selectedSortOption.value }}
              <br>
              <span v-if="selectedSortOption.subValue" class="text-grey">
                ( {{ selectedSortOption.subValue }} )
              </span>
              <br>
              <v-btn-toggle
                v-model="selectedSortOption"
                variant="outlined"
                divided
                rounded="0"
              >
                <v-btn 
                  v-for="sortOption in sortOptions" 
                  :key="sortOption.id" 
                  :value="sortOption"
                  @click="toggleSortOption"
                >
                  <v-icon :icon="sortOption.icon.main"></v-icon>
                  <v-icon :icon="sortOption.icon.sub"></v-icon>
                </v-btn>
              </v-btn-toggle>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-container 
        class="review-sheet my-5 mx-auto"
        :key="review.id" 
        v-for="review in reviews" 
      >
        <v-row style="margin: -16px; margin: -16px;">
          <v-col class="review-image" :cols="onMobile ? '12' : '4'" :style="{'background-image': `url(${review.image})`}"></v-col>
          <v-col :cols="onMobile ? '12' : '8'">
            <div class="review-date d-flex justify-end">
                {{ review.date }}
              </div>
            <div class="review-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-quote" viewBox="0 3 16 16">
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"/>
              </svg>
              {{ review.title }}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-quote" viewBox="0 3 16 16">
                <g transform="rotate(180 8 8)">
                  <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"/>
                </g>
              </svg>
            </div>
            <v-divider class="mt-2 mb-3"></v-divider>
            <div>
              <div class="review-description">
                {{ review.description }}
              </div>
              <div>
                <div class="review-writer d-flex justify-end">
                  by {{ review.writer }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <infinite-loading v-if="!complete" @infinite="getReviews"></infinite-loading>
    </v-container>
  </v-container>
</template>
<script>
import { defineComponent } from 'vue'
import InfiniteLoading from 'v3-infinite-loading'
// import axios from 'axios'

const sortOptions = [
  { id: 'id-desc', value: '날짜별 내림차순', subValue: '', icon: { main: 'mdi-clock-outline', sub: 'mdi-arrow-down-bold' }},
  { id: 'id-asc', value: '날짜별 오름차순', subValue: '', icon: { main: 'mdi-clock-outline', sub: 'mdi-arrow-up-bold' }},
  { id: 'view-desc', value: '조회수 내림차순', subValue: '', icon: { main: 'mdi-book-play', sub: 'mdi-arrow-down-bold' }},
  { id: 'view-asc', value: '조회수 오름차순', subValue: '', icon: { main: 'mdi-book-play', sub: 'mdi-arrow-up-bold' }}
]

export default defineComponent({
  name: 'ReviewView',
  components: {
    'infinite-loading': InfiniteLoading
  },
  data() {
    return {
      selectedSortOption: sortOptions[0],
      sortOptions: sortOptions,
      complete: false,
      onMobile: false,
      reviews: [],
      page: 1
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    toggleSortOption() {
      this.reviews = []
      this.page = 1
      this.complete = false
    },
    handleResize() {
      if (window.innerWidth < 768) {
        this.onMobile = true;
      } else {
        this.onMobile = false;
      }
    },
    getReviews() {
      if (this.complete) return

      let vue = this
      // let sortOption = vue.selectedSortOption.id.split('-')

      // let sortBy = sortOption[0]
      // let order = sortOption[1]

      // axios.get(this.serverUrl + '/review/list?page=' 
      //   + vue.page + '&limit=15&sort_by=' + sortBy + '&order=' + order)
      //   .then((res) => {
      //     let length = res.data.length
      //     vue.reviews.push(...res.data)

      //     if (length < 10) 
      //       vue.complete = true
      //     else 
      //       vue.page++
      //   })
      vue.complete = true
      vue.reviews.push({
        'id': 1,
        'image': 'https://server.moontomi.com/image/d20cd0d7bbcc4b5499d2ccf5caabd5e9',
        'title': '2025 문교수 연말 결산',
        'description': '2025년에 어떤 음악이 우리의 가슴을 울렸는가?',
        'writer': '문교수',
        'type': '결산',
        'date': '2025-10-08'
      })
      vue.reviews.push({
        'id': 2,
        'image': 'https://server.moontomi.com/image/cdae945d9e9f46cb9a014c33f35efe9f',
        'title': '風街ろまん으로 알아보는 J-ROCK',
        'description': '일본 ROCK의 태동기에 風街ろまん이 끼친 영향력에 대해 알아보자.',
        'writer': '문교수',
        'type': '칼럼',
        'date': '2025-10-08'
      })
      vue.reviews.push({
        'id': 3,
        'image': 'https://server.moontomi.com/image/293a2923967e4f59ae90fd82c0f2617b',
        'title': 'K-POP Demon Hunters 그 정돈가?',
        'description': 'K-POP의 역사를 새로 쓴 데몬 헌터스의 성공을 문교수의 시각으로 바라보자.',
        'writer': '문교수',
        'type': '칼럼',
        'date': '2025-10-08'
      })
      vue.reviews.push({
        'id': 4,
        'image': 'https://server.moontomi.com/image/768217ed2c884e21950861e4fc7f214e',
        'title': '왜 힙합은 안멋진가?',
        'description': '국내 힙합의 흥망성쇠에 대한 소해',
        'writer': '문교수',
        'type': '잡설',
        'date': '2025-10-08'
      })
      vue.reviews.push({
        'id': 5,
        'image': 'https://server.moontomi.com/image/7089fd0e4a9e4f54969b9e118ae946de',
        'title': '조규찬 10선',
        'description': '늘 새로운 규찬이햄이 10년 전에 발매한 신곡을 가져와봤다.',
        'writer': '문교수',
        'type': '잡설',
        'date': '2025-10-08'
      })
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
  font-family: "Lobster";
  src: url("../fonts/Lobster-Regular.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: "Nanum Myeongjo";
  src: url("../fonts/NanumMyeongjoExtraBold.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

.main {
  font-family: 'LINE Seed';
}

.review-title {
  font-family: 'Nanum Myeongjo';
  font-weight: 700;
  font-size: min(22px, max(20px, 2vw));
}

.review-date {
  margin-top: -30px;
  margin-bottom: 10px;
  color: rgba(100, 100, 100, 0.77)
}

.review-description {
  height: 60px;
  font-size: 0.9rem;
}

.review-image {
  width: 100%;
  height: 180px;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  clip-path: polygon(100% 0, 100% 80%, 0% 98%, 0 0%);
  -moz-transition: all .3s;
  -webkit-transition: all .3s;
  transition: all .3s;
}

.review-sheet {
  width: 100%;
  
  border-right: 1px solid;
  border-bottom: 1px solid;
  border-color: #BDC0C4;
  border-bottom-right-radius: 7px;
}

.review-writer {
    font-size: 0.9rem;
  }

@media (min-width: 768px) {
  .review-sheet {
    width: 768px;
  }

  .review-image {
    width: 100%;
    height: 230px;

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
    -moz-transition: all .3s;
    -webkit-transition: all .3s;
    transition: all .3s;
  }

  .review-sheet:hover .review-image {
    clip-path: polygon(0 0, 85% 0, 75% 100%, 0 100%);
    
  }

  .review-description {
    height: 100px;
    font-size: 1rem;
  }

  .review-writer {
    font-size: 1rem;
  }

  .review-date {
    margin-top: -5px;
  }
}

.review-rating {
  font-family: 'Lobster';
  font-size: 22px;
}
</style>