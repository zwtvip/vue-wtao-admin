<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.realName }}
        </span>
      </span>
    </span>

    <template #overlay>
      <a-menu @click="handleMenuClick">
        <MenuItem
          key="edit"
          :text="currentRoute.name === 'ScreenManage' ? '查看主题' : '编辑主题'"
          icon="ant-design:credit-card-outlined"
        />
        <MenuDivider />
        <MenuItem v-if="getUseLockPage" key="lock" :text="t('layout.header.tooltipLock')" icon="ion:lock-closed-outline" />
        <MenuItem key="logout" :text="t('layout.header.dropdownItemLoginOut')" icon="ion:power-outline" />
      </a-menu>
    </template>
  </Dropdown>
  <LockAction @register="register" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Dropdown, Menu } from 'ant-design-vue'
import type { MenuInfo } from 'ant-design-vue/lib/menu/src/interface'
import { useUserStore } from '@/store/modules/user'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useI18n } from '@/hooks/web/useI18n'
import { useDesign } from '@/hooks/web/useDesign'
import { useModal } from '@/components/Modal'
import headerImg from '@/assets/images/header.jpg'
import { propTypes } from '@/utils/propTypes'

import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

type MenuEvent = 'logout' | 'list' | 'lock'

export default defineComponent({
  name: 'UserDropdown',
  components: {
    Dropdown,
    AMenu: Menu,
    MenuDivider: Menu.Divider,
    MenuItem: createAsyncComponent(() => import('@/layouts/default/header/components/user-dropdown/DropMenuItem.vue')),
    LockAction: createAsyncComponent(() => import('@/layouts/default/header/components/lock/LockModal.vue'))
  },
  props: {
    theme: propTypes.oneOf(['dark', 'light'])
  },
  setup() {
    const { prefixCls } = useDesign('header-user-dropdown')
    const { t } = useI18n()
    const { getUseLockPage } = useHeaderSetting()
    const userStore = useUserStore()
    const { push, currentRoute } = useRouter()

    const getUserInfo = computed(() => {
      const { realName = '', avatar, desc } = userStore.getUserInfo || {}
      return { realName, avatar: avatar || headerImg, desc }
    })

    const [register, { openModal }] = useModal()

    function handleLock() {
      openModal(true)
    }

    //  login out
    function handleLoginOut() {
      userStore.confirmLoginOut()
    }

    // 页面切换
    function changeScreenPage() {
      if (currentRoute.value.name === 'ThemeList') {
        push('/screen/cardList')
      } else {
        push('/screen/themeList')
      }
    }

    function handleMenuClick(e: MenuInfo) {
      switch (e.key as MenuEvent) {
        case 'logout':
          handleLoginOut()
          break
        case 'edit':
          changeScreenPage()
          break
        case 'lock':
          handleLock()
          break
      }
    }

    return {
      prefixCls,
      t,
      getUserInfo,
      handleMenuClick,
      register,
      getUseLockPage,
      currentRoute
    }
  }
})
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-header-user-dropdown';

.@{prefix-cls} {
  padding: 0 0 0 10px;
  padding-right: 16px;
  overflow: hidden;
  font-size: 12px;
  cursor: pointer;
  align-items: center;
  color: @white;

  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  &__header {
    border-radius: 50%;
  }

  &__name {
    font-size: 14px;
  }

  &-dropdown-overlay {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
}
</style>
