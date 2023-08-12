<template>
  <v-container
    class="comment-sheet px-1"
  >
    <v-row class="d-flex align-center justify-center pt-0">
      <v-col cols="10" class="album-title d-flex align-center justify-start">
        <span>
          <strong>#{{ index }}</strong>
          <span class="font-italic">&nbsp;{{ comment.album.title }}</span>
        </span>
      </v-col>
      <v-col cols="2" class="d-flex align-center justify-end">
        <a class="text-decoration-none" :href="'/#/lecture/' + comment.lecture_id">
          <v-icon
            class="d-flex align-center justify-end pb-1"
            icon="mdi-open-in-new"
            size="x-small"

          ></v-icon>
        </a>
      </v-col>
    </v-row>
    <v-row class="d-flex align-end justify-center">
      <v-col cols="3" class="comment-writer d-flex align-end justify-start pb-1">
          {{ comment.writer }}
      </v-col>
      <v-col cols="9" class="comment-writer">
        <v-row class="comment-rating">
          <v-col class="d-flex align-center justify-end pt-0 pb-2 ">
            {{ comment.rating.toFixed(1) }}
          </v-col>
        </v-row>
        <v-row>
          <v-col class="comment-text d-flex align-center justify-end pt-2 pb-1">
            {{ comment.text }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommentRow',
    props: {
        index: {
          type: Number,
          required: true
        },
        comment: {
          type: Object,
          required: true
        }
    }
})
</script>

<style scoped>
@font-face {
  font-family: "Lobster";
  src: url("../fonts/Lobster-Regular.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

.comment-sheet:hover {
  background-color: #eee;
}

.album-title {
  display: block !important;
  white-space: nowrap !important;
  overflow: hidden;
  text-overflow: ellipsis !important;
}

.comment-text {
  display: block !important;
  white-space: nowrap !important;
  overflow: hidden;
  text-overflow: ellipsis !important;
  text-align: end;
}

.comment-rating {
  font-family: "Lobster";
  font-size: max(25px, 30%)
}

.comment-index {
  width: 30px;
}

a { 
  color: black; 
}
</style>