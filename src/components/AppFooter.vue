<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    touchless="false"
    fixed
    app
  >
    <v-list-item
      class="nav-header"
      prepend-avatar="https://moontomi.netlify.app/icons/icon-192x192.png"
      nav
    >
      <v-list-item-title
        id="nav-header"
      >
        MOONTOMI
      </v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item
      v-for="item in items"
      :key="item.title"
      :to="{path:item.path}"
    >
      <v-list-item-icon>
        <v-icon
          color="#242d3c"
        >
          {{ item.icon }}
        </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title
          id="nav-title"
        >
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>

  <v-footer
    bottom fixed
    width="100%"
    padless
    id="app-footer"
  >
    <v-row
      justify-center
      no-gutters
    >
      
      <v-col
        id="nav-button pl-3"
        cols="4"
        @click="drawer = !drawer"
      >
        <v-icon
          icon="mdi-view-headline"
        ></v-icon>
      </v-col>
      <v-col
        class="footer-text py-0.5 text-center"
        cols="4"
      >
        <strong>MoonTomi v3.0</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
  export default {
    data() {
      return {
        drawer: false,
        items: [
          { title: "HOME", icon: "mdi-home", path: "/" },
          { title: "칼럼", icon: "mdi-newspaper-variant-outline", path: "/reviews"},
          { title: "음평회", icon: "mdi-album", path: "/lectures"},
          { title: "둘러보기", icon: "mdi-history", path: "/lookup"},
          { title: "아카이브", icon: "mdi-music-circle-outline", path: "/singles"}
        ]
      }
    }
  }
</script>
<style scoped>
@font-face {
  font-family: "Bayaters Stamp";
  src: url("../fonts/BayatersStampdemo-51PB8.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: "LINE Seed";
  src: url("../fonts/LINESeedKR-Rg.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

#app-footer {
  background-color: #242d3c;
  color: aliceblue;
}

#nav-header {
  font-family: "Bayaters Stamp";
  font-weight: 500;
  font-size: 25px;
}

#nav-title {
  font-family: "LINE Seed";
  padding: 1px;
  padding-left: 10px;
  margin-top: 3px;
}

</style>