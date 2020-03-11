<template>
  <div class="grid">
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    ...mapState(['board'])
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
    topRow(c) {
      console.log(c)
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
}
</style>
