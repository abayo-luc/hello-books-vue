<template>
  <component :is="layout">
    <div class="profile-container">
      <div class="section personal-info">
        <div class="section title">
          <h3>Personal Information</h3>
        </div>
        <div class="section-content row">
          <img :src="user.profile.avatar" alt="th" class="user-avatar" />
          <div class="info">
            <p>{{ user.profile.email }}</p>
            <input
              type="file"
              id="upload-avatar"
              accept="image/png, image/jpeg"
              @change="upload($event.target.files)"
            />
          </div>
        </div>
      </div>
      <div class="account-information">
        <div class="section title">
          <h3>Acount information</h3>
          <h4>
            Update at:
            <span>{{ new Date(user.profile.updated_at).toDateString() }}</span>
          </h4>
          <div class="edit-toggle">
            <button class="edit-btn" @click="toggleEdit" id="toggle-edit-btn">
              <img :src="icon" class="icon" />
            </button>
          </div>
        </div>
        <div class="section" v-if="editing">
          <edit-profile :profile="user.profile" :toggleEdit="toggleEdit" />
        </div>

        <div class="section-content" v-else>
          <div class="info">
            <p class="user-info">
              <span>First name:</span>
              {{ user.profile.name || '....'}}
            </p>
            <p class="user-info">
              <span>Phone:</span>
              {{ user.profile.phone_number || '....' }}
            </p>
            <p class="user-info">
              <span>Address:</span>
              {{ user.profile.address || '....' }}
            </p>
            <div class="bio">
              <h4>Bio:</h4>
              <p v-html="user.profile.bio"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </component>
</template>

<script>
import { mapState } from 'vuex';
import EditProfile from '../components/EditProfile.vue';
import Icons from '../assets/icons';
import uploader from '../utils/upload';

export default {
  name: 'Profile',
  components: {
    EditProfile
  },
  data() {
    return {
      icon: Icons.edit,
      editing: false
    };
  },
  computed: {
    ...mapState(['user']),
    layout() {
      return this.$route.meta.layout;
    }
  },
  methods: {
    toggleEdit() {
      this.editing = !this.editing;
      this.icon = this.editing ? Icons.close : Icons.edit;
    },
    async upload(file) {
      try {
        const { url } = await uploader(file);
        this.$store.dispatch('updateImage', url);
      } catch (error) {
        this.$notify({
          title: 'Uploading image fialed',
          text: error.message,
          type: 'error'
        });
      }
    }
  }
};
</script>

<style lang="scss">
.profile-container {
  width: 70%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  margin-bottom: 5em;
  .section {
    padding: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .personal-info {
    padding-left: 0px;
  }
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-weight: 400;
    }
    h4 {
      font-size: 13px;
      margin: 0 15px;
      span {
        font-weight: 200;
      }
    }
  }
  .spaced-row {
    margin: 0;
    padding: 0;
    justify-content: space-between;
    align-items: flex-start;
  }
  .section-content {
    padding: 15px;
    img.user-avatar {
      height: 90px;
      width: 90px;
      border-radius: 50%;
      margin: 15px;
    }
    p.user-info {
      font-size: 14px;
      margin-bottom: 5px;
      span {
        font-weight: bolder;
      }
    }
    .bio {
      margin-top: 15px;
      width: 75%;
      text-align: justify;
      h4 {
        margin-bottom: 15px;
      }
    }
  }
  .card {
    padding: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    width: 45%;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    transition: 0.3s;
  }
  .account-info {
    justify-content: space-between;
    align-items: flex-start;
  }
  form {
    margin-right: 15px;
    .input {
      width: 48%;
    }
  }
  .edit-toggle {
    button {
      all: unset;
      cursor: pointer;
    }
    img {
      height: 32px;
      margin: 0;
    }
    float: right;
  }
}
</style>
