<template>
  <v-container fluid class="main justify-center px-0">
    <v-row class="d-flex align-center justify-center">
      <v-text-field
        label="이름으로 한줄평 검색 (Enter)"
        v-model="pattern"
        class="pattern-input pt-10"
        hide-details="auto"
        append-inner-icon="mdi-subdirectory-arrow-left"
        v-on:keyup.enter="addPattern"
      ></v-text-field>
    </v-row>
    <v-row>
      <div
        class="pattern-box pt-5"
      >
        <v-chip
          class="mr-1 my-1"
          variant="outlined"
          color="#242d3c"
          v-for="(ptn, index) in patterns"
          v-bind:key="ptn + ' ' + index"
          closable
          @click:close="remove(index)"
        >
          <strong>{{ ptn }}</strong>
        </v-chip>
      </div>
    </v-row>
    <div class="comment-list pt-7">
      <v-row>
        <v-col class="d-flex align-center justify-center">
          <v-select
            class="sort-option-select d-flex align-center justify-end"
            v-model="sortOption"
            :items="sortOptions"
            density="compact"
            variant="outlined"
            hide-details="auto"
            update:menu="true"
            @update:model-value="sortComments"
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center">
        <v-col class="d-flex align-center justify-center">
          검색 결과는 총 &nbsp;<strong>{{ comments.length }}</strong> &nbsp;개입니다.
        </v-col>
        <v-divider></v-divider>
      </v-row>
      <v-row
        class="pt-2"
        v-for="(comment, index) in comments"
        :key="index"
      >
        <comment-row
          :index="index + 1"
          :comment="comment"
        ></comment-row>
        <v-divider></v-divider>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import CommentRow from '@/components/CommentRow.vue'
import axios from 'axios'

const sortOptions = [
  '음평회 역순',
  '음평회 순',
  '점수 높은순',
  '점수 낮은순',
]

export default {
  data () {
    return {
      pattern: '',
      patterns: [],
      sortOption: sortOptions[2],
      sortOptions: sortOptions,
      comments: []
    }
  },
  components: {
    'comment-row': CommentRow
  },
  methods: {
    addPattern() {
      if (!this.patterns.includes(this.pattern)) {
        this.patterns.push(this.pattern)
      }
      this.search()
      this.pattern = ''
    },
    remove(index) {
      this.patterns.splice(index, 1)
      this.search()
    },
    search() {
      let vue = this

      if (vue.patterns.length === 0) {
        vue.comments = []
        return;
      }
      let data = {
        'patterns': vue.patterns
      }
      axios.post(vue.serverUrl + '/comment/writer/search', data)
        .then((res) => {
          vue.comments = []
          vue.comments.push(...res.data)
          this.sortComments()
        })
    },
    sortComments() {
      if (this.sortOption == sortOptions[0]) {
        this.comments.sort((a, b) => b.lecture_id - a.lecture_id)
      }
      else if (this.sortOption == sortOptions[1]) {
        this.comments.sort((a, b) => a.lecture_id - b.lecture_id)
      }
      else if (this.sortOption == sortOptions[2]) {
        this.comments.sort((a, b) => b.rating - a.rating)
      }
      else if (this.sortOption == sortOptions[3]) {
        this.comments.sort((a, b) => a.rating - b.rating)
      }
    }
  },
}
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
  padding-bottom: 100px;
  width: 80%;
  max-width: 1000px;
}

.sort-option-select {
  max-width: 180px;
  display: block !important;
  white-space: nowrap !important;
  overflow: hidden;
  text-overflow: ellipsis !important;
  text-align: end;
}

.pattern-input {
  width: 80%;
}

.pattern-box {
  width: 100vw;
}

.find-button {
  width: 100%;
  font-size: 0.9em;
}
</style>