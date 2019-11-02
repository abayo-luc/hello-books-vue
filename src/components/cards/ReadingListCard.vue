<template >
  <div class="reading-list-card dark-card">
    <div class="single-item" v-for="(book, index) in books" :key="index">
      <img src="../../assets/icons/open-book.svg" class="icon" />
      <div class="book-details">
        <p class="book-name">Things Falll Apart</p>
        <p class="book-pages">
          <span>Page &#8470; :</span>1232
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReadingListCard',
  data() {
    return {
      books: [...Array(5).keys()]
    };
  }
};
</script>
<style lang="scss" scoped>
.reading-list-card {
  position: absolute;
  top: 4em;
  border-radius: 20px;
  width: 100%;
  padding: 10px;
  min-height: 10em;
  box-shadow: 0 4px 8px 0 rgba(35, 33, 38, 0.1);
  transition: 0.3s;
  .icon {
    height: 25px;
    margin-right: 10px;
  }
  .single-item,
  .ic-book {
    display: flex;
    flex-direction: row;
  }
  .single-item {
    justify-content: flex-start;
    align-items: center;
    margin: 7.5px 0px;
    p.book-pages {
      font-size: 11px;
      font-style: italic;
      color: #f4f6f8;
      margin-left: 3px;
    }
  }
}
</style>
