<template>
  <nav>
    <ul>
      <router-link tag="li" to="/">Home</router-link>
      <router-link tag="li" to="/insights">Insights</router-link>
      <router-link tag="li" to="/timeline">Timeline</router-link>
    </ul>
  </nav>
</template>

<script>
export default {}
</script>

<style>
nav {
  position: fixed;
  bottom: 0;
  width: 100%;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav li {
  flex: 1;
  padding: 1em;
}

nav li:not(:last-child) {
  border-right: 1px solid #999;
}
</style>
