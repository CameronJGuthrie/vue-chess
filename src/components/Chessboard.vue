<template>
  <div id='Chessboard' class="container">
    <Tile v-for="(pos, index) in buildBoard" v-bind:key="index" :x="pos.x" :y="pos.y"/>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Tile from '@/components/Tile.vue';

export default defineComponent({
  name: 'Chessboard',
  components: {
    Tile
  },
  data() {
    return {

    }
  },
  computed: {
    buildBoard() {
      let coords = [];
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          coords.push({x:x,y:y})
        }
      }
      return coords;
    }
  },  
});
</script>

<style scoped>
  .container {
    display: grid;
    background-color:black;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    gap: 1px;
  }
  .square {
    
  }
</style>