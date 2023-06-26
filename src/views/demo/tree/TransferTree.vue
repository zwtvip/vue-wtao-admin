<template>
  <PageWrapper title="穿梭树" contentBackground contentClass="p-4">
    <TreeTransfer ref="treeTransferRef" :tree-data="treeData" :edit-key="editKey" @change="onChange" />
    <div class="text-center mt-5">
      <a-button type="primary" class="mr-2" @click="getValue"> 获取值 </a-button>
      <a-button type="primary" @click="setValue"> 设置值 </a-button>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
import { PageWrapper } from '@/components/Page'
import { TreeTransfer } from '@/components/Tree'

const treeTransferRef = ref(null)
const state = reactive({
  treeData: [
    {
      id: 1,
      parentId: 0,
      key: '0',
      title: '工作台'
    },
    {
      id: 2,
      parentId: 0,
      key: '2',
      title: '仪表盘',
      children: [
        {
          id: 3,
          parentId: 2,
          key: '3',
          title: '欢迎页'
        },
        {
          id: 4,
          parentId: 2,
          key: '4',
          title: '分析页'
        },
        {
          id: 5,
          parentId: 2,
          key: '5',
          title: '监控页'
        }
      ]
    },
    {
      id: 6,
      parentId: 0,
      key: '6',
      title: '表单页',
      children: [
        {
          id: 7,
          parentId: 6,
          key: '7',
          title: '基础表单'
        },
        {
          id: 8,
          parentId: 6,
          key: '8',
          title: '分步表单'
        },
        {
          id: 9,
          parentId: 6,
          key: '9',
          title: '高级表单'
        }
      ]
    }
  ],
  editKey: [] as string[]
})

// 获取值
function getValue() {
  // console.log(treeTransferRef.value?.editKey)
}

// 设置值
function setValue() {
  state.editKey = ['6', '9']
}

function onChange(state) {
  console.log(state)
}
const { treeData, editKey } = toRefs(state)
</script>
