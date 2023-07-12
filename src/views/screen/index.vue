<template>
  <Layout :class="prefixCls" v-bind="lockEvents">
    <LayoutFeatures />
    <ParticlesFeatures />
    <LayoutHeader />
    <Layout :class="`${prefixCls}-content`">
      <LayoutContent />
    </Layout>
  </Layout>
</template>

<script lang="ts" setup name="ScreenLayout">
import { Layout } from 'ant-design-vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useLockPage } from '@/hooks/web/useLockPage'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'
import ParticlesFeatures from './feature/index.vue'
import LayoutHeader from './header/index.vue'
import LayoutContent from './content/index.vue'
import { onMounted } from 'vue'

const LayoutFeatures = createAsyncComponent(() => import('@/layouts/default/feature/index.vue'))
const { prefixCls } = useDesign('screen-layout')
const lockEvents = useLockPage()

onMounted(() => {
  document.getElementById(`htmlRoot`)?.setAttribute('data-screen-theme', 'blueDark')
})
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-screen-layout';
.@{prefix-cls} {
  height: 100%;

  &-content {
    height: calc(100% - @screen-header-height);
  }
}
</style>
