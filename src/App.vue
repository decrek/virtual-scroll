<template>
  <div id="app">
    <h1 class="fixed-header">Virtual scroll demo</h1>
    <router-view />
  </div>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 2rem;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    height: 2rem;
  }
</style>
