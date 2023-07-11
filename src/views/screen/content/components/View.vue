<template>
  <div :class="`${prefixCls}`">
    <DraggableContainer>
      <Vue3DraggableResizable
        v-for="item in cardList"
        :key="item.cardId"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :draggable="false"
        :resizable="false"
        :active="item.active"
      >
        <component :is="compInfo[item.cardName]" :record="item" />
      </Vue3DraggableResizable>
    </DraggableContainer>
  </div>
</template>

<script lang="ts" setup name="ScreenView">
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import { DraggableContainer } from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { buildUUID } from '@/utils/uuid'
import { useDesign } from '@/hooks/web/useDesign'
import { compInfo } from '../../data'

const { prefixCls } = useDesign('screen-view')
const cardList = [
  {
    cardId: buildUUID(),
    cardName: 'File',
    x: 100,
    y: 100,
    h: 300,
    w: 400,
    parent: true,
    active: false
  },
  {
    cardId: buildUUID(),
    cardName: 'Position',
    x: 300,
    y: 500,
    h: 300,
    w: 400,
    parent: true,
    active: false
  }
]
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-screen-view';
.@{prefix-cls} {
  height: 100%;
}
</style>
