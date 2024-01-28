<template>
  <v-container class="main">
    <v-container v-if="lecture != null" class="text-center" fill-height fluid>
      <v-row>
        <v-col cols="12">
          <h4>{{ lecture.id }} 회</h4>
          <h4 v-if="lecture.date" style="color: #808080">{{ lecture.date }}</h4>
          <h1 class="font-italic">{{ lecture.title }}</h1>
          <h3 class="font-italic">{{ lecture.artist }} ({{ lecture.release }})</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-chip
            label
          >
            <v-icon start icon="mdi-label"></v-icon>
            &nbsp; {{ lecture.season.name }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-chip-group
            class="justify-center"
          >
            <v-chip
              v-for="genre in lecture.genres"
              :key="genre.category + '::' + genre.name"
              variant="outlined"
              size="small"
            >
              <span class="pr-2">{{ genre.name.toUpperCase() }}</span>
              <v-divider color="black" vertical></v-divider>
              <span class="pl-2">{{ genre.category }}</span>
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-row
        align-center 
        class="text-center"
      >
        <v-col class="d-flex flex-row align-center justify-end pr-1">
          <img
            class="lecture-image"
            :src="lecture.image"
          />
        </v-col>

        <v-col class="d-flex flex-row align-center justify-start pl-1">
          <v-card
            class="lecture-rating d-flex flex-column"
            variant="outlined"
          >
            <div class="d-flex align-center flex-column my-auto">
              <div v-if="lecture.rating">
                <div
                  class="lecture-rating-point"
                  @mouseover="ratingHover = true"
                  @mouseleave="ratingHover = false"
                >
                  <span v-if="ratingHover" class="rating-detail-point">
                    {{ lecture.rating.toFixed(3) }}
                  </span>
                  <span v-else class="rating-point">
                    {{ lecture.rating.toFixed(1) }}
                  </span>
                </div>
                <v-rating
                  :model-value="lecture.rating / 2"
                  color="grey"
                  active-color="#ff8080"
                  half-increments
                  readonly
                  size="26"
                ></v-rating>
              </div>
              <!-- TODO: BUTTON 처럼 구현하기 -->
              <div v-else
                class="rating-point"
                elevation="12"
                @mouseover="ratingHover = true"
                @mouseleave="ratingHover = false"
              >
                <span v-if="ratingHover">Open!</span>
                <span v-else>Open?</span>
              </div>
              <div class="pt-2">{{ comments.length }} comments</div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row
        class="d-flex justify-center py-3"
        v-for="comment in comments"
        :key="comment.id"
      >
        <v-col
          class="d-flex justify-center"
        >
          <v-card
            class="comment-card elevation-2"
            variant="outlined"
            rounded="100"
          >
            <v-row class="px-4 py-4 font-weight-bold">
              <v-col class="comment-writer d-flex align-center justify-start">
                <span>by {{ comment.writer }}</span>
              </v-col>
              <v-col class="comment-date d-flex align-center justify-end">
                <span>{{ comment.date }}</span>
              </v-col>
            </v-row>
            <v-expand-transition>
              <div
                class="text-center"
                v-if="(!!lecture && lecture.rating != null) || !!comment.show"
              >
                <div class="comment-rating font-weight-black">
                  <div>
                    {{ comment.rating.toFixed(1) }}
                  </div>
                  <v-rating
                    :model-value="comment.rating / 2"
                    color="grey"
                    active-color="yellow-darken-4"
                    half-increments
                    readonly
                    size="22"
                  ></v-rating>
                </div>
                <v-table
                  class="best-tracks"
                  divider="false"
                  density="compact"
                >
                  <tbody>
                    <tr class="best-track-row" style="color: #ffb400;">
                      <td>
                        {{ comment.bests[0] }}
                      </td>
                    </tr>
                    <tr class="best-track-row" style="color: #4a4f5a;">
                      <td>
                        {{ comment.bests[1] }}
                      </td>
                    </tr>
                    <tr class="best-track-row" style="color: #6e3732;">
                      <td>
                        {{ comment.bests[2] }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
                <div class="comment-text pt-3 px-4">
                  {{ comment.comment }}
                </div>
              </div>
              <div v-else class="text-center">
                <v-icon 
                  class="unlock-icon"
                  color="#242d3c"
                  icon="mdi-cog-outline" 
                  size="large"
                ></v-icon>
                <v-icon 
                  class="unlock-icon"
                  color="#ff8080"
                  icon="mdi-cog-outline" 
                  size="large"
                ></v-icon>
                <v-icon 
                  class="unlock-icon"
                  color="#242d3c"
                  icon="mdi-cog-outline" 
                  size="large"
                ></v-icon>
              </div>
            </v-expand-transition>
            <v-card-actions>
              <v-btn :href="'/#/comment/edit/' + comment.id">
                <v-icon icon="mdi-playlist-edit" size="small"></v-icon>
                수정
              </v-btn>
              <v-btn>
                <v-icon icon="mdi-delete" size="small"></v-icon>
                삭제
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                v-if="lecture.rating == null"
                :icon="!!comment.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="comment.show = !comment.show"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center py-3">
        <v-col class="d-flex justify-center">
          <v-btn 
            class="comment-card post-button" 
            height="100" 
            :href="'/#/comment/create/' + $route.params.id"
          >
            <div class="d-flex justify-center align-center">
              <v-icon icon="mdi-square-edit-outline"></v-icon>
              <span class="ml-2">POST YOUR COMMENT</span>
            </div>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'LectureDetail',
  data() {
    return {
      ratingHover: false,
      lecture: null,
      comments: []
    }
  },
  mounted() {
    this.getLecture()
    this.getComments()
  },
  methods: {
    getLecture() {
      let vue = this
      let lecture_id = vue.$route.params.id

      axios.get(this.serverUrl + '/lecture/' + lecture_id)
        .then(function(res) {
          vue.lecture = res.data
        })
    },
    getComments() {
      let vue = this
      let lecture_id = vue.$route.params.id

      axios.get(this.serverUrl + '/lecture/' + lecture_id + "/comments")
        .then(function(res) {
          vue.comments = res.data
        })
    }
  }
})
</script>

