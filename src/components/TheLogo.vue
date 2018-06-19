<template>
  <div class="logo">
    <img class="logo-image" src="@/assets/logo.png" alt="">
    <p class="subtitle is-6"> Firestore Explorer </p>
  </div>
</template>

<script>
export default {
  props: {
    white: Boolean
  }
}
</script>

<style lang="scss">
.logo {
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo-image {
    width: 4em;
  }

  .subtitle {
    color: white;
    margin-top: 1em;
  }

  &.white {
    img {
      filter: brightness(0) invert(1);
    }
  }
}
</style>
