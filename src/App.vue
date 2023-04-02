<template>
  <v-app>
    <!-- Header -->
    <app-header/>
    <!-- Content -->
    <v-main class="contents-wrapper">
      <router-view/>
    </v-main>
    <!-- Footer -->
    <app-footer/>
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
  top: 100px;
}
</style>