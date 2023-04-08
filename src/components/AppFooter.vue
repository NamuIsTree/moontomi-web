<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    touchless="false"
    class="d-flex fill-height"
    app
  >
    <v-list-item
      class="nav-header"
      prepend-avatar="https://moontomi.netlify.app/icons/icon-192x192.png"
      title="HELLO! MOONTOMI"
      subtitle="NAVIGATION"
      nav
    ></v-list-item>

    <v-list-item-group class="bottom-links pb-10">
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
      <v-divider></v-divider>
    </v-list-item-group>
  </v-navigation-drawer>

  <v-footer
    bottom fixed
    width="100%"
    padless
    id="app-footer"
    @click="handleNavigate"
  >
    <v-row
      justify-center
      align-center
      no-gutters
    >
      <v-col
        class="footer-text py-0.5 text-center text-weight-black"
        cols="12"
      >
        <div v-if="!navigatable">
          대중 음악의 이해
        </div>
        <div v-else>
          <span>🧭 NAVIGATION</span>
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
  export default {
    data() {
      return {
        drawer: false,
        navigatable: false,
        items: [
          { title: "HOME", icon: "mdi-home", path: "/" },
          { title: "칼럼", icon: "mdi-newspaper-variant-outline", path: "/reviews"},
          { title: "음평회", icon: "mdi-album", path: "/lectures"},
          { title: "둘러보기", icon: "mdi-history", path: "/lookup"},
          { title: "아카이브", icon: "mdi-music-circle-outline", path: "/singles"}
        ]
      }
    },
    mounted() {
      this.handleResize()
      addEventListener('resize', this.handleResize)
    },
    methods: {
      /* eslint-disable */
      handleResize(event) {
        if (window.innerWidth < 768) {
          this.navigatable = true;
        } else {
          this.navigatable = false;
        }
      },
      handleNavigate(event) {
        if (this.navigatable) {
          this.drawer = !this.drawer
        }
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
  font-family: "LINE Seed";

  background-color: #242d3c;
  color: aliceblue;
}

.nav-header {
  font-family: "Bayaters Stamp";
  font-weight: 500;
}

#nav-title {
  font-family: "LINE Seed";
  padding: 1px;
  padding-left: 10px;
  margin-top: 3px;
}

.bottom-links {
  position: fixed !important;
  bottom: 0 !important;
  width: 100%;
}

</style>