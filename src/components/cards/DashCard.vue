<template>
  <div
    class="dash-card"
    :style="{backgroundImage: 'url(\'' + require('../../assets/' + img ) + '\')'}"
  >
    <div class="card-content">
      <p class="title">
        <span class="long">{{title}}</span>
        <span class="short">{{shortTitle}}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DashCard',
  props: {
    title: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    shortTitle: {
      type: String,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
.dash-card {
  border-radius: 15px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
  transition: 0.3s;
  width: 23%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 18px 0 rgba(0, 0, 0, 0.2);
  }
  .card-content {
    height: 8em;
    display: flex;
    padding: 15px;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    border-radius: 15px;
    p.title {
      text-transform: capitalize;
      font-weight: 600;
      span.long {
        display: block;
      }
      span.short {
        display: none;
      }
    }
  }
  @media (max-width: 480px) {
    .card-content {
      height: 5em;
      p.title {
        span.long {
          display: none;
        }
        span.short {
          display: block;
        }
      }
    }
  }
}
</style>
