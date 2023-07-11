<template>
  <div :class="`${prefixCls}__content`">
    <Card :hoverable="false" :class="`${prefixCls}__card`">
      <template #title> 文件 </template>
      <template #extra>
        <div :class="`${prefixCls}__card-extra`"> 操作 </div>
      </template>
      <div>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup name="File">
import { ref } from 'vue'
import { Card } from 'ant-design-vue'

const prefixCls = ref('wrapper')
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-wrapper';
// .@prefix-cls {
// &__content {
//   &__card {
//     &-title {
//     }
//   }
// }
// }
</style>
