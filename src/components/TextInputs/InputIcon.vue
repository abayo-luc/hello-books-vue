<template>
  <div class="input-icon">
    <img :src="icon" class="icon" />
    <input :type="type" :placeholder="placeholder" :name="name" />
  </div>
</template>

<script>
import Icons from '../../assets/icons/index';

export default {
  name: 'InputIcon',
  props: {
    iconName: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    onChangeText: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      icon: Icons[this.iconName]
    };
  }
};
</script>

<style lang="scss" scoped>
.input-icon {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border: 1px solid #ccc;
  background-color: #ffff;
  padding: 0px 5px;
  border-radius: 5px;
  align-items: center;
  width: 100%;
  margin: 15px 0px;
  img {
    height: 23px;
  }
  input {
    border: none;
    height: 38px;
    font-size: 14px;
    padding-left: 5px;
    width: 100%;
    &:focus {
      .input-icon & {
        border: 1px solid #000;
      }
    }
  }
}
</style>
