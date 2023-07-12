<template>
  <Card :hoverable="false" :bordered="false" :class="`${prefixCls}`">
    <template #title>
      <span :class="`${prefixCls}-title`">文件</span>
    </template>
    <template #extra>
      <div :class="`${prefixCls}-extra`"> 操作 </div>
    </template>
    <div :class="`${prefixCls}-content`">
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </div>
  </Card>
</template>

<script lang="ts" setup name="File-文件">
import { Card } from 'ant-design-vue'
import { useDesign } from '@/hooks/web/useDesign'

const { prefixCls } = useDesign('card')
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-card';
// .@prefix-cls {

// }
</style>
