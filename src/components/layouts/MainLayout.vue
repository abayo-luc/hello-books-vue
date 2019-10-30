<template>
  <div class="user-dashboard">
    <TopNav />
    <div class="main-container">
      <SideNav />
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from '../navs/TopNav.vue';
import SideNav from '../navs/SideNav.vue';

export default {
  name: 'MainLayout',
  components: {
    TopNav,
    SideNav,
  },
};
</script>

<style lang="scss" scoped>
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
</style>
