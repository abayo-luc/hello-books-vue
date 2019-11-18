<template>
  <form method="post" @submit.prevent="onSave" id="edit_profile">
    <div class="row spaced-row">
      <div class="input">
        <input-icon
          name="name"
          placeholder="Name"
          type="text"
          :value="user.name || ''"
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
      <basic-button title="Submit" classes="default" type="submit" :disabled="isSaving" />
    </div>
  </form>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { mapGetters } from 'vuex';
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
  computed: mapGetters(['isSaving']),
  methods: {
    onChangeText(e) {
      let name;
      let value;
      if (!e.target) {
        name = 'bio';
        value = e;
      } else {
        ({ name, value } = e.target);
      }
      this.user[name] = value;
    },
    onSave() {
      const data = { user: this.user, callback: this.toggleEdit };
      this.$store.dispatch('saveProfile', data);
    }
  }
};
</script>
