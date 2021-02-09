<template>
  <div class="chessboard">
    <div class="grid">
      <Tile class="tile" v-for="(pos, index) in buildBoard" v-bind:key="index" :x="pos.x" :y="pos.y"/>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Tile from '@/components/Tile.vue';
import Chess from '@/scripts/Chess';

export default defineComponent({
  name: 'Chessboard',
  components: {
    Tile
  },
  props: {
    chess: {
      type: Chess,
      required: true
    }
  },
  data() {
    return {

    }
  },
  computed: {
    buildBoard() {
      let coords = [];
      for (let y = 7; y >= 0; y--) {
        for (let x = 0; x < 8; x++) {
          coords.push({x:x,y:y})
        }
      }
      return coords;
    }
  },  
});
</script>

<style scoped>
  .chessboard {
    max-height: 800px;
    max-width: 800px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(8, 100px);
    grid-template-rows: repeat(8, 100px);
    grid-gap: 0px;
  }

  .tile {
    /* center the cell content */
    justify-content: center;
    align-items: center;
    display: flex;
    font-family: Arial;
    font-size: 3rem;
    font-weight: bold;
    background: white;
  }
</style>