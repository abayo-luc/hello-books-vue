<template>
  <div class="reading-list">
    <list-header />
    <reading-list-card />
  </div>
</template>
<script>
import ListHeader from './headers/ListHeader.vue';
import ReadingListCard from './cards/ReadingListCard.vue';

export default {
  name: 'ReadingList',
  components: {
    ListHeader,
    ReadingListCard,
  },
};
</script>
<style lang="scss" scoped>
.reading-list {
  position: relative;
  width: 100%;
}
</style>
