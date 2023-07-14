<template>
  <div :class="`${prefixCls}`">
    <div class="ruler-h">
      <span class="n" style="left: 2px">0</span><span class="n" style="left: 52px">50</span> <span class="n" style="left: 102px">100</span
      ><span class="n" style="left: 152px">150</span> <span class="n" style="left: 202px">200</span
      ><span class="n" style="left: 252px">250</span> <span class="n" style="left: 302px">300</span
      ><span class="n" style="left: 352px">350</span> <span class="n" style="left: 402px">400</span
      ><span class="n" style="left: 452px">450</span> <span class="n" style="left: 502px">500</span
      ><span class="n" style="left: 552px">550</span> <span class="n" style="left: 602px">600</span
      ><span class="n" style="left: 652px">650</span> <span class="n" style="left: 702px">700</span
      ><span class="n" style="left: 752px">750</span> <span class="n" style="left: 802px">800</span
      ><span class="n" style="left: 852px">850</span> <span class="n" style="left: 902px">900</span
      ><span class="n" style="left: 952px">950</span>
      <span class="n" style="left: 1002px">1000</span>
      <span class="n" style="left: 1052px">1050</span>
      <span class="n" style="left: 1102px">1100</span>
      <span class="n" style="left: 1152px">1150</span>
      <span class="n" style="left: 1202px">1200</span>
      <span class="n" style="left: 1252px">1250</span>
      <span class="n" style="left: 1302px">1300</span>
      <span class="n" style="left: 1352px">1350</span>
      <span class="n" style="left: 1402px">1400</span>
      <span class="n" style="left: 1452px">1450</span>
      <span class="n" style="left: 1502px">1500</span>
      <span class="n" style="left: 1552px">1550</span>
      <span class="n" style="left: 1602px">1600</span>
      <span class="n" style="left: 1652px">1650</span>
      <span class="n" style="left: 1702px">1700</span>
      <span class="n" style="left: 1752px">1750</span>
      <span class="n" style="left: 1802px">1800</span>
      <span class="n" style="left: 1852px">1850</span>
      <span class="n" style="left: 1902px">1900</span>
      <span class="n" style="left: 1952px">1950</span>
      <span class="n" style="left: 2002px">2000</span>
      <span class="n" style="left: 2052px">2050</span>
      <span class="n" style="left: 2102px">2100</span>
      <span class="n" style="left: 2152px">2150</span>
      <span class="n" style="left: 2202px">2200</span>
      <span class="n" style="left: 2252px">2250</span>
      <span class="n" style="left: 2302px">2300</span>
      <span class="n" style="left: 2352px">2350</span>
      <span class="n" style="left: 2402px">2400</span>
      <span class="n" style="left: 2452px">2450</span>
      <span class="n" style="left: 2502px">2500</span>
    </div>
    <div class="ruler-v">
      <span class="n" style="top: 2px">0</span><span class="n" style="top: 52px">50</span> <span class="n" style="top: 102px">100</span
      ><span class="n" style="top: 152px">150</span> <span class="n" style="top: 202px">200</span
      ><span class="n" style="top: 252px">250</span> <span class="n" style="top: 302px">300</span
      ><span class="n" style="top: 352px">350</span> <span class="n" style="top: 402px">400</span
      ><span class="n" style="top: 452px">450</span> <span class="n" style="top: 502px">500</span
      ><span class="n" style="top: 552px">550</span> <span class="n" style="top: 602px">600</span
      ><span class="n" style="top: 652px">650</span> <span class="n" style="top: 702px">700</span
      ><span class="n" style="top: 752px">750</span> <span class="n" style="top: 802px">800</span
      ><span class="n" style="top: 852px">850</span> <span class="n" style="top: 902px">900</span
      ><span class="n" style="top: 952px">950</span> <span class="n" style="top: 1002px">1000</span
      ><span class="n" style="top: 1052px">1050</span>
      <span class="n" style="top: 1102px">1100</span>
      <span class="n" style="top: 1152px">1150</span>
    </div>
    <DraggableContainer>
      <Vue3DraggableResizable
        v-for="(item, index) in cardList"
        :key="item.cardId"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :draggable="true"
        :resizable="true"
        :active="item.active"
        @activated="activated(item, index)"
        @deactivated="deactivated(item)"
        @drag-end="dragEnd"
        @resize-end="resizeEnd"
      >
        <BorderAnimation>
          <Card :hoverable="true" :bordered="false" :class="`${prefixCls}-card`">
            <template #title>
              <a-input v-model:value="item.cardName" :bordered="false" size="small" placeholder="请输入卡片标题" />
            </template>
            <template #extra>
              <div :class="`${prefixCls}-card-extra`">
                <Tooltip title="编辑卡片">
                  <EditOutlined @click="handleEdit(item)" />
                </Tooltip>
                <Tooltip title="重置卡片">
                  <RedoOutlined class="mx-4" @click="handleReset(item)" />
                </Tooltip>
                <Tooltip title="删除卡片">
                  <Popconfirm title="是否删除卡片?" ok-text="是" cancel-text="否" @confirm="handleDelete(item.cardId)">
                    <DeleteOutlined v-if="cardList.length > 1" />
                  </Popconfirm>
                </Tooltip>
              </div>
            </template>
            <component :is="compInfo[item.moduleName]" :record="item" :class="`${prefixCls}-module`" />
          </Card>
        </BorderAnimation>
      </Vue3DraggableResizable>
    </DraggableContainer>
    <ModuleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup name="ScreenManage">
