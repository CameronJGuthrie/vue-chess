<template>
  <div>
    
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Piece from '@/scripts/Piece';

export default defineComponent({
  name: 'Piece',
  props: {
    Piece: {
      type: Piece,
      required: true
    }

  }
});
</script>

<style scoped>

</style>