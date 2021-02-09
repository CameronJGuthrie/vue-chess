<template>
  <div id='Tile' :style="'background-color:' + tileColour">
    <!-- TODO <Piece v-if="this.hasPiece()" :piece="piece"/> -->
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
    tileColour(): string {
      return ((this.$props.x % 2) === (this.$props.y % 2)) ?
       'black':
       'white';
    },
  },
  methods: {
    hasPiece(): boolean {
      return this.$props.piece !== undefined;
    }
  }
});
</script>

<style scoped>

</style>