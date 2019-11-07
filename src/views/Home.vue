<template>
  <div class="home">
    <component :is="layout">
      <DashCards />
      <div class="content">
        <div class="all-books">
          <div class="book-rows">
            <book-card v-for="book in allBooks" :key="book.id" :book="book" />
          </div>
        </div>
        <div class="right-reading-list sm-hide">
          <reading-list />
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DashCards from '../components/DashCards.vue';
import BookCard from '../components/cards/BookCard.vue';
import ReadingList from '../components/ReadingList.vue';

export default {
  name: 'home',
  components: {
    DashCards,
    BookCard,
    ReadingList
  },
  beforeCreate() {
    this.$store.dispatch('fetchBooks');
  },
  computed: {
    ...mapGetters(['allBooks']),
    layout() {
      return this.$route.meta.layout;
    }
  }
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
  .book-rows {
    display: -webkit-flex; /* Safari */
    -webkit-flex-wrap: wrap; /* Safari 6.1+ */
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  }
  .right-reading-list {
    width: 20%;
  }
  @media (max-width: 1024px) {
    margin-top: 2rem;
    .all-books {
      width: 100%;
    }
    .right-reading-list {
      display: none;
    }
  }
}
</style>
