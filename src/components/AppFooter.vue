<template>
  <v-footer
    bottom fixed
    width="100%"
    padless
    id="app-footer"
  >
    <v-row
      justify="center"
      no-gutters
    >
      <a
        v-for="link in links"
        :key="link[0]"
        :href="link[1]"
        class="px-2"
        id="links"
      >
      <v-btn
        :key="link[0]"
        depressed
        rounded
        class="primary lighten-2 my-1 py-2"
        id="link-button"
      >
        {{ link[0] }}
      </v-btn>
      </a>
      <v-col
        class="py-2 text-center"
        cols="12"
      >
        <strong>MoonTomi v3.0</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      links: [
        ['Home', '/#/'],
        ['Review', '/#/reviews'],
        ['Lecture', '/#/lectures'],
        ['history', '/#/lookup'],
        ['Archive', '/#/singles'],
        ['blog', 'https://blog.naver.com/hk12062006'],
      ],
    }),
  }
</script>
<style scoped>
#app-footer {
  background-color: #242d3c;
  color: aliceblue;
}
#links {
  text-decoration: none;
}
#link-button {
  box-shadow: none;
  background-color: #242d3c;
  color: aliceblue;
}
</style>