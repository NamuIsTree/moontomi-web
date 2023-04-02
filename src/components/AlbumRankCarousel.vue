<!-- https://ismail9k.github.io/vue3-carousel/examples.html#active-classes -->
<template>
    <carousel :itemsToShow="3.95" :wrapAround="true" :autoplay="3000" :transition="500">
        <slide v-for="(item, index) in items" :key="index">
            <div class="carousel__item">
                <img class="carousel__img" :src="item.image" width="300" height="300">
                <div class="carousel__img--caption">
                    <span class="carousel__img--rank" v-if="index === 0">🥇 1위</span>
                    <span class="carousel__img--rank" v-else-if="index === 1">🥈 2위</span>
                    <span class="carousel__img--rank" v-else-if="index === 2">🥉 3위</span>
                    <span class="carousel__img--rank" v-else>{{ index + 1 }}위</span>
                    <span>{{ item.title }} ({{ item.rating.toFixed(1) }})</span>
                    <br>
                    <span>- {{ item.artist }} -</span>
                </div>
            </div>
        </slide>
    </carousel>
</template>
  
<script>
import { defineComponent } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
  
export default defineComponent({
    name: 'ActiveCarousel',
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    components: {
        'carousel': Carousel,
        'slide': Slide
    }
})
</script>
  
<style scoped>
.carousel__slide {
    padding: 5px;
    height: 30vw;
}
  
.carousel__viewport {
    perspective: 2000px;
    height: 500px;
}
  
.carousel__track {
    transform-style: preserve-3d;
}
  
.carousel__slide--sliding {
    transition: 0.5s;
}
  
.carousel__slide {
    opacity: 0.9;
    transform: scale(0.85);
}
  
.carousel__slide--prev {
    opacity: 1;
    transform: rotateY(-20deg) scale(0.95);
}
  
.carousel__slide--next {
    opacity: 1;
    transform: rotateY(20deg) scale(0.95);
}
  
.carousel__slide--active {
    opacity: 1;
    transform: scale(1.1);
    z-index: 10;
}

.carousel__img {
    position: relative;

    width: 24vw;
    height: 24vw;

    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    filter: brightness(0.8);
}

.carousel__img--caption {
    position: absolute;

    bottom: 45px;
    left: 0;
    width: 24vw;
    height: 5vw;
    /* background-color: rgba(0, 0, 0, 0.7); */
    color: #fff;
    padding: 10px;
    font-size: 1vw;
}

.carousel__img--rank {
    padding-right: 0.5vw;
}
</style>