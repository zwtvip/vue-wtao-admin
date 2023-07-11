<template>
  <Header :class="`${prefixCls}`">
    <div :class="`${prefixCls}-left`">
      <AppTitle />
    </div>
    <div :class="`${prefixCls}-center`"></div>
    <div :class="`${prefixCls}-right`">
      <UserDropdown />
    </div>
  </Header>
</template>

<script lang="ts" setup name="ScreenHeader">
import { Layout } from 'ant-design-vue'
import { useDesign } from '@/hooks/web/useDesign'
import AppTitle from './components/AppTitle.vue'
import UserDropdown from './components/UserDropdown.vue'

const Header = Layout.Header
const { prefixCls } = useDesign('screen-header')
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-screen-header';
.@{prefix-cls} {
  position: relative;
  z-index: @screen-header-z-index;
  height: @screen-header-height;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: url('@/assets/images/screen/header-bg.png');
  background-size: 100% 100%;
}
</style>
