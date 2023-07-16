<template>
  <Space>
    <template v-for="item in splitScreen" :key="item.split">
      <SvgIcon :name="item.split === split ? item.imgActive : item.img" size="32" @click="handleClick(item)" />
    </template>
  </Space>
</template>

<script lang="ts" setup name="SplitScreen">
import { ref } from 'vue'
import { Space } from 'ant-design-vue'
import { SvgIcon } from '@/components/Icon'

const emit = defineEmits(['split'])

const split = ref(1)

const splitScreen = ref([
  { split: 1, img: 'one', imgActive: 'one-active' },
  { split: 4, img: 'four', imgActive: 'four-active' },
  { split: 6, img: 'six', imgActive: 'six-active' },
  { split: 8, img: 'eight', imgActive: 'eight-active' },
  { split: 9, img: 'nine', imgActive: 'nine-active' },
  { split: 16, img: 'sixteen', imgActive: 'sixteen-active' }
])

function handleClick(record) {
  split.value = record.split
  emit('split', split.value)
}
</script>
