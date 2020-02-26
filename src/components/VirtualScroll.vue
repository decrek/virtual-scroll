<template>
  <div
    class="virtual-scroller"
    :style="{ height: height + 'px', position: 'relative' }"
    ref="container"
    tabindex="-1"
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
        let results = [0]
        for (let i = 1; i < this.itemCount; i++) {
          results.push(results[i - 1] + this.getChildHeight(i - 1))
        }
        return results
      }
    },
    created() {
      document.documentElement.style = '--documentHeight: ' + this.totalHeight + 'px;'
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll)
    },
    destroyed() {
      window.removeEventListener('scroll', this.onScroll)
      document.documentElement.style = '--documentHeight: ' + 'auto;'
    },
    methods: {
      onScroll() {
        if (this.animationFrame) {
          cancelAnimationFrame(this.animationFrame)
        }
        this.animationFrame = requestAnimationFrame(() => {
          this.scrollTop = window.scrollY

          // fix focus, a little bit
          if (document.activeElement && document.activeElement.tagName.toUpperCase() === 'A') {
            const index = document.activeElement.getAttribute('data-index')
            const newElement = document.querySelector(`[data-index="${index}"]`)
            if (newElement) {
              this.$nextTick(() => {
                const oldScrollPositionX = window.scrollX
                const oldScrollPositionY = window.scrollY
                newElement.focus()
                window.scrollTo(oldScrollPositionX, oldScrollPositionY)
              })
            } else {
              // TODO: Wen the element was focused but is out of view. Oh yeah and please take into account if the user scrolls up or down. I have no clue what to do.
            }
          }
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

<style>
  body {
    will-change: transform;
    height: var(--documentHeight);
    position: relative;
  }

  .virtual-scroller {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>
