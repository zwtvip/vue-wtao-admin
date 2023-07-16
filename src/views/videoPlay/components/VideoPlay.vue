<template>
  <div class="video-play flex h-full">
    <SvgIcon name="video" size="200" class="m-auto" />
    <p>{{ record?.index + 1 }}</p>
  </div>
</template>

<script lang="ts" setup name="VideoPlay">
// import { Card } from 'ant-design-vue'
import { SvgIcon } from '@/components/Icon'

defineProps({
  record: {
    type: Object
  }
})
</script>

<style lang="less">
.video-play {
  border: 1px solid #ddd;
  background: #fff;
}
</style>
