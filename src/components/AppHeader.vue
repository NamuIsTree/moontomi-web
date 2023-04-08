<template>
  <div
    v-bind:class="{'app-header': true, shrink: shrink}"
  >
  MOONTOMI
    <span
      id="sub-app-header"
      v-show="shrink==false"
    >
      문형규의 토요일, 음악에 미치는 날
    </span>
  </div>
  <v-navigation-drawer
    ref="header-nav"
    v-model="drawer"
    :rail="rail"
    permanent
    touchless="false"

    @mouseenter="rail=false"
    @mouseleave="rail=true"
  >
    <v-list-item
      class="nav-header"
      prepend-avatar="https://moontomi.netlify.app/icons/icon-192x192.png"
      title="MOONTOMI NAVIGATE"
      nav
    ></v-list-item>

    <v-divider></v-divider>

    <v-list-item
      class="nav-title"
      v-for="item in items"
      :key="item.title"
      :to="{path:item.path}"
      :prepend-icon="item.icon"
      :title="item.title"
      :value="item.title"
    ></v-list-item>
  </v-navigation-drawer>
</template>

<script> 
export default {
  data() {
    return {
      drawer: true,
      rail: true,
      shrink: false,
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
    window.addEventListener('scroll', () => {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 50) {
        this.shrink = true;
      } else {
        this.shrink = false;
      }
    });

    window.addEventListener('resize', this.handleResize);

    this.handleResize()
  },
  methods: {
    /* eslint-disable */
    handleResize(event) {
      if (window.innerWidth < 768) {
        this.drawer = false;
      } else {
        this.drawer = true;
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

#app-header-nav-toggle {
  position: fixed;
  border-radius: 50%;
  margin-top: 6px;
  width: 40px;
  height: 40px;
  box-shadow: none;
  z-index: 15;
}

[class*='app-header'] {
  position: fixed;
  z-index: 10;
  text-align: center;
  background-color: #242d3c;
  font-family: "Bayaters Stamp";
  font-size: 40px;
  color: aliceblue;
  padding: 10px;
  top: 0;
  height: 90px;
  width: 100%;
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.295, 0.695, 0.290, 1.005);
}

#sub-app-header {
  display: block;
  font-weight: 600;
  margin-top: -10px;
  font-size: 15px;
}

.nav-header {
  font-family: "Bayaters Stamp";
  font-size: 20px;
  font-weight: 500;
}

.nav-title {
  font-family: "LINE Seed";
}

.shrink {
  height: 50px;
  padding: 5px;
  font-size:30px;
  transition: 0.3s;
}
</style>
