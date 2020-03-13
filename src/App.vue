<template>
  <div id="app">
    <Modal :show-modal-prop="modal" :winner="winner" @showModal="modHandler">
      <div v-if="gameState === 'game over'">
        <h1 v-if="winner === 1">Awesome! You've won this one</h1>

        <h1 v-if="winner === 2">You've lost this one</h1>
        <h1 v-else-if="winner === 0">Draw</h1>
        <button class="button bouncy" @click="newGame">Play again</button>
      </div>
    </Modal>
    <TheGame
      ref="TheGame"
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
    modal: false,
    color: {
      0: '#ddd',
      1: 'rgb(0, 177, 242)',
      2: '#fccf1a'
    }
  }),
  computed: {
    ...mapState(['gameState', 'activePlayer', 'winner']),
    SmartCheckWinStrategy: () => SmartCheckWinStrategy
  },
  watch: {
    winner(w) {
      w !== 0 ? (this.modal = true) : (this.modal = false)
    },
    activePlayer() {
      if (this.activePlayer !== '-' && !this.gameState.includes('game over')) {
        this.$root.$el.style.setProperty(
          '--primary',
          this.color[this.winner === 0 ? this.activePlayer : this.winner]
        )
      }
    }
  },
  methods: {
    ...mapActions([types.SET_GAMESTATE_TO_WIN, types.INIT_BOARD]),
    setGameStatetoWin(w) {
      this.SET_GAMESTATE_TO_WIN(w)
      this.$root.$el.style.setProperty('--primary', this.color[w.player])
      this.modal = true
    },
    newGame() {
      this.$refs.TheGame.newGameAni()
      this.INIT_BOARD()
    },
    modHandler(e) {
      this.modal = e[0]
      if (e[1] === 'new game') {
        this.newGame()
      }
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Hepta Slab';
  src: url('/fonts/HeptaSlabGX.ttf') format('truetype');
}
:root {
  --primary: rgb(0, 177, 242);
  --secundary: #fccf1a;
  --base-unit: 100px;
  --background-light: rgba(200, 200, 200, 0.8);
  --background-ultra-light: rgba(220, 220, 220, 0.8);
}
#app {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto;
  background: var(--pimary);
  font-family: 'Hepta Slab', 'Times New Roman', Times, serif;
}
</style>
