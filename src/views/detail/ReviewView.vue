<template>
  <v-container class="main">
    <v-container v-if="review != null" class="text-center" fill-height fluid>
      <v-row>
        <v-col cols="12">
          <h4>#{{ review.id }}</h4>
          <h4 style="color: #808080">{{ review.created_at }}</h4>
          <h1 class="review-title font-italic">
            <svg v-if="!onMobile" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-quote" viewBox="-10 0 24 24">
              <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"/>
            </svg>
            {{ review.title }}
            <svg v-if="!onMobile" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-quote" viewBox="-2 0 24 24">
              <g transform="rotate(180 8 8)">
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"/>
              </g>
            </svg></h1>
          <h3 class="review-writer font-italic">written by {{ review.writer }}</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-chip label>
            {{ review.type }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-col>
            <img
              class="review-image"
              :src="review.image"
              alt="review-image"
            />
          </v-col>
        </v-col>
      </v-row>
      
    <v-container>
      <v-row>
        <v-col>
          <el-tiptap
            v-model:content="review.content"
            :extensions="extensions"
            readonly
          />
        </v-col>
      </v-row>
    </v-container>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import {
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  BulletList,
  OrderedList,
  Image,
  Iframe,
  Table,
  TextAlign,
  Color,
  Link,
  Highlight,
  Blockquote,
  HorizontalRule,
  LineHeight,
  FontSize
} from 'element-tiptap-vue3-fixed';

export default defineComponent({
  name: 'ReviewDetail',
  data() {
    return {
      review: null,
      editor: null,
      onMobile: false,
      extensions: [
        Doc.configure({ menubar: false }),
        Text.configure({ menubar: false }),
        Paragraph.configure({ menubar: false }),
        Heading.configure({ menubar: false }),
        Bold.configure({ menubar: false }),
        Underline.configure({ menubar: false }),
        Italic.configure({ menubar: false }),
        Strike.configure({ menubar: false }),
        FontSize.configure({ menubar: false }),
        Link.configure({ menubar: false }),
        Color.configure({ menubar: false }),
        Highlight.configure({ menubar: false }),
        TextAlign.configure({ menubar: false }),
        BulletList.configure({ menubar: false }),
        OrderedList.configure({ menubar: false }),
        Blockquote.configure({ menubar: false }),
        HorizontalRule.configure({ menubar: false }),
        Table.configure({ menubar: false }),
        Image.configure({ menubar: false }),
        LineHeight.configure({ menubar: false }),
        Iframe.configure({ menubar: false })
      ],
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)

    window.addEventListener('scroll', () => {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 50) {
          this.shrink = true;
      } else {
          this.shrink = false;
      }
    });
    this.getReview()
  },
  methods: {
    getReview() {
      let vue = this
      let review_id = vue.$route.params.id

      axios.get(this.serverUrl + '/review/' + review_id)
        .then(function(res) {
          vue.review = res.data
        })
    },
    handleResize() {
      this.onMobile = (window.innerWidth < 768)
    },
  }
})

</script>

<style scoped>

@font-face {
  font-family: "Nanum Myeongjo";
  src: url("../../fonts/NanumMyeongjoExtraBold.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

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

.review-title {
  font-family: 'Nanum Myeongjo';
}

.review-writer {
  font-family: 'Nanum Myeongjo';
}

.main {
  font-family: "LINE Seed";
  padding-bottom: 100px;
  margin-left: -5%;
  width: 110%;
}

.review-image {
  width: 88%;
  min-width: 100px;
  max-width: 300px;

  height: 100%;
}

.review-content {
  width: 110%;
}

.main :deep(.el-tiptap-editor__menu-bar) {
  display: none;
}

.main :deep(.el-tiptap-editor__content) {
  border-top: 1px solid #ebeef5;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.main :deep(.el-tiptap-editor__content) a {
  color: rgba(255, 128, 128, 0.8);
}

@media (max-width: 768px) {

  .review-image {
    width: 70%;
  }

  .main :deep(.image-view__body__image) {
    width: 100% !important;
    height: auto !important;
  }
}


@media (min-width: 768px) {
  .main {
    width: 768px;
  }

  .review-content {
    width: 768px;
  }
}

</style>