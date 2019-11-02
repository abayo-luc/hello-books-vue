<template>
  <div class="side-nav">
    <div class="pages">
      <router-link v-for="(page, index) in pages" :key="index" :to="page.path">
        <div class="single-item" :class="{active: page.active}">
          <img :src="page.icon" class="icon" />
          <span>{{page.name}}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import Icons from '../../assets/icons/index';

export default {
  name: 'SideNav',
  data() {
    return {
      pages: [
        {
          path: '/',
          name: 'Home',
          icon: Icons.Home
        },
        {
          path: '/search',
          name: 'Browse',
          icon: Icons.Search
        },
        {
          path: '/authors',
          name: 'Authors',
          icon: Icons.Avatar
        }
      ]
    };
  },
  created() {
    const currentPage = this.pages.find(page => page.path === this.$route.path);
    currentPage.active = true;
  },
  watch: {
    $route(to, from) {
      this.pages = this.pages.map((page) => {
        switch (page.path) {
          case to.path:
            return { ...page, active: true };
          case from.path:
            return { ...page, active: false };
          default:
            return page;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.side-nav {
  margin: 2em;
  margin-top: 5em;
  a {
    color: inherit;
    text-decoration: none;
  }
  @media (max-width: 1024px) {
    display: none;
  }
}
.single-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  &.active {
    span {
      border-bottom: 1px solid rgb(35, 33, 38);
      padding-bottom: 3px;
    }
  }
  img {
    margin: 10px;
  }
}
</style>
