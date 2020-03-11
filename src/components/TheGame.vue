<template>
  <div class="grid">
    <div v-for="(column, i) in transposed" :key="'r' + i" class="boardColumn">
      <div class="cell topCell" @click="onClickCell(`${i}`)">c {{ i }}</div>

      <div
        v-for="(cell, ic) in column.reverse()"
        :key="'c' + ic"
        class="cell"
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
  name: 'TheGame', // You just lost it
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
    transposed() {
      return transpose(this.board)
    }
  },
  mounted() {
    this.winCheckStrategy([
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 2],
      [0, 1, 1, 1, 0, 1, 1],
      [0, 2, 2, 1, 1, 0, 1],
      [0, 0, 2, 0, 0, 0, 1],
      [0, 0, 1, 1, 1, 1, 0]
    ])
  },
  methods: {
    ...mapActions([types.PICK_TILE]),
    onClickCell(c) {
      console.log(c)
      this.PICK_TILE(c)
      //send new board to winnings
      this.winCheckStrategy(this.board)
    },
    doWeHaveAWinner() {
      const winner = 0 // this.winCheckStrategy(rows)
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
        background: #f0f;
      }
    }
  }
}
</style>
