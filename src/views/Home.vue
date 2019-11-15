<template>
  <component :is="layout">
    <DashCards />
    <div class="content">
      <div class="all-books">
        <div class="book-rows">
          <book-card v-for="book in allBooks" :key="book.id" :book="book" />
        </div>
        <div v-show="isLoadingMoreBook" class="loading-more">
          <p>
            Loading
            <span class="red">.</span>
            <span class="yellow">.</span>
            <span class="green">.</span>
          </p>
        </div>
      </div>
      <div class="right-reading-list sm-hide">
        <reading-list />
      </div>
    </div>
  </component>
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
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const d = document.documentElement;
      const offset = d.scrollTop + window.innerHeight;
      const height = d.offsetHeight;
      if (offset === height) {
        this.$store.dispatch('handleBookPagination');
      }
    }
  },
  computed: {
    ...mapGetters(['allBooks', 'isLoadingMoreBook']),
    layout() {
      return this.$route.meta.layout;
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
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
  .loading-more {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0px;
    p {
      font-size: 13px;
      font-style: italic;
      @keyframes blink {
        0% {
          opacity: 0.2;
        }

        20% {
          opacity: 1;
        }

        100% {
          opacity: 0.2;
        }
      }
      span {
        animation-name: blink;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        font-size: 16px;
        &.red {
          color: red;
        }
        &.yellow {
          color: yellow;
        }
        &.green {
          color: green;
        }
        &:nth-child(2) {
          animation-delay: 0.2s;
        }
        &:nth-child(3) {
          animation-delay: 0.4s;
        }
      }
    }
  }
}
</style>
