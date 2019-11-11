<template>
  <div class="top-nav">
    <div class="brand-holder">
      <brand class="short-brand" />
    </div>
    <div class="search-input">
      <input type="text" name="search" placeholder="Search by name, genre, etc..." />
    </div>
    <div class="dropdown">
      <button class="dropdown-btn" @click="toggleDropdown">
        <img src="../../assets/icons/menu.svg" />
      </button>
    </div>
    <div class="dropdown-content" v-show="dropdownVisible">
      <div class="user-profile">
        <img src="../../assets/thumbnail.png" class="user-avatar" />
        <div class="user-info">
          <p class="username">{{currentUser.first_name}} {{currentUser.lastName}}</p>
          <p class="user-email">{{currentUser.email}}</p>
        </div>
      </div>
      <div class="links">
        <ul>
          <li>
            <router-link to="/profile" class="link">Profile</router-link>
          </li>
          <li>Account</li>
          <li>Report</li>
        </ul>
      </div>
      <div class="buttons">
        <basic-button title="Sogn out" classes="simple" :onClick="signoutUser" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Brand from '../Brand.vue';
import BasicButton from '../Buttons/BasicButton.vue';

export default {
  name: 'TopNav',
  components: {
    Brand,
    BasicButton
  },
  data() {
    return {
      dropdownVisible: false
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    signoutUser() {
      const navigate = () => this.$router.replace('/login');
      this.$store.dispatch('handleSignOut', navigate);
    }
  },
  computed: mapGetters(['currentUser'])
};
</script>
<style lang="scss" scoped>
.top-nav {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1;
  overflow: hidden;
  -webkit-box-shadow: 0 8px 6px -6px #546b81;
  -moz-box-shadow: 0 8px 6px -6px #546b81;
  box-shadow: 0 8px 6px -6px #546b81;
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
    .dropdown {
      width: 10%;
      justify-self: flex-end;
      .dropdown-btn img {
        height: 1.8em;
        justify-self: flex-end;
      }
      .name {
        display: none;
      }
    }
  }
  .dropdown {
    display: inline-block;
    justify-content: flex-end;
    position: relative;
    right: 0;
    .name {
      font-size: 0.8em;
      font-weight: bold;
    }
    button {
      all: unset;
      cursor: pointer;
    }
    .dropdown-btn img {
      margin: 0.5em;
      height: 1.6em;
    }
  }
}
.dropdown-content {
  display: flex;
  z-index: 2;
  right: 8px;
  top: 3.8rem;
  position: fixed;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-color: rgba(0, 0, 0, 0.2);
  color: #000;
  width: 300px;
  border-radius: 10px;
  max-height: calc(100vh - 62px - 100px);
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  .user-profile {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #e8eaed;
    padding: 15px;
    .user-info {
      font-size: 13px;
      margin: 15px;
      text-align: center;
      p.username {
        font-weight: bold;
        color: #000;
        font-size: 16px;
      }
      .username {
        font-size: 13px;
        span {
          font-style: italic;
        }
      }
    }
    img.user-avatar {
      width: 80px;
      height: 80px;
      border-radius: 40px;
    }
  }
  .links {
    align-self: flex-start;
    padding: 5px 10px;
    width: 100%;
    border-bottom: 1px solid #e8eaed;
    ul {
      all: unset;
      li {
        padding: 5px;
      }
    }
    .link {
      color: #000;
      &:hover {
        color: #000;
        font-style: normal;
      }
      &.active {
        background-color: #ccc;
      }
    }
  }
  .buttons {
    width: 70%;
  }
}
</style>
