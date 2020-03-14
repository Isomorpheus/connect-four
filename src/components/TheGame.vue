<template>
  <div class="grid">
    <div
      v-for="(column, i) in transposedBoard"
      :key="'r' + i"
      class="boardColumn"
      :class="`col_${i}`"
      @mouseover="highLightCol('over', `${i}`)"
      @mouseleave="highLightCol('leave', `${i}`)"
    >
      <div
        v-for="(cell, ic) in column.reverse()"
        id="`c_${i}_${ic}`"
        ref="cell_ref"
        :key="'c' + ic"
        class="cell"
        :class="`color_${cell}`"
        @click="onClickCell(`${i}`)"
      >
        <transition name="expand" @enter="ServerItemEnter"
          ><div
            v-if="cell !== 0"
            :ref="`${i}${ic}`"
            class="item"
            :data-column="`${i}`"
          ></div>
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
        this.aninmateCol(c)
      }
    },
    ServerItemEnter(el) {
      this.aninmateCol(el.dataset.column)
      gsap.from(el, {
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
      gsap.set(collection, {
        background: 'rgba(240, 240, 240, 0.8)'
      })
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
        opacity: 0.1,
        stagger: {
          amount: 0.5,
          from: 'center',
          ease: 'power.easout',
          grid: [7, 6]
        },
        onComplete: this.newGameAni
      })
    },
    aninmateCol(c) {
      const collection = document.querySelectorAll(`.col_${c} .cell`)
      gsap.fromTo(
        collection,
        {
          id: 'colid',
          duration: 0.55,
          background: 'rgba(240, 240, 240, 0.1)',
          stagger: {
            amount: 0.5,
            from: 'start'
          }
        },
        {
          background: 'rgba(240, 240, 240, 0.8)'
        }
      )
    },
    highLightCol(event, c) {

      const collection = document.querySelectorAll(`.col_${c} .cell`)

      if (event === 'over') {
        gsap.fromTo(
          collection,
          {
            duration: 0.25,
            background: 'rgba(240, 240, 240, 0.8)'
          },
          {
            background: 'rgba(255, 255, 255, 0.9)'
          }
        )
      }

      if (event === 'leave') {
        gsap.fromTo(
          collection,
          {
            duration: 0.25,
            background: 'rgba(255, 255, 255, 0.9)'
          },
          {
            background: 'rgba(240, 240, 240, 0.8)'
          }
        )
      }
    }
  }
}
</script>

<style lang="scss">
$base-color: rgb(240, 240, 240);
$col-default: rgba($base-color, 0.8);
$col-default-var: var(--col-def, $col-default);
$color-player-1: rgb(0, 177, 242);
$color-player-2: rgb(252, 207, 26);
$base-unit: 150px;

.grid {
  display: grid;
  grid-gap: 1px;
  grid-template-rows: calc(var(--base-unit, $base-unit) * 6);
  grid-template-columns: repeat(7, var(--base-unit, $base-unit));

  .boardColumn {
    display: grid;
    grid-gap: 1px;
    grid-template-rows: repeat(6, var(--base-unit, $base-unit));
    grid-template-columns: var(--base-unit, $base-unit);
    .cell {
      display: flex;
      background: $col-default-var;
      width: var(--base-unit, $base-unit);
      height: var(--base-unit, $base-unit);
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
        background: $col-default-var;
      }
    }
    .color_1 {
      .item {
        background: $color-player-1;
      }
    }
    .color_2 {
      .item {
        background: $color-player-2;
      }
    }
  }
}
</style>
