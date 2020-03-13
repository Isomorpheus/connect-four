<template>
  <div id="app">
    <Modal :show-modal-prop="mod">modal</Modal>
    <div v-if="gameState === 'game over'">
      <h1 v-if="winner">Game over player {{ winner }} wins</h1>
      <h1 v-else-if="winner">Game over draw</h1>
      <button @click="newGame">play again</button>
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
import Modal from './components/Modal'
import { SmartCheckWinStrategy } from './services'

export default {
  name: 'App',
  components: {
    TheGame,
    Modal
  },
  data: () => ({
    gameActive: false,
    winner: '',
    mod: false,
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
    winner() {
      this.mod = true
    },
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
    ...mapActions([types.SET_GAMESTATE_TO_WIN, types.INIT_BOARD]),
    setGameStatetoWin(w) {
      this.SET_GAMESTATE_TO_WIN(w)
      this.winner = w.player

      this.mod = true
    },
    newGame() {
      this.INIT_BOARD()
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
