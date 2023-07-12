<template>
  <div class="border-box" :ref="ref">
    <svg class="border-svg-container" :width="width" :height="height">
      <defs>
        <path :id="path" :d="pathD" fill="transparent" />
        <radialGradient :id="gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>

        <mask :id="mask">
          <circle cx="0" cy="0" r="150" :fill="`url(#${gradient})`">
            <animateMotion :dur="`${dur}s`" :path="pathD" rotate="auto" repeatCount="indefinite" />
          </circle>
        </mask>
      </defs>
      <polygon :fill="backgroundColor" :points="`5, 5 ${width - 5}, 5 ${width - 5} ${height - 5} 5, ${height - 5}`" />
      <use :stroke="mergedColor[0]" stroke-width="1" :xlink:href="`#${path}`" />
      <use :stroke="mergedColor[1]" :stroke-width="strokeWidth" :xlink:href="`#${path}`" :mask="`url(#${mask})`">
        <animate attributeName="stroke-dasharray" :from="`0, ${length}`" :to="`${length}, 0`" :dur="`${dur}s`" repeatCount="indefinite" />
      </use>
    </svg>
    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { buildUUID } from '@/utils/uuid'
import autoResize from './autoResize'

export default {
  name: 'BorderAnimation',
  mixins: [autoResize],
  props: {
    strokeWidth: {
      type: [Number, String],
      default: 2
    },
    color: {
      type: Array,
      default: () => ['transparent', '#4fd2dd']
    },
    dur: {
      type: Number,
      default: 10
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const id = buildUUID()
    return {
      ref: 'border-box',
      path: `border-box-path-${id}`,
      gradient: `border-box-gradient-${id}`,
      mask: `border-box-mask-${id}`,
      mergedColor: []
    }
  },
  computed: {
    length() {
      const { width, height } = this
      return (width + height - 5) * 2
    },
    pathD() {
      const { reverse, width, height } = this
      if (reverse) {
        return `M 0, 0 L 0, ${height - 0} L ${width - 0}, ${height - 0} L ${width - 0}, 0 L 0, 0`
      }
      return `M0, 0 L${width - 0}, 0 L${width - 0}, ${height - 0} L0, ${height - 0} L0, 0`
    }
  },
  watch: {
    color() {
      const { mergeColor } = this
      mergeColor()
    }
  },
  mounted() {
    const { mergeColor } = this
    mergeColor()
  },
  methods: {
    mergeColor() {
      const { color } = this
      this.mergedColor = color || []
    }
  }
}
</script>

<style lang="less" scoped>
.border-box {
  position: relative;
  width: 100%;
  height: 100%;

  .border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1px;
  }
}
</style>
