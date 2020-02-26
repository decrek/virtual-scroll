<template>
  <div :style="{ height: height + 'px', overflow: 'auto' }" ref="container">
    <div
      class="viewport"
      :style="{
    overflow: 'hidden',
  willChange: 'transform',
  height: totalHeight + 'px',
  position: 'relative'
  }"
    >
      <div
        :style="{
          willChange: 'transform',
          transform: `translateY(${offsetY}px)`
        }"
      >
          <slot v-bind:visible-node-count="visibleNodeCount" v-bind:start-node="startNode"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      itemCount: {
        type: Number
      },
      height: {
        type: Number
      },
      getChildHeight: {
        type: Function
      }
    },
    data() {
      return {
        scrollTop: null,
        scrollContainer: null,
        animationFrame: null,
        renderAhead: 20,
      }
    },
    computed: {
      totalHeight() {
        return this.childPositions[this.itemCount - 1] + this.getChildHeight(this.itemCount - 1)
      },
      firstVisibleNode() {
        return findStartNode(this.scrollTop, this.childPositions, this.itemCount)
      },
      startNode() {
        return Math.max(0, this.firstVisibleNode - this.renderAhead)
      },
      lastVisibleNode() {
        return findEndNode(this.childPositions, this.firstVisibleNode, this.itemCount, this.height)
      },
      endNode() {
        return Math.min(this.itemCount - 1, this.lastVisibleNode + this.renderAhead)
      },
      visibleNodeCount() {
        return this.endNode - this.startNode + 1
      },
      offsetY() {
        return this.childPositions[this.startNode]
      },
      childPositions() {
        console.log('aas')
        let results = [0]
        for (let i = 1; i < this.itemCount; i++) {
          results.push(results[i - 1] + this.getChildHeight(i - 1))
        }
        return results
      }
    },
    mounted() {
      this.scrollContainer = this.$refs.container
      this.scrollContainer.addEventListener("scroll", this.onScroll)
    },
    destroyed() {
      this.scrollContainer.removeEventListener("scroll", this.onScroll)
    },
    methods: {
      onScroll(e) {
        if (this.animationFrame) {
          cancelAnimationFrame(this.animationFrame)
        }
        this.animationFrame = requestAnimationFrame(() => {
          this.scrollTop = e.target.scrollTop
        })
      }
    }
  }

  function findStartNode(scrollTop, nodePositions, itemCount) {
    let startRange = 0
    let endRange = itemCount - 1
    while (endRange !== startRange) {
      // console.log(startRange, endRange)
      const middle = Math.floor((endRange - startRange) / 2 + startRange)

      if (
        nodePositions[middle] <= scrollTop &&
        nodePositions[middle + 1] > scrollTop
      ) {
        // console.log("middle", middle)
        return middle
      }

      if (middle === startRange) {
        // edge case - start and end range are consecutive
        // console.log("endRange", endRange)
        return endRange
      } else {
        if (nodePositions[middle] <= scrollTop) {
          startRange = middle
        } else {
          endRange = middle
        }
      }
    }
    return itemCount
  }

  function findEndNode(nodePositions, startNode, itemCount, height) {
    let endNode
    for (endNode = startNode; endNode < itemCount; endNode++) {
      // console.log(nodePositions[endNode], nodePositions[startNode])
      if (nodePositions[endNode] > nodePositions[startNode] + height) {
        // console.log(endNode)
        return endNode
      }
    }
    return endNode
  }
</script>
