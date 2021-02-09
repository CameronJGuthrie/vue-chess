<template>
  <div>
    
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
// import Piece, { King, Queen } from '@/scripts/Pieces';

export default defineComponent({
  name: 'Piece',
  props: {
    piece: {
      type: Object,
      required: true
    }
  },
  methods: {
    getImage() {
      
    }
  }
});
</script>

<style scoped>

</style>