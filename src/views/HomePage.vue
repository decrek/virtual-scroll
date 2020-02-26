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
    created() {
      this.setHeight()
      window.addEventListener('resize', this.onResize)
    },
    destroyed() {
      window.removeEventListener('resize', this.onResize)
    },
    methods: {
      getChildHeight(i) {
        return 100 + (i % 10)
      },
      onResize() {
        this.setHeight()
      },
      setHeight() {
        this.height = document.documentElement.clientHeight
      }
    }
  }
</script>

<style>
  h1 {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }

  li {
    display: flex;
    /*margin-bottom: 50px;*/
  }
  li a {
    width: 100%;
    height: 100px;
    background-color: cornsilk;
    font-size: 1rem;
  }

</style>
