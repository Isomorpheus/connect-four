<template>
  <div id="app">
    <div v-if="gameState === 'game over'">
      <h1 v-if="winner">Game over player {{ winner }} wins</h1>
      <h1 v-else-if="winner">Game over draw</h1>
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
    winner: '',
    color: {
      1: 'rgb(0, 177, 242)',
      2: '#fccf1a'
    }
  }),
  computed: {
    ...mapState(['gameState', 'activePlayer']),
    SmartCheckWinStrategy: () => SmartCheckWinStrategy
  },
  watch: {
    activePlayer() {
      if (this.activePlayer !== '-' && !this.gameState.includes('game over')) {
        this.$root.$el.style.setProperty(
          '--primary',
          this.color[this.activePlayer]
        )
      }
    }
  },
  methods: {
    ...mapActions([types.SET_GAMESTATE_TO_WIN]),
    setGameStatetoWin(w) {
      this.SET_GAMESTATE_TO_WIN(w)
      this.winner = w.player
    }
  }
}
</script>

<style lang="scss">
:root {
  --primary: rgb(0, 177, 242);
  --secundary: #fccf1a;
}
#app {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto;
  background: var(--pimary);
}
</style>
