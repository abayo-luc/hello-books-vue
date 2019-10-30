<template>
  <div class="home">
    <DashCards />
    <div class="content">
      <div class="all-books">
        <books-row v-for="(row, index) in rows" :key="index" :books="row" />
      </div>
      <div class="right-reading-list">
        <reading-list />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DashCards from '../components/DashCards.vue';
import BooksRow from '../components/BooksRow.vue';
import { D3transform } from '../utils/data';
import ReadingList from '../components/ReadingList.vue';

export default {
  name: 'home',
  components: {
    DashCards,
    BooksRow,
    ReadingList,
  },
  data() {
    return {
      rows: [],
      errors: [],
    };
  },
  created() {
    axios
      .get('https://jsonplaceholder.typicode.com/photos?_limit=18')
      .then((res) => {
        this.rows = [...D3transform(res.data)];
      })
      .catch(err => this.error.push(err.message));
  },
};
</script>
<style lang="scss" scoped>
.content {
  margin-top: 5em;
  display: flex;
  flex-direction: row;
  .all-books {
    width: 80%;
  }
  .right-reading-list {
    width: 20%;
  }
}
</style>
