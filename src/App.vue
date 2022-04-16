<template>
  <v-app>
    <!-- Header -->
    <app-header/>
    <!-- Content -->
    <v-main class="contents-wrapper">
      <router-view/>
    </v-main>
    <div id="dummy"/>
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
#dummy {
  height:7000px;
  background-color: aqua;
}

.contents-wrapper {
  position: absolute;
  top: 100px;
}
</style>