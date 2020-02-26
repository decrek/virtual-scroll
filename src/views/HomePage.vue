<template>
  <div id="app">
    <h1>Virtual scroll demo</h1>
    <ul>
      <li v-for="n in itemCount" :key="n">
        <router-link :to="`/${n}`">item - {{ n}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        itemCount: 10000,
      }
    },
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  li {
    display: flex;
    /*margin-bottom: 50px;*/
  }
  li a {
    width: 100%;
    height: 100px;
    background-color: cornsilk;
  }

</style>
