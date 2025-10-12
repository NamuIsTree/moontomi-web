<template>
  <v-container class="main">
    <v-container>
      <v-container class="pt-0">
        <v-row>
          <v-col cols="12" class="d-flex justify-center align-center">
            <div class="selected-option text-center">
              {{ selectedSortOption.value }}
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
        class="review-sheet mt-5 mb-8 mx-auto"
        :key="review.id" 
        v-for="review in reviews" 
      >
      <a :href="'/review/' + review.id">
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
            <v-divider class="mt-2 mb-3" color="#EAEAEA"></v-divider>
            <div>
              <div class="review-description">
                {{ review.description }}
              </div>
              <div>
                <v-row>
                  <v-col>
                    <div class="review-view">
                     <v-icon icon="mdi-eye" size="small" style="margin-top: -2px; margin-right: 5px; color: #808080;"></v-icon>
                     <span style="color: #808080">조회수 </span>
                     <span>{{ review.views }}</span>
                    </div>
                  </v-col>
                  <v-col>
                    <div class="review-writer d-flex justify-end">
                      by {{ review.writer }}
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </a>
      </v-container>
      <infinite-loading v-if="!complete && !toggled" class="loading-bar" @infinite="getReviews"></infinite-loading>
    </v-container>
  </v-container>
</template>
<script>
import axios from "axios";
import { defineComponent } from 'vue'
import InfiniteLoading from 'v3-infinite-loading'

const sortOptions = [
  { id: 'id-desc', value: '최신순', icon: { main: 'mdi-clock-outline', sub: 'mdi-arrow-down-bold' }},
  { id: 'id-asc', value: '오래된 순', icon: { main: 'mdi-clock-outline', sub: 'mdi-arrow-up-bold' }},
  { id: 'view-desc', value: '조회수 높은순', icon: { main: 'mdi-book-play', sub: 'mdi-arrow-down-bold' }},
  { id: 'view-asc', value: '조회수 낮은순', icon: { main: 'mdi-book-play', sub: 'mdi-arrow-up-bold' }}
]

export default defineComponent({
  name: 'ReviewView',
  components: {
    'infinite-loading': InfiniteLoading
  },
  data() {
    return {
      selectedSortOption: sortOptions[0],
      prevSortOption: sortOptions[0],
      sortOptions: sortOptions,
      complete: false,
      onMobile: false,
      toggled: false,
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
      let vue = this
      if (vue.prevSortOption.id !== vue.selectedSortOption.id) {
        vue.reviews = []
        vue.page = 1
        vue.prevSortOption = vue.selectedSortOption
        vue.toggled = true
        vue.complete = false
        vue.getReviews()
          .then(() => { vue.toggled = false })
      }
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
      let sortOption = vue.selectedSortOption.id.split('-')

      let sortBy = sortOption[0]
      let order = sortOption[1]

      axios.get(this.serverUrl + '/review/list?page=' 
        + vue.page + '&limit=15&sort_by=' + sortBy + '&order=' + order)
        .then((res) => {
          let length = res.data.length
          vue.reviews.push(...res.data.items)

          if (length < 10) 
            vue.complete = true
          else 
            vue.page++
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
  padding-bottom: 100px;
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
  border-bottom-left-radius: 7px;
  border-top-right-radius: 7px;
}


.review-sheet a {
  text-decoration: none;
  color: black;
}

.review-title {
  padding-top: 20px;
}

.review-view {
  font-size: 0.9rem;
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

    clip-path: polygon(0 0, 95% 0, 90% 100%, 0 100%);
    -moz-transition: all .3s;
    -webkit-transition: all .3s;
    transition: all .3s;
  }

  .review-sheet:hover .review-image {
    clip-path: polygon(0 0, 85% 0, 75% 100%, 0 100%);
    
  }

  .review-title {
    padding-top: 0px;
  }

  .review-description {
    height: 120px;
    font-size: 1rem;
  }

  .review-view {
    font-size: 1rem;
  }

  .review-writer {
    font-size: 1rem;
  }

  .review-date {
    margin-top: -5px;
  }
}
</style>