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
    SideNav
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: row;
  margin-top: 4rem;
  .side-nav {
    width: 15%;
  }
  .container {
    width: 85%;
    margin-top: 2em;
  }
  @media (max-width: 1024px) {
    .side-nav {
      display: none;
      width: 0;
    }
    .container {
      width: 100%;
    }
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin-top: 3rem;
  }
}
</style>
