<template>
  <div id="mod">
    <transition name="fade" appear>
      <div
        v-if="showModalProp"
        class="modal-overlay"
        @click="closeStartNew"
      ></div>
    </transition>
    <transition name="pop" appear>
      <div v-if="showModalProp" class="modal" role="dialog">
        <p>
          <span>G</span><span>A</span><span>M</span><span>E</span> <br /><span
            >O</span
          >
          <span>V</span><span>E</span><span>R</span>
        </p>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    showModalProp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  watch: {
    showModalProp(d) {
      this.showModal = true
    }
  },
  methods: {
    closeStartNew() {
      this.$emit('showModal', [false, 'new game'])
    }
  }
}
</script>

<style>
.modal {
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: fit-content;
  height: fit-content;
  max-width: 22em;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #fff;
  z-index: 999;
  transform: none;
}
.modal h1 {
  margin: 0 0 1rem;
}

.modal-overlay {
  content: '';
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: var(--primary, #333);
  opacity: 0.6;
  cursor: pointer;
}

/* ---------------------------------- */

button {
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #000;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  color: #000;
  text-align: center;
  transition: all 0.2s;
}
button:hover {
  color: #000000;
  background-color: #ffffff;
}
@media all and (max-width: 30em) {
  button {
    display: block;
    margin: 0.4em auto;
  }
}
.bouncy {
  animation: bouncy 5s infinite linear;
  position: relative;
}
@keyframes bouncy {
  0% {
    top: 0em;
  }
  40% {
    top: 0em;
  }
  43% {
    top: -0.9em;
  }
  46% {
    top: 0em;
  }
  48% {
    top: -0.4em;
  }
  50% {
    top: 0em;
  }
  100% {
    top: 0em;
  }
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}

/**  fontaninmation */

@font-face {
  font-family: 'Hepta Slab';
  src: url('/fonts/HeptaSlabGX.ttf') format('truetype');
}

p {
  font-family: 'Hepta Slab';
  font-size: 7vh;
  font-variation-settings: 'wght' 0;
  text-align: center;
}

p span:nth-child(1) {
  animation: weighted 2.1s infinite ease-in-out;
  animation-delay: calc(0 * 0.08s);
}

p span:nth-child(2) {
  animation: weighted 2.1s infinite ease-in-out;
  animation-delay: calc(1 * 0.08s);
}

p span:nth-child(3) {
  animation: weighted 2.1s infinite ease-in-out;
  animation-delay: calc(2 * 0.08s);
}

p span:nth-child(4) {
  animation: weighted 2.1s infinite ease-in-out;
  animation-delay: calc(3 * 0.08s);
}

p span:nth-child(5) {
  animation: weighted 2.1s infinite ease-in-out;
  animation-delay: calc(4 * 0.08s);
}

p span:nth-child(6) {
  animation: weighted 2.1s infinite ease-in-out;
  animation-delay: calc(5 * 0.08s);
}

p span:nth-child(7) {
  animation: weighted 2.1s infinite ease-in-out;
  animation-delay: calc(6 * 0.08s);
}

p span:nth-child(8) {
  animation: weighted 2.1s infinite ease-in-out;
  animation-delay: calc(7 * 0.08s);
}

p span:nth-child(9) {
  animation: weighted 2.1s infinite ease-in-out;
  animation-delay: calc(8 * 0.08s);
}

@keyframes weighted {
  0% {
    font-variation-settings: 'wght' 0;
  }
  50% {
    font-variation-settings: 'wght' 1000;
  }
  100% {
    font-variation-settings: 'wght' 0;
  }
}
</style>
