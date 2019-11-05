<template>
  <div id="app">
    <notifications group="foo" style="width: 300px; top: 5px; right: 0px;" />
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app'
};
</script>
<style lang="scss" >
@import url("https://fonts.googleapis.com/css?family=Lobster&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 15px;
}

.dark-card {
  background-color: rgb(35, 33, 38);
  color: #fff;
}
.icon {
  height: 20px;
  margin: 2px;
  @media (min-width: 320px) and (max-width: 480px) {
    height: 10px;
    margin: 1px;
  }
}
.col-45 {
  width: 45%;
}
.sm-hide {
  display: block;
  @media (max-width: 1024px) {
    display: none;
  }
}
.danger {
  color: #ff704d;
}

.auth-link p {
  font-size: 14px;
  color: #546b81;
  align-items: center;
}
h2.form-title {
  margin-bottom: 18px;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: -0.5px;
  font-weight: 600;
  color: #294661;
}
a.link {
  text-decoration: none;
  color: rgb(93, 207, 212);
  &:hover {
    font-style: italic;
  }
}
.auth-form {
  width: 60%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .auth-link {
    align-self: center;
  }
  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    width: 70%;
  }
  @media (max-width: 767px) {
    width: 90%;
  }
}
</style>
