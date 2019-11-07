<template >
  <div class="book-card">
    <img v-lazy="book.url" class="book-cover" />
    <div class="book-content">
      <h2 class="rating">6.8</h2>
      <h3 class="book-title">{{book.title}}</h3>
      <p class="author">Joanne Ramos</p>
      <div class="category">
        <p>Novel</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    book: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.book-card {
  display: flex;
  flex-direction: row;
  width: 17rem;
  margin: 15px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  .book-content {
    flex-direction: column;
    align-self: center;
    margin: 0px 5px;
    .rating {
      color: rgb(215, 222, 224);
      margin-bottom: 5px;
    }
    h3.book-title {
      font-size: 16px;
      margin-bottom: 5px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    p.author {
      font-size: 12px;
      color: rgb(171, 171, 180);
    }
    .category {
      padding: 3px;
      margin: 5px 0px;
      width: 70%;
      font-size: 11px;
      background-color: rgba(93, 207, 212, 0.2);
      text-align: center;
      border-radius: 15px;
    }
  }
  img.book-cover {
    height: 9em;
    border-radius: 5px;
  }
  img[lazy="loading"] {
    height: 10em;
    border-radius: 5px;
  }
  @media (min-width: 364px) and (max-width: 1024px) {
    flex-direction: column;
    width: 10em;
    align-items: center;
    margin: 3%;
    position: relative;
    .book-content {
      display: flex;
      align-items: center;
      justify-content: center;
      h3.book-title {
        text-align: center;
      }
    }
  }
  @media (max-width: 364px) {
    width: 100%;
    margin: 10px;
    height: 7em;
    img.book-cover {
      height: 7em;
    }
  }
}
</style>
