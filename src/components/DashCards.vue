<template >
  <div class="dash-cards">
    <DashCard title="New Books" img="new-books.jpg" />
    <DashCard title="Top books of 2019" img="top.jpg" />
    <DashCard title="Recomendations" img="recomendations.jpg" />
    <DashCard title="Your reading list" img="reading.png" />
  </div>
</template>

<script>
import DashCard from './cards/DashCard.vue';

export default {
  name: 'DashCards',
  components: {
    DashCard,
  },
};
</script>
<style lang="scss" scoped>
.dash-cards {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
