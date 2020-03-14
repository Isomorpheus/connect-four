<template>
  <div class="tester">
    <h4>screen</h4>
    <table>
      <tr>
        <td>width</td>
        <td>{{ $screen.width }}</td>
      </tr>
      <tr>
        <td>height</td>
        <td>{{ $screen.height }}</td>
      </tr>
      <tr>
        <td>
          {{ $screen.landscape ? 'landscape' : '' }}
          {{ $screen.portrait ? 'portret' : '' }}
        </td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ResizeMonitor',
  data() {
    return {}
  },
  computed: {
    media() {
      return {
        'is-phone': this.$screen.sm,
        'is-tablet': this.$screen.md,
        'is-desktop': this.$screen.lg,
        'can-touch': this.$screen.touch,
        breakpoint: this.$screen.breakpoint
      }
    }
  }
}
</script>

<style lang="scss">
.tester {
  display: block;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.7);
  z-index: 10;
}
</style>
<docs>
This component only serves for the purpose of testing
   {{ $screen }}
returns screensize information
</docs>
