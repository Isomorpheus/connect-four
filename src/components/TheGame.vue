<template>
  <div class="grid"></div>
</template>

<script>
export default {
  name: 'TheGame', // You just lost it
  components: {},
  props: {
    winCheckStrategy: Function
  },
  data: () => ({}),
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
}
</style>
