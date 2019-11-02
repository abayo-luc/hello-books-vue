<template >
  <div class="dash-cards">
    <DashCard title="New Books" shortTitle="New" img="new-books.jpg" />
    <DashCard title="Tredning books" shortTitle="Trending" img="top.jpg" />
    <DashCard title="Books for you" shortTitle="For u" img="recomendations.jpg" />
    <DashCard title="My reading list" shortTitle="My list" img="reading.png" />
  </div>
</template>

<script>
import DashCard from './cards/DashCard.vue';

export default {
  name: 'DashCards',
  components: {
    DashCard
  }
};
</script>
<style lang="scss" scoped>
.dash-cards {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0px 15px;
}
</style>
