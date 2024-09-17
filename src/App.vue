<template>
  <v-app>
    <!-- Header -->
    <app-header class="app-header" />
    <!-- Content -->
    <v-main class="contents-wrapper">
      <router-view/>
    </v-main>
    <!-- Footer -->
    <app-footer class="app-footer"/>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter
  }
}
</script>

<style scoped>
.contents-wrapper {
  position: absolute;
  overflow-x: hidden;

  margin: 0 auto;

  top: 90px;
}

.app-header {
  z-index: 10000;
}

.app-footer {
  z-index: 10000;
}

</style>