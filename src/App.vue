<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app',
};
</script>
<style lang="scss" >
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
</style>
