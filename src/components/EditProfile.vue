<template>
  <form method="post" @submit.prevent="saveProfile(toggleEdit)">
    <div class="row spaced-row">
      <div class="input">
        <input-icon
          name="first_name"
          placeholder="First name"
          type="text"
          :value="user.first_name || ''"
          iconName="user"
          :onChangeText="onChangeText"
        />
      </div>
      <div class="input">
        <input-icon
          name="last_name"
          placeholder="Last name"
          :value="user.last_name || ''"
          type="text"
          iconName="user"
          :onChangeText="onChangeText"
        />
      </div>
    </div>
    <div class="row spaced-row">
      <div class="input">
        <input-icon
          name="phone_number"
          placeholder="Phone"
          type="phone"
          :value="user.phone_number"
          iconName="phone"
          :onChangeText="onChangeText"
        />
      </div>
      <div class="input">
        <input-icon
          name="address"
          placeholder="Address"
          :value="user.address || ''"
          iconName="address"
          type="address"
          :onChangeText="onChangeText"
        />
      </div>
    </div>
    <div class="bio-container">
      <ckeditor
        :editor="editor"
        v-model="user.bio"
        :config="editorConfig"
        tag-name="textarea"
        :disabled="editorDisabled"
        name="bio"
        @input="onChangeText"
      ></ckeditor>
    </div>
    <div class="buttons">
      <basic-button title="Submit" classes="simple" type="submit" />
    </div>
  </form>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { mapActions } from 'vuex';
import InputIcon from './TextInputs/InputIcon.vue';
import BasicButton from './Buttons/BasicButton.vue';

export default {
  name: 'EditProfile',
  components: {
    InputIcon,
    BasicButton
  },
  props: {
    profile: {
      type: Object
    },
    toggleEdit: {
      type: Function
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorDisabled: false,
      user: {
        ...this.profile
      },
      editorConfig: {
        toolbar: {
          items: ['bold', 'italic', 'link', 'undo', 'redo']
        }
      }
    };
  },
  methods: {
    ...mapActions(['saveProfile']),
    onChangeText(e) {
      let name;
      let value;
      if (!e.target) {
        name = 'bio';
        value = e;
      } else {
        ({ name, value } = e.target);
      }
      this.$store.dispatch('handleProfileEditing', { name, value });
    }
  }
};
</script>