<style scoped>
@font-face {
  font-family: "LINE Seed";
  src: url("../../fonts/LINESeedKR-Rg.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: "Lobster";
  src: url("../../fonts/Lobster-Regular.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

.main {
  font-family: "LINE Seed";
  padding-bottom: 100px;
}

.lecture-image {
  width: 88%;
  min-width: 100px;
  max-width: 300px;

  height: 100%;
}

.lecture-rating {
  width: 88%;
  min-width: 100px;
  max-width: 300px;
  height: 100%;

  border: none;
}

.rating-point {
  font-family: 'Lobster';
  font-size: min(10vw, 60px);
}

.rating-detail-point {
  font-family: 'Lobster';
  font-size: min(9vw, 50px);
}

.best-tracks >>> tr:hover {
  background: transparent !important;
}

.comment-writer {
  display: block !important;
  white-space: nowrap !important;
  overflow: hidden;
  text-overflow: ellipsis !important;

  font-size: 17px;
}

.comment-date {
  font-size: 14px;
  color: grey;
}

.comment-card {
  width: 60vw;
  min-width: 320px;
  max-width: 800px;
  border: 1px solid;
  border-color: #BDC0C4;
  border-radius: 20px;
}

.best-track-row td {
  border: none !important;
  font-weight: 600;

  font-size: min(max(1vw, 14px), 16px) !important;
}

.comment-text {
  font-size: min(max(1.2vw, 16px), 18px) !important;
  word-break: keep-all;
  white-space: pre-line;
}

.post-button {
  background-color:#f3f3f3;
}

.unlock-icon {
  transform: rotate(0deg);
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>