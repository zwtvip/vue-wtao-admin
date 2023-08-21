<template>
  <TreeSelect v-bind="getAttrs" :load-data="async ? onLoadData : undefined" @change="handleChange">
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
  </TreeSelect>
</template>
<script lang="ts" setup name="ApiTreeSelect">
import { computed, watch, ref, onMounted, unref, useAttrs } from 'vue'
import { TreeSelect } from 'ant-design-vue'
import { isArray, isFunction } from '@/utils/is'
import { get } from 'lodash-es'
import { propTypes } from '@/utils/propTypes'
import { LoadingOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  api: { type: Function as PropType<(arg?: Recordable) => Promise<Recordable>> },
  params: { type: Object },
  immediate: { type: Boolean, default: true },
  async: { type: Boolean, default: false },
  resultField: propTypes.string.def('')
})
const emit = defineEmits(['options-change', 'change'])
const attrs = useAttrs()
const treeData = ref<Recordable[]>([])
const isFirstLoaded = ref<Boolean>(false)
const loading = ref(false)
const getAttrs = computed(() => {
  return {
    ...(props.api ? { treeData: unref(treeData) } : {}),
    ...attrs
  }
})

function handleChange(...args) {
  emit('change', ...args)
}

watch(
  () => props.params,
  () => {
    !unref(isFirstLoaded) && fetch()
  },
  { deep: true }
)

watch(
  () => props.immediate,
  (v) => {
    v && !isFirstLoaded.value && fetch()
  }
)

onMounted(() => {
  props.immediate && fetch()
})

function onLoadData(treeNode) {
  return new Promise((resolve: (value?: unknown) => void) => {
    if (isArray(treeNode.children) && treeNode.children.length > 0) {
      resolve()
      return
    }
    setTimeout(() => {
      const children: Recordable[] = [
        { title: `Child Node ${treeNode.eventKey}-0`, value: `${treeNode.eventKey}-0` },
        { title: `Child Node ${treeNode.eventKey}-1`, value: `${treeNode.eventKey}-1` }
      ]
      children.forEach((item) => {
        item.isLeaf = false
        item.children = []
      })
      treeNode.dataRef.children = children
      treeData.value = [...treeData.value]

      resolve()
      return
    }, 300)
  })
}

async function fetch() {
  const { api } = props
  if (!api || !isFunction(api)) return
  loading.value = true
  treeData.value = []
  let result
  try {
    result = await api(props.params)
  } catch (e) {
    console.error(e)
  }
  loading.value = false
  if (!result) return
  if (!isArray(result)) {
    result = get(result, props.resultField)
  }
  treeData.value = (result as Recordable[]) || []
  isFirstLoaded.value = true
  emit('options-change', treeData.value)
}
</script>
