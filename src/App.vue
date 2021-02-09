<template>
  <div id="app">
    <Chess/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chess from '@/components/Chess.vue';

export default defineComponent({
  name: 'App',
  components: {
    Chess
  }
})

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #808080;
}
</style>
