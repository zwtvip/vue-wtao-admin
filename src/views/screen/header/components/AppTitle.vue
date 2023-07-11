<template>
  <div :class="`${prefixCls}`">
    <span :class="`${prefixCls}-title`">大屏设计器</span>
  </div>
</template>

<script lang="ts" setup name="AppTitle">
import { useDesign } from '@/hooks/web/useDesign'

const { prefixCls } = useDesign('app-title')
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-app-title';

@keyframes word {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 -200%;
  }
}
.@{prefix-cls} {
  padding-left: 16px;

  &-title {
    color: @white;
    font-size: 46px;
    font-family: YouSheBiaoTiHei;
    font-style: normal;
    font-weight: 400;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(to bottom, #fff 40.47%, rgba(237, 245, 253, 0.8) 50%, rgba(236, 243, 252, 0.6) 75%, #fff 100%);
    background-size: 100% 200%;
    background-clip: text;
    animation: word 4s linear infinite;
  }
}
</style>
