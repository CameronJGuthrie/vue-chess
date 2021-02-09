<template>
  <div id='Chess'>
    <Chessboard/>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Chessboard from '@/components/Chessboard.vue';
import EvaluationFunctions from '@/scripts/EvaluationFunctions';
import Chess from '@/scripts/Chess';

export default defineComponent({
  name: 'Chess',
  data: function () {
    return {
      selectedEvaluationFunction: EvaluationFunctions[0]
    }
  },
  components: {
    Chessboard
  },
  methods: {
    createNewGame() {
      return new Chess(this.selectedEvaluationFunction)
    }
  },
  mounted() {
    // Do nothing
  }
});
</script>

<style scoped>

</style>