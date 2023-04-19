<!-- https://ismail9k.github.io/vue3-carousel/examples.html#active-classes -->
<template>
    <carousel :itemsToShow="itemsToShow" :wrapAround="true" :autoplay="3000" :transition="500">
        <slide v-for="(item, index) in items" :key="index">
            <div class="carousel__item">
                <div class="carousel__img">
                    <img class="carousel__img" :src="item.image">
                    <img class="carousel__img--translucent" :src="'https://moontomi.netlify.app/rank/translucent_' + (index + 1) + '.png'">
                </div>
            </div>
        </slide>

        <template #addons>
            <pagination />
        </template>
    </carousel>
</template>
  
<script>
import { defineComponent } from 'vue'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
  
export default defineComponent({
    name: 'AlbumRankCarousel',
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.handleResize()
        window.addEventListener('resize', this.handleResize)
    },
    components: {
        'pagination': Pagination,
        'carousel': Carousel,
        'slide': Slide
    },
    data() {
        return {
            itemsToShow: 0
        }
    },
    methods: {
        /* eslint-disable */
        handleResize(event) {
            let itemsToShow = Math.max(3.0, window.innerWidth / 200)
            itemsToShow = Math.min(4.8, itemsToShow)
            this.itemsToShow = itemsToShow
        }
    }
})
</script>
  
<style scoped>
.carousel__slide {
    padding: 5px;
    height: 30vw;
    min-height: 230px;
    max-height: 500px;
}
  
.carousel__viewport {
    perspective: 1500px;
}
  
.carousel__track {
    transform-style: preserve-3d;
}
  
.carousel__slide--sliding {
    transition: 0.5s;
}
  
/* prev of prev slide*/
.carousel__slide {
    opacity: 0.9;
    transform: rotateY(30deg) scale(0.88);
}

/* next of next slide*/
.carousel__slide--active ~ .carousel__slide {
    opacity: 0.9;
    transform: rotateY(-30deg) scale(0.88);
}
  
.carousel__slide--prev {
    opacity: 0.95;
    transform: rotateY(20deg) scale(0.95);
    z-index: 8;
}
  
.carousel__slide--next {
    opacity: 0.95 !important;
    transform: rotateY(-20deg) scale(0.95) !important;
    z-index: 8;
}
  
.carousel__slide--active {
    opacity: 1;
    transform: scale(1.1);
    z-index: 10;
}

.carousel__img {
    position: relative;

    width: 24vw;
    max-width: 400px;
    min-width: 180px;

    height: 24vw;
    max-height: 400px;
    min-height: 180px;

    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 2px -2px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    filter: brightness(0.99);
}

.carousel__img--translucent {
    position: absolute;

    width: 24vw;
    max-width: 400px;
    min-width: 180px;
    
    height: 24vw;
    max-height: 400px;
    min-height: 180px;

    left: 0;
    top: 0;
}

.carousel__img--rank {
    padding-right: 0.5vw;
}
</style>