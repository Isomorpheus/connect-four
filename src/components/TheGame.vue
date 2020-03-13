<template>
  <div class="grid">
    <div
      v-for="(column, i) in transposedBoard"
      :key="'r' + i"
      class="boardColumn"
      :class="`col_${i}`"
    >
      <div
        v-for="(cell, ic) in column.reverse()"
        ref="cell_ref"
        :key="'c' + ic"
        class="cell"
        :class="`color_${cell}`"
        @click="onClickCell(`${i}`)"
      >
        <transition name="expand" @enter="enter"
          ><div v-if="cell !== 0" :ref="`${i}${ic}`" class="item"></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import gsap from 'gsap'

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
    ...mapState(['isLoading', 'board', 'gameState', 'activePlayer', 'winner']),
    transposedBoard() {
      return transpose(this.board)
    }
  },
  watch: {
    transposedBoard() {
      this.doWeHaveAWinner()
    }
  },
  mounted() {
    this.newGameAni()
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
        this.aninmatedCol(c)
      }
    },
    enter(e) {
      gsap.from(e, {
        duration: 0.5,
        scale: 0.4,
        y: -500,
        ease: 'bounce'
      })
    },
    doWeHaveAWinner() {
      const winner = this.winCheckStrategy(this.board)

      if (winner > 0) {
        this.$emit('win', { player: winner })
      }
    },
    newGameAni() {
      const collection = this.$refs.cell_ref
      gsap.from(collection, {
        duration: 0.55,
        scale: 0.2,
        opacity: 0,
        stagger: {
          amount: 0.5,
          from: 'center',
          ease: 'power.easout',
          grid: [7, 6]
        }
      })
    },
    clearGameAni() {
      const collection = this.$refs.cell_ref
      gsap.to(collection, {
        duration: 0.5,
        scale: 0.2,
        opacity: 0,
        stagger: {
          amount: 0.5,
          from: 'center',
          ease: 'power.easout',
          grid: [7, 6]
        },
        onComplete: this.newGameAni
      })
    },
    aninmatedCol(c) {
      const collection = document.querySelectorAll(`.col_${c} .cell`)
      gsap.from(collection, {
        duration: 0.45,
        background: 'rgba(220, 220, 220, 0.8)',
        stagger: {
          amount: 0.5,
          from: 'start'
        }
      })
    }
  }
}
</script>

<style lang="scss">
.expand-transition {
  transition: all 0.9s ease;
  height: 30px;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}
.expand-enter,
.expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}
.grid {
  margin: 2rem auto;
  padding-top: 1rem; // space for indicator
  position: relative;
  display: grid;
  grid-gap: 1px;
  grid-template-rows: repeat(6, var(--base-unit, 150px));
  grid-template-columns: repeat(7, var(--base-unit, 150px));

  .boardColumn {
    .cell {
      display: flex;
      background: var(--background-light, rgba(240, 240, 20, 0.8));
      width: var(--base-unit, 150px);
      height: var(--base-unit, 150px);
      border-radius: 10%;
      align-items: center;
      justify-content: center;
      .item {
        display: flex;
        height: 95%;
        width: 95%;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #ddd;
        opacity: 0.9;
      }
      &:hover {
        background: #ddd;
      }
      &.topCell {
        background: #fff !important;
        &:hover {
          border-radius: 50%;
          background: var(--primary) !important;
        }
      }
      &.topCell:hover ~ .cell {
        background: #ddd;

        &.color_1 {
          border-radius: 5%;
          background: rgba(23, 157, 247, 0.9);
        }
        &.color_2 {
          border-radius: 50%;
          background: rgba(#fccf1a, 0.9);
        }
      }
    }
    .color_1 {
      .item {
        background: rgb(23, 157, 247);
      }
    }
    .color_2 {
      .item {
        background: rgba(#fccf1a, 0.9);
      }
    }

    &:hover > *:not(:hover) {
      background: #ddd;
      .topCell {
        background: #333;
      }
    }
  }
  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @keyframes bounceInDown {
    from,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -3000px, 0);
      transform: translate3d(0, -3000px, 0);
    }

    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }

    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }

    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .bounceInDown {
    -webkit-animation-name: bounceInDown;
    animation-name: bounceInDown;
  }
}
</style>
