<template>
  <div id='Tile' class='tile'>
    <Piece v-if="this.hasPiece()"/>
    X:{{x}} Y:{{y}}
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Piece from '@/components/Piece.vue';


export default defineComponent({
  name: 'Tile',
  data() {
    return {
      
    }
  },
  props: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    piece: {
      type: Piece,
      required: false
    },
  },
  computed: {
    
  },
  methods: {
    getTileColour() {
      return ((this.$props.x % 2) === (this.$props.y % 2)) ?
        '#000000' : // Black
        '#FFFFFF' ; // White
    },
    hasPiece(): boolean {
      return this.$props.piece !== undefined;
    }
  }
});
</script>

<style>
  .tile {
    min-height: 80px;
    max-height: 80px;
    min-width: 80px;
    max-width: 80px;
    background-color:
  }
</style>