<template>
  <div class="grid">
    <div></div>
    <div
      v-for="(column, i) in transposedBoard"
      :key="'r' + i"
      class="boardColumn"
    >
      <div class="cell topCell" :class="`tc_${activePlayer}`" @click="onClickCell(`${i}`)">c {{ i }}</div>

      <div
        v-for="(cell, ic) in column.reverse()"
        :key="'c' + ic"
        class="cell"
        :class="`color_${cell}`"
        @click="onClickCell(`${i}`)"
      >
        {{ `${i}${ic}` }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { transpose } from '../services/utils'
import types from '../store/typings'
export default {
  name: 'TheGame',
  components: {},
  props: {
    winCheckStrategy: {
      type: Function,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    ...mapState(['isLoading', 'board', 'gameState', 'activePlayer']),
    transposedBoard() {
      return transpose(this.board)
    }
  },
  watch: {
    transposedBoard(tp) {
      console.log('change', tp)
      this.doWeHaveAWinner()
    }
  },
  methods: {
    ...mapActions([types.PICK_TILE]),
    onClickCell(c) {
      if (
        this.gameState === 'play' &&
        this.activePlayer === 1 &&
        !this.isLoading
      ) {
        this.PICK_TILE(c)
      }
    },
    doWeHaveAWinner() {
      const winner = this.winCheckStrategy(this.board)

      if (winner > 0) {
        this.$emit('win', { player: winner })
      }
    }
  }
}
</script>

<style lang="scss">
.grid {
  margin: 2rem auto;
  padding-top: 1rem; // space for indicator
  position: relative;
  display: grid;
  grid-template-rows: auto repeat(7, 150px) auto;
  grid-template-columns: auto repeat(6, 150px) auto;

  .boardColumn {
    .cell {
      display: flex;
      background: #eee;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      &:hover {
        background: #ddd;
      }
      &.topCell {
        background: #fff;
        &:hover {
          border-radius: 50%;
        background: rgba(23, 157, 247, 0.5);

        }
      }
      &.topCell:hover ~ .cell {
        background: #ddd;

        &.color_1 {
          border-radius: 50%;
          background: rgba(23, 157, 247, 0.5);
        }
        &.color_2 {
          border-radius: 50%;
          background: rgba(240, 220, 67, 0.5);
        }
      }
    }
    .color_1 {
      border-radius: 50%;
      background: rgb(23, 157, 247);
    }
    .color_2 {
      border-radius: 50%;
      background: rgb(240, 220, 67);
    }
  }
}
</style>
