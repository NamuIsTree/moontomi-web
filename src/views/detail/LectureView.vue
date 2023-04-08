<template>
  <v-container class="main">
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
              :key="genre.category + ' ' + genre.name"
              variant="outlined"
              size="small"
            >
              {{ genre.name.toUpperCase() }} | {{ genre.category }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-row
        align-center 
        class="text-center"
      >
        <v-col class="d-flex flex-row align-self-center justify-center">
          <img
            :src="lecture.image"
            width="300"
            height="300"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row
        class="py-3"
        v-for="comment in comments"
        :key="comment.id"
      >
        <v-col>
          <v-card
            class="comment-card elevation-2"
            variant="outlined"
            rounded="100"
          >
            <v-row class="px-4 py-4 font-weight-bold">
              <v-col class="comment-writer d-flex align-center justify-start">
                <span>by {{ comment.nickname }}</span>
              </v-col>
              <v-col class="comment-date d-flex align-center justify-end">
                <span>{{ comment.date }}</span>
              </v-col>
            </v-row>
            <v-expand-transition>
              <div
                class="text-center"
                v-if="!!comment.show"
              >
                <v-rating
                  v-model="comment.rating"
                  color="grey"
                  active-color="yellow-darken-4"
                  half-increments
                  readonly
                  size="22"
                ></v-rating>
                <v-table
                  class="pt-2"
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
                <div class="comment-text pt-4">
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
              <v-btn
              >
                <v-icon icon="mdi-playlist-edit" size="small"></v-icon>
                수정
              </v-btn>
              <v-btn
              >
                <v-icon icon="mdi-delete" size="small"></v-icon>
                삭제
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                :icon="!!comment.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="comment.show = !comment.show"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LectureDetail',
  data() {
    return {
      lecture: {
        title: 'Future Nostalgia',
        artist: 'Dua Lipa',
        release: 2020,
        rating: 8.0,
        genres: [
          {
            category: 'POP',
            name: 'Synth'
          },
          {
            category: 'POP',
            name: 'Disco'
          }
        ],
        season: {
          name: '2020 결산'
        },
        image: 'https://moontomi.netlify.app/mock/1.jpg'
      },
      comments: [{
        id: '421',
        nickname: '문교수',
        date: '2023-04-01',
        rating: 4.0,
        bests: [
          'Cool',
          'Future Nostalgia',
          'Good In Bed'
        ],
        comment: '2020년 디스코 시대의 시작을 알리는 첫 축포'
      }, {
        id: '422',
        nickname: '후지노미야이주희망자',
        date: '2023-04-01',
        rating: 3.5,
        bests: [
          'Good In Bed',
          'Don\'t Start Now',
          'Love Again'
        ],
        comment: '세련되고 트렌디하면서도 아찔했다'
      }]
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
  font-family: "LINE Seed";
  padding-bottom: 100px;
}

.lecture-rating {
  width: 150px;
  height: 150px;
  line-height: 150px;
  font-size: 40px;
  border: solid 4px;
  border-radius: 100%;

  font-weight: 700;
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
  color: dimgrey;
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