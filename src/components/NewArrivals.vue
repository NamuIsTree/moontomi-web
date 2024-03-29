<!-- https://vue-horizontal.fuxing.dev/recipes/cards#slanted -->
<template>
  <main>
    <div class="header">
      <div class="text-h4 text-weight-thin">
        New Arrivals
      </div>
      <p class="header-subtitle">
        오늘의 새로운 발견
      </p>
    </div>

    <vue-horizontal class="horizontal">
      <div class="item" v-for="item in items" :key="item.id">
        <div class="card">
          <div class="wrapper">
            <div class="image" :style="{background: `url(${item.image})`}"></div>
            <div class="date">{{ item.date }}</div>
          </div>
          <div class="content">
            <div>
              <div class="title">{{ item.title }}</div>
              <div class="rating">
                <v-rating
                  v-model="item.rating"
                  color="white"
                  active-color="yellow-accent-4"
                  half-increments
                  readonly
                  size="22"
                ></v-rating>
              </div>
              <div class="comment pb-2">{{ item.comment }}</div>
            </div>
            
            <div class="writer">by {{ item.writer }}</div>
          </div>
        </div>
      </div>
    </vue-horizontal>
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import VueHorizontal from 'vue-horizontal'

export default defineComponent({
  name: 'NewArrivals',
  components: {
    VueHorizontal
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
})
</script>

<style scoped>
.card {
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.wrapper {
  position: relative;
}

.wrapper .date {
  font-size: min(max(1.8vw, 15px), 20px);
}

.image {
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  padding-top: 60%;
  clip-path: polygon(100% 0, 100% 80%, 0% 98%, 0 0%);
  transition: 0.3s;
}

.card:hover .image {
  clip-path: polygon(100% 0, 100% 77%, 0% 95%, 0 0%);
}

.header-subtitle {
  font-size: min(max(1.8vw, 15px), 20px)
}

.content {
  padding: 0px 16px 12px 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.rating {
  margin-left: -3px;
}

.comment {
  position: relative;
  font-size: min(max(1.8vw, 15px), 20px);
  line-height: 1.5;
  word-break: keep-all;
}

.title {
  font-size: min(max(2.0vw, 18px), 22px);
  font-weight: 700;
  line-height: 1.6;
  margin-top: 8px;
}

.date {
  font-size: 10px;
  font-weight: 700;
  color: black;
  line-height: 1;
  position: absolute;
  bottom: 0;
  right: 12px;
}
</style>

<!-- Parent CSS (Container) -->
<style scoped>
.header {
  margin-bottom: 16px;
}

main {
  padding: 24px;
}
</style>

<!-- Responsive Breakpoints -->
<style scoped>
.horizontal {
  --fixed: 240px;
  --count: 1.2;
  --gap: 12px;
  --margin: 24px;
}

@media (min-width: 768px) {
  .horizontal {
    --count: 2.2;
    --margin: 0;
  }
}

@media (min-width: 1024px) {
  .horizontal {
    --count: 2.8;
  }
}

@media (min-width: 1280px) {
  .horizontal {
    --gap: 24px;
    --count: 3.4;
  }
}

@media (min-width: 1536px) {
  .horizontal {
    --count: 3.4;
  }
}
</style>

<!--
## Responsive Logic
The margin removes the padding from the parent container and add it into vue-horizontal.
If the gap is less than margin, this causes overflow to show and peeks into the next content for better UX.
You can replace this section entirely for basic responsive CSS logic if you don't want this "peeking" experience
for the mobile web.
Note that this responsive logic is hyper sensitive to your design choices, it's not a one size fit all solution.
var() has only 95% cross browser compatibility, you should convert it to fixed values.

There are 2 set of logic:
0-768 for peeking optimized for touch scrolling.
>768 for navigation via buttons for desktop/laptop users.
-->
<style scoped>
@media (max-width: 767.98px) {
  .item {
    width: var(--fixed);
    padding: 0 calc(var(--gap) / 2);
  }

  .item:first-child {
    width: calc(var(--fixed) + var(--margin) - (var(--gap) / 2));
    padding-left: var(--margin);
  }

  .item:last-child {
    width: calc(var(--fixed) + var(--margin) - (var(--gap) / 2));
    padding-right: var(--margin);
  }

  .item:only-child {
    width: calc(var(--fixed) + var(--margin) * 2 - var(--gap));
  }

  .horizontal {
    margin: 0 calc(var(--margin) * -1);
  }

  .horizontal >>> .v-hl-container {
    scroll-padding: 0 calc(var(--margin) - (var(--gap) / 2));
  }

  .horizontal >>> .v-hl-btn {
    display: none;
  }
}

@media (min-width: 768px) {
  .item {
    width: calc((100% - ((var(--count) - 1) * var(--gap))) / var(--count));
    margin-right: var(--gap);
  }
}
</style>