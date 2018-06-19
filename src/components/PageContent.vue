<template>
  <div class="wrapper">
    <the-sidebar ref="sidebar"></the-sidebar>
    <the-logo></the-logo>
    <div class="header">
      <span class="is-hidden-desktop mr-1">
        <b-icon
          @click.native="openSidebar"
          icon="bars"
          size="is-medium">
        </b-icon>
      </span>
      <div class="flex grow justify-between align-end container is-fluid">
        <p class="subtitle is-3">{{ title }}</p>
        <slot name="action"></slot>
      </div>
    </div>
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TheSidebar from './sidebar/TheSidebar'
import TheLogo from './TheLogo'

export default {
  components: {
    TheSidebar,
    TheLogo
  },
  props: {
    title: String
  },
  methods: {
    openSidebar () {
      this.$refs.sidebar.toggle()
    }
  }
}
</script>

<style scoped>
.flex {
  display: flex;
}

.grow {
  flex: 1;
}

.align-end {
  align-items: flex-end;
}

.justify-between {
  justify-content: space-between;
}

.mr-1 {
  margin-right: 1em;
}
.wrapper {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  grid-template-areas:
    "logo header"
    "sidebar content"
    ;
  overflow: hidden;
}

.logo {
  grid-area: logo;
  background: #002a47;
  align-items: center;
  justify-content: center;
  display: flex;
  z-index: 2;
}

.page-content {
  grid-area: content;
  overflow-y: auto;
  padding: 2em;
}

.header {
  grid-area: header;
  background: #f5f5f5;
  display: flex;
  align-items: flex-end;
  padding: 12px;
  box-shadow: 0px -10px 18px 4px black;
  z-index: 1;
}

@media screen and (max-width: 1023px) {
  .container {
    margin: 0 1em;
  }
  .wrapper {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
    "header"
    "content"
    ;
  }
  .logo {
    display: none;
  }
}
</style>
