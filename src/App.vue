<template>
  <div id="app">
    <div v-if="gameState === 'game over'">
      <h1>GameOver player {{ winner }} wins</h1>
    </div>
    <TheGame
      :win-check-strategy="SmartCheckWinStrategy"
      @win="setGameStatetoWin"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import types from '@/store/typings'
import TheGame from './components/TheGame.vue'
import { SmartCheckWinStrategy } from './services'

export default {
  name: 'App',
  components: {
    TheGame
  },
  data: () => ({
    gameActive: false,
    winner: ''
  }),
  computed: {
    ...mapState(['gameState']),
    SmartCheckWinStrategy: () => SmartCheckWinStrategy
  },
  methods: {
    ...mapActions([types.SET_GAMESTATE_TO_WIN]),
    setGameStatetoWin(e) {
      this.SET_GAMESTATE_TO_WIN(e)
      console.log('setGameStatetoWin', e)
      this.winner = e.player
    }
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
