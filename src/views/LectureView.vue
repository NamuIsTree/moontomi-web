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
      <v-row>
        <v-col>
          <div v-for="(lecture, index) in lectures" :key="lecture.id">
            <a :href="'/#/lecture/' + lecture.id" style="text-decoration: none;">
              <v-sheet
                v-if="onMobile"
                class="lecture-sheet py-3 mx-auto"
              >
                <v-row class="d-flex align-center justify-center">
                  <v-col cols="2" class="d-flex align-center justify-center">
                    <img
                      width="70"
                      :src="lecture.image"
                    >
                  </v-col>
                  <v-col class="text-center" cols="8">
                    <span class="lecture-title">
                      {{ lecture.title }}
                    </span>
                    <span class="lecture-artist">
                      <br> {{ lecture.artist.name }}
                      <span v-if="lecture.artist.pronounce">
                        ({{ lecture.artist.pronounce }})
                      </span>
                      <span v-else-if="lecture.artist.name_en">
                        ({{ lecture.artist.name_en }})
                      </span>
                    </span>
                  </v-col>
                  <v-col cols="2" class="lecture-rating d-flex align-center justify-center">
                    {{ lecture.rating.toFixed(2) }}
                  </v-col>
                </v-row>
              </v-sheet>
              <v-sheet
                v-else
                class="lecture-sheet py-3 mx-auto"
              >
                <v-row class="d-flex align-center justify-center">
                  <v-col cols="1" class="d-flex align-center justify-center">
                    {{ 
                      selectedSortOption.id === 'id-desc' ? lecture.id : index + 1
                    }}
                  </v-col>
                  <v-col cols="2" class="d-flex align-center justify-center">
                    <img
                      width="100"
                      :src="lecture.image"
                    >
                  </v-col>
                  <v-col cols="7" class="text-center">
                    <span class="lecture-title">
                      {{ lecture.title }}
                    </span>
                    <span class="lecture-artist">
                      <br> {{ lecture.artist.name }}
                      <span v-if="lecture.artist.pronounce">
                        ({{ lecture.artist.pronounce }})
                      </span>
                      <span v-else-if="lecture.artist.name_en">
                        ({{ lecture.artist.name_en }})
                      </span>
                    </span>
                  </v-col>
                  <v-col cols="2" class="lecture-rating d-flex align-center justify-center">
                    {{ lecture.rating.toFixed(2) }}
                  </v-col>
                </v-row>
              </v-sheet>
            </a>
            <v-divider></v-divider>
          </div>
        </v-col>
      </v-row>
      <infinite-loading v-if="!complete" @infinite="getLectures"></infinite-loading>
    </v-container>
  </v-container>
</template>
<script>
import { defineComponent } from 'vue'
import InfiniteLoading from 'v3-infinite-loading'
import axios from 'axios'

const sortOptions = [
  { id: 'id-desc', value: '음평회 내림차순', subValue: '', icon: { main: 'mdi-clock-outline', sub: 'mdi-arrow-down-bold' }},
  { id: 'id-asc', value: '음평회 오름차순', subValue: '', icon: { main: 'mdi-clock-outline', sub: 'mdi-arrow-up-bold' }},
  { id: 'rating-desc', value: '평점 내림차순', subValue: '컴필레이션 제외', icon: { main: 'mdi-star', sub: 'mdi-arrow-down-bold' }},
  { id: 'rating-asc', value: '평점 오름차순', subValue: '컴필레이션 제외', icon: { main: 'mdi-star', sub: 'mdi-arrow-up-bold' }}
]

export default defineComponent({
  name: 'LectureView',
  components: {
    'infinite-loading': InfiniteLoading
  },
  data() {
    return {
      selectedSortOption: sortOptions[0],
      sortOptions: sortOptions,
      complete: false,
      onMobile: false,
      lectures: [],
      page: 1
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    toggleSortOption() {
      this.lectures = []
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
    getLectures() {
      if (this.complete) return

      let vue = this
      let sortOption = vue.selectedSortOption.id.split('-')

      let sortBy = sortOption[0]
      let order = sortOption[1]

      axios.get('https://server.moontomi.com/lecture/list?page=' 
        + vue.page + '&limit=15&sort_by=' + sortBy + '&order=' + order)
        .then((res) => {
          let length = res.data.length
          vue.lectures.push(...res.data)

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

.main {
  font-family: 'LINE Seed';
}

.lecture-title {
  font-weight: 700;
  font-size: min(22px, max(15px, 2vw));
}

.lecture-artist {
  font-size: min(17px, max(14px, 2vw));
}

.lecture-sheet {
  width: 90%;
}

@media (min-width: 768px) {
  .lecture-sheet {
    width: 768px;
  }
}

.lecture-rating {
  font-family: 'Lobster';
  font-size: 22px;
}
</style>