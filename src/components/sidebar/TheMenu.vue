<template>
  <ul class="menu">
    <router-link @click.native="$parent.toggle" tag="li" :to="item.to" v-for="item in items" class="menu-item" :key="item.to.name">
      <b-icon :icon="item.icon" size="is-small"></b-icon>
      <span class="menu-text">
        {{ item.text }}
      </span>
    </router-link>
  </ul>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        text: 'Home',
        icon: 'area-chart',
        to: {
          name: 'home'
        }
      }
    ]
  })
}
</script>

<style lang="scss">
  .menu {
    padding-top: 2em;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .menu-item {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 2em;
    height: 3em;
    color: #eaeaea;
  }

  .menu-text {
    margin-left: 1em;
  }

  .menu-item.router-link-active {
    background: #1f4e84;
    font-weight: bold;
    &::after {
      content: "";
      width: 8px;
      height: 8px;
      position: fixed;
      left: 220px;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid #1f4e84;
    }
  }
</style>
