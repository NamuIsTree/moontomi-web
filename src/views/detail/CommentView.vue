<template>
<div class="main">
    <h1>{{ view.pageTitle }}</h1>
</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: "CommentDetail",
    data() {
        return {
            view: {}
        }
    },
    mounted() {
        let isCreateMode = (this.$route.params.mode === 'create')
        let lecture = {
            id: 1,
            title: 'Future Nostalgia',
            tracks: [
                'Future Nostalgia',
                'Don\'t Start Now',
                'Cool',
                'Physical',
                'Levitating',
                'Pretty Please',
                'Hallucinate',
                'Love Again',
                'Break My Heart',
                'Good In Bed',
                'Boys Will Be Boys'
            ]
        }
        let pageTitle = isCreateMode ? 'POST COMMENT' : 'EDIT COMMENT'

        this.view = {
            isCreateMode: isCreateMode,
            pageTitle: pageTitle,
            data: {
                pageTitle: pageTitle,
                lecture: lecture
            }
        }
    }
})
</script>