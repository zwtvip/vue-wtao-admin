<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition name="fade-slide" mode="out-in" appear>
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </router-view>
</template>

<script lang="ts" setup></script>
