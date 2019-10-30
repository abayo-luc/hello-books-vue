<template>
  <div id="app">
    <TopNav />
    <div class="main-container">
      <SideNav />
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import TopNav from './components/navs/TopNav.vue';
import SideNav from './components/navs/SideNav.vue';

export default {
  name: 'app',
  components: {
    TopNav,
    SideNav,
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}
.main-container {
  display: flex;
  flex-direction: row;
  margin-top: 4em;
  .side-nav {
    width: 15%;
  }
  .container {
    width: 85%;
    margin: 15px;
    margin-top: 2em;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin: 15px;
    .side-nav {
      display: none;
    }
  }
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 15px;
}

.dark-card {
  background-color: rgb(35, 33, 38);
  color: #fff;
}
.icon {
  height: 20px;
  margin: 2px;
  @media (min-width: 320px) and (max-width: 480px) {
    height: 10px;
    margin: 1px;
  }
}
</style>
