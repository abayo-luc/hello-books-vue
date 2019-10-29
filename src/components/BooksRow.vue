<template>
  <div class="row">
    <book-card v-for="book in books" :key="book.id" :book="book" />
  </div>
</template>

<script>
import BookCard from './cards/BookCard.vue';

export default {
  name: 'BooksRow',
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  components: {
    BookCard,
  },
};
</script>

<style scoped>
</style>