import { ref, watch, onMounted } from 'vue'
import { Card, Tooltip, Popconfirm } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined, RedoOutlined } from '@ant-design/icons-vue'
import Vue3DraggableResizable, { DraggableContainer } from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { BorderAnimation } from '@/components/BorderAnimation'
import { useDesign } from '@/hooks/web/useDesign'
import { buildUUID } from '@/utils/uuid'
import { useMessage } from '@/hooks/web/useMessage'
import { useDrawer } from '@/components/Drawer'
import { useScreenStore } from '@/store/modules/screen'
import type { CardInfo } from '@/types/screen'
import ModuleDrawer from '../modals/ModuleDrawer.vue'
import { compInfo } from '../../data'

const [registerDrawer, { openDrawer }] = useDrawer()
const { prefixCls } = useDesign('screen-manage')
const screenStore = useScreenStore()
const { createMessage } = useMessage()
screenStore.setModuleList()
const cardList = ref<CardInfo[]>(screenStore.getCardList)

// 临时存储当前激活组件的index
const currentIndex = ref(-1)
let copyData: CardInfo[] = []
let copyObj = {} as CardInfo

const activated = (item, index) => {
  item.active = true
  currentIndex.value = index
}
const deactivated = (item) => {
  item.active = false
}
const dragEnd = ({ x, y }) => {
  cardList.value.forEach((item) => {
    if (item.active) {
      item.x = x
      item.y = y
    }
  })
}
const resizeEnd = ({ x, y, w, h }) => {
  cardList.value.forEach((item) => {
    if (item.active) {
      item.x = x
      item.y = y
      item.w = w
      item.h = h
    }
  })
}
function handleReset(record: Recordable) {
  cardList.value.forEach((item, index) => {
    if (record.cardId === item.cardId) {
      item.moduleName = 'Position'
      item.cardName = '测试卡片' + (index + 1)
    }
  })
}
function handleEdit(record: Recordable) {
  openDrawer(true, {
    isUpdate: true,
    record
  })
}

const handleDelete = (id: string) => {
  const index = cardList.value.findIndex((item) => item.cardId === id)
  cardList.value.splice(index, 1)
  createMessage.success('删除成功!')
}

function handleSuccess(cardInfo) {
  cardList.value.forEach((item) => {
    if (cardInfo.cardId === item.cardId) {
      item.cardName = cardInfo.cardName
    }
  })
}

watch(
  () => [...cardList.value],
  () => {
    screenStore.setCardList(cardList.value)
  },
  { deep: true }
)

onMounted(() => {
  // 绑定键盘事件
  document.onkeydown = function (e: any) {
    e = e || window.event
    if (e.ctrlKey && e.keyCode == 67) {
      // Ctrl + C  // 复制
      if (currentIndex.value >= 0) {
        copyData = [...cardList.value]
        copyObj = JSON.parse(JSON.stringify(copyData[currentIndex.value]))
      }
    } else if (e.ctrlKey && e.keyCode == 86) {
      // Ctrl + V  // 粘贴
      copyObj.cardId = buildUUID()
      copyObj.x += 50
      copyObj.y += 50
      copyData.push(copyObj)
      cardList.value = copyData
    }
  }
})
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-screen-manage';
.@{prefix-cls} {
  position: relative;
  height: 100%;
  padding: @screen-content-gutter;

  .ruler-h,
  .ruler-v {
    // opacity: 0.3;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    z-index: 999;

    .n {
      position: absolute;
      font: 10px/1 Arial, sans-serif;
      color: #333;
      cursor: default;
    }
  }

  .ruler-h {
    width: calc(100% - @screen-content-gutter);
    height: @screen-content-gutter;
    left: @screen-content-gutter;
    // opacity: 0.6;
    background: url('/@/assets/images/screen/ruler-h.png') repeat-x;

    .n {
      top: 1px;
    }
  }

  .ruler-v {
    width: @screen-content-gutter;
    height: calc(100% - @screen-content-gutter);
    top: @screen-content-gutter;
    // opacity: 0.6;
    background: url('/@/assets/images/screen/ruler-v.png') repeat-y;

    .n {
      width: 10px;
      left: 3px;
      word-wrap: break-word;
    }
  }

  &-card {
    height: 100%;
    border-radius: 0;

    > :deep(.ant-card-body) {
      padding: 0;
      background: transparent;
      overflow: hidden;
      height: calc(100% - @screen-card-header-height);
    }
  }

  &-module {
    > :deep(.ant-card-body) {
      height: 100%;
    }

    > :deep(.ant-card-head) {
      display: none;
    }
  }
}
</style>
