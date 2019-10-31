<template>
  <div class="top-nav">
    <div class="brand-holder">
      <brand class="short-brand" />
    </div>
    <div class="search-input">
      <input type="text" name="search" placeholder="Search by name, genre, etc..." />
    </div>
    <div class="user-profile">
      <div class="avatar">
        <img src="../../assets/user.jpg" />
      </div>
      <div class="name">
        <p>Luc Abayo</p>
      </div>
    </div>
  </div>
</template>
<script>
import Brand from '../Brand.vue';

export default {
  name: 'TopNav',
  components: {
    Brand,
  },
};
</script>
<style lang="scss" scoped>
.top-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 100;
  overflow: hidden;
  -webkit-box-shadow: 0 8px 6px -6px #666666;
  -moz-box-shadow: 0 8px 6px -6px #666666;
  box-shadow: 0 8px 6px -6px #666666;
  padding: 5px 10px;
  .search-input {
    width: 40%;
    justify-content: center;
    input {
      width: 100%;
      border: 1px solid #fff;
      background-color: rgba(204, 204, 204, 0.4);
      padding: 5px 15px;
      height: 36px;
      border-radius: 5px;
    }
  }
  @media (min-width: 320px) and (max-width: 480px) {
    display: flex;
    flex-direction: row;
    padding: 0px;
    .search-input {
      width: 65%;
      margin: 15px 0px;
    }
    .user-profile {
      width: 10%;
      justify-self: flex-end;
      .avatar img {
        height: 1.8em;
        justify-self: flex-end;
      }
      .name {
        display: none;
      }
    }
  }
}
.user-profile {
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  .name {
    font-size: 0.8em;
    font-weight: bold;
  }
  .avatar img {
    margin: 0.5em;
    height: 2.5em;
    border-radius: 50%;
  }
}
</style>
