<template>
  <div v-if="lecture != null" class="main">
    <v-container class="text-center" fill-height fluid>
      <v-row>
        <v-col cols="12">
          <h4>{{ $route.params.id }} 회</h4>
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
      <v-row>
        <v-col cols="12">
          <img
            :src="lecture.image"
            width="200"
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          평가를 작성합니다
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="text-center" fill-width>
      <v-card
        class="comment-card pb-15"
        style="border: none;"
        variant="outlined"
      >
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
          <v-text-field
            v-model="writer"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="닉네임"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required, isPasswordFormat]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="() => showPassword = !showPassword"
            clearable
            label="비밀번호"
            placeholder="Enter Password"
          ></v-text-field>

          <div>
            평점 : {{ (rating / 10).toFixed(1) }}
          </div>
          <v-slider
            class="rating-slider px-2"
            track-color="grey"
            v-model="rating"
            :color="ratingColor"
            :step="1"
          ></v-slider>

          <v-autocomplete
            v-model="bests[0]"
            :items="lecture.tracks"
            label="베스트 1"
          ></v-autocomplete>

          <v-autocomplete
            v-model="bests[1]"
            :items="lecture.tracks"
            label="베스트 2"
          ></v-autocomplete>

          <v-autocomplete
            v-model="bests[2]"
            :items="lecture.tracks"
            label="베스트 3"
          ></v-autocomplete>

          <div class="mx-auto">
            <v-row>
              <v-col class="pl-3 pr-0" cols="10">
                <v-textarea
                  v-model="comment"
                  label="한줄평"
                  variant="outlined"
                  auto-grow
                  rows="2"
                ></v-textarea>
              </v-col>
              <v-col class="px-0" cols="2">
                <v-btn
                  icon="mdi-emoticon-happy-outline"
                  variant="outlined"
                  style="border: none;"
                ></v-btn>
                <v-overlay
                  class="align-center justify-center"
                  activator="parent"
                  location-strategy="connected"
                  scroll-strategy="close"
                >
                  <emoji-picker 
                    @emoji-click="selectEmoji"
                  />
                </v-overlay>
              </v-col>
              <v-col cols="1"></v-col>
            </v-row>
          </div>

          <v-btn
            color="success"
            size="large"
            type="submit"
          >
            평가 제출
          </v-btn>
          <v-overlay
            :model-value="loading"
            class="align-center justify-center"
          >
            <v-progress-circular
              color="#ff8080"
              indeterminate
              size="45"
            ></v-progress-circular>
          </v-overlay>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>
  
<script>
import { defineComponent } from 'vue'
import { VuemojiPicker } from 'vuemoji-picker'

import axios from 'axios'


export default defineComponent({
    name: "CreateComment",
    components: {
      'emoji-picker': VuemojiPicker
    },
    data() {
      return {
        form: false,
        lecture: null,
        writer: null,
        password: null,
        rating: 0,
        bests: ['', '', ''],
        comment: '',
        emojiOverlay: false,
        loading: false,
        showPassword: false
      }
    },
    computed: {
      ratingColor() {
        if (this.rating < 30) return 'indigo'
        if (this.rating < 50) return 'teal'
        if (this.rating < 60) return 'green'
        if (this.rating < 80) return 'orange'
        return 'red'
      }
    },
    mounted() {
      this.getLecture()
    },
    methods: {
      getLecture() {
        let vue = this
        let lecture_id = vue.$route.params.id

        axios.get('https://server.moontomi.com/lecture/' + lecture_id)
          .then(function(res) {
            vue.lecture = res.data
          })
      },
      selectEmoji(emoji) {
        console.log(emoji.unicode)
        this.comment += emoji.unicode
      },
      onSubmit() {
        if (!this.form) return
        this.loading = true

        let vue = this
        let picks = this.bests.map((best) => {
          return vue.lecture.tracks.findIndex((track) => track === best)
        })
        let data = {
            lecture_id: vue.lecture.id,
            rating: vue.rating,
            writer: vue.writer,
            password: vue.password,
            picks: picks,
            text: vue.comment
          }

        axios.put('https://server.moontomi.com/comment', data)
          .then((res) => {
            if (res) {
              setTimeout(() => {
                alert('평가가 등록되었습니다')

                let lecturePage = '/lecture/' + vue.lecture.id
                vue.$router.push(lecturePage)
                          .then(() => { this.$router.go() })
              }, 1000)
            }
          })
      },
      required(v) {
        return !!v || 'Field is required'
      },
      isPasswordFormat(v) {
        /* eslint-disable */
        const pattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/

        if (!pattern.test(v)) {
          return '알파벳 대소문자, 숫자, 특수문자만 사용할 수 있습니다.'
        }

        return true
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

.main {
  font-family: 'LINE Seed';
}

.comment-card {
  width: min(85vw, 600px);
}

</style>