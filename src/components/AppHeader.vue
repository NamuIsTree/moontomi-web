<template>
  <div
    v-bind:class="{'app-header': true, shrink: shrink}"
  >
  Header
  </div>
</template>

<script> 
export default {
  data() {
    return {
      shrink: false
    }
  },
  mounted() {
    // var lastScrollTop = 0;
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
[class*='app-header'] {
  display: block;
  position: fixed;
  text-align: center;
  background-color: red;
  top: 0;
  height: 90px;
  width: 100%;
  transition: 0.3s;
  transition-timing-function: cubic-bezier(0.295, 0.695, 0.290, 1.005);
}

.shrink {
  height: 50px;
  background-color: blue;
  transition: 0.3s;
}

</style>
