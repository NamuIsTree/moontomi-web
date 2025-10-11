<template>
    <v-container class="main" v-if="review != null">
        <v-form
            v-model="form"
            @submit.prevent="onSubmit"
        >
        <v-row>
            <v-col>
                <h2 class="text-center py-4">원고 수정하기</h2>
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
                    :rules="[required]"
                ></v-text-field>
                <v-select
                    label="타입"
                    v-model="reviewType"
                    :items="reviewTypes"
                    :rules="[required]"
                    variant="outlined"
                    style="margin-bottom: -20px;"
                ></v-select>
                <v-text-field
                    label="제목"
                    v-model="title"
                    variant="outlined"
                    style="margin-bottom: -20px;"
                    :rules="[required]"
                ></v-text-field>
                <v-textarea
                    label="설명"
                    v-model="description"
                    variant="outlined"
                    style="margin-bottom: -20px;"
                    :rules="[required]"
                    auto-grow
                    rows="2"
                ></v-textarea>
                <v-text-field
                    v-model="password"
                    :readonly="loading"
                    :rules="[required, isPasswordFormat]"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="() => showPassword = !showPassword"
                    style="margin-bottom: -32px"
                    variant="outlined"
                    clearable
                    label="비밀번호"
                    placeholder="Enter Password"
                ></v-text-field>
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
        </v-row>
        </v-form>
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
    HorizontalRule,
    FontSize,
    LineHeight,
    History
  } from 'element-tiptap-vue3-fixed';
import axios from 'axios';

  export default defineComponent({
    name: 'CreateReview',
    data() {
        return {
            loading: false,
            review: null,
            currentImage: undefined,
            previewImage: undefined,
            reviewTypes: ['결산', '칼럼', '잡설'],
            extensions: [
                Doc,
                Text,
                Paragraph,
                Heading.configure({ level: 3 }),
                Bold.configure({ bubble: true }), // render command-button in bubble menu.
                Underline.configure({ bubble: true }), // render command-button in bubble menu but not in menubar.
                Italic.configure({ bubble: true }),
                Strike.configure({ bubble: true }),
                FontSize.configure({ bubble: true }),
                LineHeight.configure({ bubble: true }),
                Link.configure({ bubble: true }),
                Color.configure({ bubble: true }),
                Highlight,
                TextAlign,
                BulletList,
                OrderedList,
                Blockquote,
                HorizontalRule,
                Table,
                Image,
                Iframe,
                History
            ],
            writer: null,
            title: null,
            description: null,
            reviewType: null,
            password: null,
            showPassword: false,
            content: ref(``)
        }
    },
    mounted() {
        this.getReview();
    },
    methods: {
        getReview() {
        let vue = this
        let review_id = vue.$route.params.id

        axios.get(this.serverUrl + '/review/' + review_id)
            .then(function(res) {
                vue.review = res.data
                vue.previewImage = res.data.image
                vue.title = res.data.title
                vue.writer = res.data.writer
                vue.reviewType = res.data.type
                vue.description = res.data.description
                vue.content = ref(res.data.content)
                vue.password = res.data.password
            })
        },
        selectImage(e) {
            let image = e.target.files[0];
            this.currentImage = image;
            this.previewImage = window.URL.createObjectURL(this.currentImage);
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
        },
        onSubmit(e) {
            e.preventDefault();

            if (!this.form) return
            this.loading = true

            const formData = new FormData();
            let vue = this

            if (vue.currentImage != null) {
                formData.append('image', vue.currentImage)
            }
            formData.append('title', vue.title)
            formData.append('writer', vue.writer)
            formData.append('review_type', vue.reviewType)
            formData.append('description', vue.description)
            formData.append('content', vue.content)
            formData.append('password', vue.password)

            axios.post(this.serverUrl + '/review/' + vue.review.id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                transformRequest: [
                    function() {
                        return formData;
                    }
                ]
            })
            .then((res) => {
                if (res) {
                    setTimeout(() => {
                        alert('원고가 수정되었습니다.')

                        let reviewPage = '/review/' + res.data.id
                        vue.$router.push(reviewPage)
                                .then(() => { this.$router.go() })
                    })
                }
            })
            .catch((err) => {
                vue.loading = false
                alert(err.response.data.detail)
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