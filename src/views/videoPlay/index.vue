<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4" @select="handleSelect" />
    <div class="w-3/4">
      <SplitScreen @split="onSplit" />
      <div :style="{ height: height + 'px', width: width + 'px' }" class="parent">
        <Vue3DraggableResizable
          v-for="(item, index) in videoList"
          :key="item.id"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :parent="true"
          :disabledX="true"
          :disabledY="true"
          :draggable="true"
          :resizable="false"
          :active="item.active"
          @activated="activated(item, index)"
          @dblclick="dblClick(item, index)"
        >
          <VideoPlay :record="item" />
        </Vue3DraggableResizable>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup name="VideoPlay">
import { ref, onMounted } from 'vue'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { PageWrapper } from '@/components/Page'
import { buildUUID } from '@/utils/uuid'
import DeptTree from './components/DeptTree.vue'
import VideoPlay from './components/VideoPlay.vue'
import SplitScreen from './components/SplitScreen.vue'
import { getVideoList, setVideoList, width, height, VideoInfo } from '@/hooks/component/useVideoPlay'

// 临时存储当前激活组件的index
const currentIndex = ref(-1)
let dataSource: VideoInfo[] = []
const videoList = ref<VideoInfo[]>([])

function handleSelect(cameraId) {
  console.log(cameraId)
}
function onSplit(split) {
  videoList.value = setVideoList(split)
  dataSource = JSON.parse(JSON.stringify(videoList.value))
}

const activated = (item, index) => {
  item.active = true
  currentIndex.value = index
}

const dblClick = (item, index) => {
  if (item.w !== width && item.h !== height) {
    item.id = buildUUID()
    item.x = 0
    item.y = 0
    item.w = width
    item.h = height
  } else {
    item.id = buildUUID()
    item.x = dataSource[index].x
    item.y = dataSource[index].y
    item.w = dataSource[index].w
    item.h = dataSource[index].h
  }
}

onMounted(() => {
  videoList.value = getVideoList()
  dataSource = JSON.parse(JSON.stringify(videoList.value))
})
</script>

<style lang="less">
.parent {
  position: relative;

  .active {
    z-index: 100;
  }
}
</style>
