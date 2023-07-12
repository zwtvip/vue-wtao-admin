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
        <component :is="compInfo[item.moduleName]" :record="item" />
      </Vue3DraggableResizable>
    </DraggableContainer>
  </div>
</template>

<script lang="ts" setup name="ScreenView">
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import { DraggableContainer } from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { useDesign } from '@/hooks/web/useDesign'
import { useScreenStore } from '@/store/modules/screen'
import { compInfo } from '../../data'

const { prefixCls } = useDesign('screen-view')
const screenStore = useScreenStore()

const cardList = screenStore.getCardList
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-screen-view';
.@{prefix-cls} {
  height: 100%;
  padding: @screen-content-gutter;
}
</style>
