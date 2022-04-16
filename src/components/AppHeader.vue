<template>
  <div
    v-bind:class="{'app-header': true, shrink: shrink}"
    @click.stop="drawer = !drawer"
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
    v-model="drawer"
    temporary
    fixed
    app
  >
    <v-list-item
      id="nav-header"
    >
      MOONTOMI
    </v-list-item>
    <v-list-item-subtitle
      id="nav-subheader"
    >
      CONTROLLER
    </v-list-item-subtitle>

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
</template>

<script> 
export default {
  data() {
    return {
      drawer: false,
      shrink: false,
      items: [
        { title: "HOME", icon: "mdi-home", path: "/" },
        { title: "REVIEW", icon: "mdi-newspaper-variant-outline", path: "/reviews"},
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
  }
}
</script>

<style scoped>
@font-face {
  font-family: "BayatersStamp";
  src: url("../fonts/BayatersStampdemo-51PB8.ttf") format("truetype");
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
  font-family: "BayatersStamp";
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

#nav-header {
  font-family: "BayatersStamp";
  font-weight: 500;
  font-size: 25px;
}

#nav-subheader {
  font-family: "BayatersStamp";
  margin: 5px;
  margin-top: -10px;
  margin-left: 16px;
  margin-bottom: 10px;
}

#nav-title {
  padding: 1px;
  padding-left: 10px;
  margin-top: 3px;
}

.shrink {
  height: 50px;
  padding: 5px;
  font-size:30px;
  transition: 0.3s;
}
</style>
