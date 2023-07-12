<template>
  <Card :hoverable="false" :bordered="false" :class="`${prefixCls}`">
    <template #title>
      <span :class="`${prefixCls}-title`">卡片位置</span>
    </template>
    <p>
      left: <b>{{ record?.x }}</b>
    </p>
    <p>
      top: <b>{{ record?.y }}</b>
    </p>
    <p>
      width: <b>{{ record?.w }}</b>
    </p>
    <p>
      height: <b>{{ record?.h }}</b>
    </p>
  </Card>
</template>

<script lang="ts" setup name="Position-位置">
import { Card } from 'ant-design-vue'

defineProps({
  record: {
    type: Object,
    default: () => {}
  }
})

import { useDesign } from '@/hooks/web/useDesign'

const { prefixCls } = useDesign('card')
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-card';
// .@prefix-cls {

// }
</style>
