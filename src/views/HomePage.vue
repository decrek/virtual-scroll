<template>
  <div id="app">
    <h1>Virtual scroll demo</h1>
    <virtual-scroll :itemCount="itemCount" :height="height" :get-child-height="getChildHeight">
      <template v-slot:default="slotProps">
        <ul>
          <li v-for="n in slotProps.visibleNodeCount" :key="n + slotProps.startNode" :data-aapje="n + slotProps.startNode" ref="item">
            <router-link :to="`/${n + slotProps.startNode}`">item - {{ n + slotProps.startNode }}</router-link>
          </li>
        </ul>
      </template>
    </virtual-scroll>
  </div>
</template>

<script>
  import VirtualScroll from '@/components/VirtualScroll'

  export default {
    components: {
      VirtualScroll,
    },
    data() {
      return {
        itemCount: 10000,
        height: 1024,
      }
    },
    methods: {
      getChildHeight(i) {
        return 100 + (i % 10)
      }
    }
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
