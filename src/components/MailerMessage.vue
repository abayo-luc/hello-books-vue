<template>
  <div class="action-details">
    <h2 class="form-title">{{title}}</h2>
    <p class="info">{{description}}</p>
  </div>
</template>

<script>
export default {
  name: 'MailerMessage',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
.action-details {
  text-align: center;
  p.info {
    color: #546b81;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
  }
  a {
    text-decoration: none;
    color: rgba(93, 207, 212, 0.5);
  }
  .auth-link {
    margin-top: 5rem;
    p {
      font-size: 16px;
    }
  }
}
</style>
