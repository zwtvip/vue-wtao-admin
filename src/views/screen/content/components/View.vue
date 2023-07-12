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
        <BorderAnimation>
          <component :is="compInfo[item.moduleName]" :record="item" />
        </BorderAnimation>
      </Vue3DraggableResizable>
    </DraggableContainer>
  </div>
</template>

<script lang="ts" setup name="ScreenView">
import Vue3DraggableResizable, { DraggableContainer } from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { BorderAnimation } from '@/components/BorderAnimation'
import { useDesign } from '@/hooks/web/useDesign'
import { useScreenStore } from '@/store/modules/screen'
import { compInfo } from '../../data'
import { onMounted } from 'vue'

const { prefixCls } = useDesign('screen-view')
const screenStore = useScreenStore()

const cardList = screenStore.getCardList

onMounted(() => {
  const cardElList = document.querySelectorAll('.ant-card')
  if (cardElList && cardElList.length > 0) {
    for (let i = 0; i < cardElList.length; i++) {
      const cardEl = cardElList[i]
      const head: HTMLElement | null = cardEl.querySelector('.ant-card-head')
      const body: HTMLElement | null = cardEl.querySelector('.ant-card-body')
      if (body) {
        if (head) {
          body.style.height = 'calc(100% - 57px)'
        } else {
          body.style.height = '100%'
        }
      }
    }
  }
})
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-screen-view';
.@{prefix-cls} {
  height: 100%;
  padding: @screen-content-gutter;
}
</style>
