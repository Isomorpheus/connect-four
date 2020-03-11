<template>
  <div class="grid">
    <div
      v-for="(column, i) in transposedBoard"
      :key="'r' + i"
      class="boardColumn"
    >
      <div class="cell topCell" @click="onClickCell(`${i}`)">c {{ i }}</div>

      <div
        v-for="(cell, ic) in column.reverse()"
        :key="'c' + ic"
        class="cell"
        :class="`color_${cell}`"
        @click="onClickCell(`${i}`)"
      >
        {{ cell }}
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
    ...mapState(['board']),
    transposedBoard() {
      return transpose(this.board)
    }
  },
  methods: {
    ...mapActions([types.PICK_TILE]),
    onClickCell(c) {
      console.log(c)
      this.PICK_TILE(c)
      //send new board to winnings
      // this.winCheckStrategy(this.board)
      this.doWeHaveAWinner()
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

<style lang="scss" scoped>
.grid {
  margin: 2rem auto;
  padding-top: 1rem; // space for indicator
  position: relative;
  display: grid;
  grid-template-areas:
    'header header header'
    'left main right'
    'footer footer footer';
  grid-template-rows: auto 1fr 1fr 1fr 1fr 1fr 1fr 1fr auto;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  .boardColumn {
    .cell {
      display: flex;
      background: #eee;
      width: 100%;
      height: 100px;
      align-items: center;
      justify-content: center;
      &:hover {
        background: #ddd;
      }
      &.topCell {
        background: #fff;
        &:hover {
          background: #ddd;
        }
      }
      &.topCell:hover ~ .cell {
        background: #ddd;
      }
    }
    .color_1 {
      background: rgb(23, 157, 247);
    }
    .color_2 {
      background: rgb(240, 220, 67);
    }
  }
}
</style>
