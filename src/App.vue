<template>
  <div id="app">
    <TheGame :win-check-strategy="SmartCheckWinStrategy" />
  </div>
</template>

<script>
import TheGame from './components/TheGame.vue'
import { SmartCheckWinStrategy } from './services'

export default {
  name: 'App',
  components: {
    TheGame
  },
  data: () => ({}),
  computed: {
    SmartCheckWinStrategy: () => SmartCheckWinStrategy
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
