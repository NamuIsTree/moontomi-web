<template>
    <v-container class="main">
        <v-row>
            <v-col>
                <h2 class="text-center py-4">투고하기</h2>
                <v-file-input
                    show-size
                    label="썸네일 이미지"
                    accept="image/*"
                    variant="outlined"
                    @change="selectImage"
                ></v-file-input>
                <div class="text-center" style="margin-top: -25px;">
                    <div>
                        <img 
                            class="thumbnail-preview mt-2 mb-3"
                            :src="previewImage ? previewImage : '/icons/upload-preview.png'"
                            width="250"
                            height="250"
                            alt="thumbnail-preview"
                        />
                    </div>
                </div>
                <v-text-field
                    v-model="writer"
                    label="작성자"
                    variant="outlined"
                    style="margin-bottom: -20px;"
                ></v-text-field>
                <v-select
                    label="타입"
                    v-model="columnType"
                    :items="columnTypes"
                    variant="outlined"
                    style="margin-bottom: -20px;"
                ></v-select>
                <v-text-field
                    label="제목"
                    v-model="title"
                    variant="outlined"
                    style="margin-bottom: -20px;"
                ></v-text-field>
                <v-textarea
                    label="설명"
                    v-model="description"
                    variant="outlined"
                    style="margin-bottom: -32px;"
                    auto-grow
                    rows="2"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <el-tiptap 
                    v-model:content="content" 
                    :extensions="extensions"
                />
            </v-col>
        </v-row>
        <v-row class="pt-10">
            <v-btn
                color="#ff8080"
                class="text-white elevation-0"
                size="large"
                type="submit"
                block
            > UPLOAD
            </v-btn>
        </v-row>
    </v-container>
</template>
  
<script>
  import { defineComponent, ref } from 'vue';
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
    FontSize
  } from 'element-tiptap-vue3-fixed';

  export default defineComponent({
    name: 'CreateReview',
    data() {
        return {
            currentImage: undefined,
            previewImage: undefined,
            columnTypes: ['결산', '칼럼', '잡설'],
            extensions: [
                Doc,
                Text,
                Paragraph,
                Heading.configure({ level: 3 }),
                Bold.configure({ bubble: true }), // render command-button in bubble menu.
                Underline.configure({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
                Italic.configure({ }),
                Strike,
                FontSize,
                Link,
                Color,
                Highlight,
                TextAlign,
                BulletList,
                OrderedList,
                Blockquote,
                Table,
                Image,
                Iframe
            ],
            writer: null,
            title: null,
            description: null,
            
            content: ref(``)
        }
    },
    methods: {
        selectImage(e) {
            let image = e.target.files[0];
            this.currentImage = image;
            this.previewImage = window.URL.createObjectURL(this.currentImage);
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
  width: 768px;
}

@media screen and (max-width: 768px) {
    .main {
        width: 340px;
    }
}

</style>