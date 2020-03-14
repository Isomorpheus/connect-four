<template>
  <div id="app">
    <Modal :show-modal-prop="modal" :winner="winner" @showModal="modHandler">
      <div v-if="gameState === 'game over'">
        <h1 v-if="winner === 1">Awesome! You've won this one</h1>

        <h1 v-if="winner === 2">You've lost this one</h1>
        <h1 v-else-if="winner === 0">Draw</h1>
        <button class="button bouncy" @click="newGame">
          Play again
        </button>
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
import { SmartCheckWinStrategy, sizes } from './services'

export default {
  name: 'App',
  components: {
    TheGame,
    Modal
  },
  data: () => ({
    gameActive: false,
    modal: false,
    tester: false,
    color: {
      0: 'rgba(240, 240, 240, 0.8)',
      1: 'rgb(0, 177, 242)',
      2: 'rgb(252, 207, 26)'
    }
  }),
  computed: {
    ...mapState(['gameState', 'activePlayer', 'winner']),
    SmartCheckWinStrategy: () => SmartCheckWinStrategy
  },
  watch: {
    '$screen.width'() {
      this.resize()
    },
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
  mounted() {
    this.resize()
  },
  methods: {
    ...mapActions([types.SET_GAMESTATE_TO_WIN, types.INIT_BOARD]),
    resize() {
      this.$root.$el.style.setProperty('--base-unit', sizes(this.$screen))
    },
    setGameStatetoWin(w) {
      this.SET_GAMESTATE_TO_WIN(w)
      this.$root.$el.style.setProperty('--primary', this.color[w.player])
      this.modal = true
    },
    newGame() {
      this.$refs.TheGame.newGameAni()
      this.$root.$el.style.setProperty('--primary', this.color[1])
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
  --secundary: rgb(252, 207, 26);
  --base-unit: 15vh;
}
#app {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: var(--primary);
  font-family: 'Hepta Slab', 'Times New Roman', Times, serif;
  transition: 1s;
}
body {
  background: var(--primary);
  transition: 1s;
  padding: 0;
  margin: 0;
}
</style>
