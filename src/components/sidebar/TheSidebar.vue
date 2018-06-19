<template>
  <div :class="{ open }" class="sidebar">
    <the-logo class="is-hidden-desktop" white></the-logo>
    <div @click="toggle" :class="{ open }" class="backdrop is-hidden-desktop"></div>
    <the-menu></the-menu>
  </div>
</template>

<script>
import TheMenu from './TheMenu'
import TheLogo from '../TheLogo'

export default {
  components: {
    TheMenu,
    TheLogo
  },
  data: () => ({
    open: false
  }),
  methods: {
    toggle () {
      this.open = !this.open
    }
  }
}
</script>

<style scoped>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100vw + 286px);
    height: 100vh;
    background: black;
    z-index: -1;
    transition: opacity 0.3s ease;
    opacity: 0;
    pointer-events: none;
  }
  .backdrop.open {
    opacity: 0.3;
    pointer-events: all;
  }
  .sidebar {
    z-index: 10;
    grid-area: sidebar;
    background: #002a47;
    transition: all 0.23s ease;
  }
  .sidebar.open {
    transform: translate3d(0, 0, 0);
  }

  @media screen and (max-width: 1023px) {
    .sidebar {
      padding-top: 2em;
      position: fixed;
      height: 100vh;
      width: 286px;
      transform: translate3d(-287px, 0, 0)
    }
  }
</style>
