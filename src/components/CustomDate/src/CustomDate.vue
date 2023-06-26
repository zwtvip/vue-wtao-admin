<template>
  <div>
    <a-radio-group v-if="type === 'radio'" v-bind="attrs" v-model:value="state" button-style="solid">
      <a-radio-button
        v-for="item in getOptions"
        :value="item.value"
        :disabled="item.disabled"
        :key="item.value"
        @click="handleClick(item.value)"
      >
        {{ item.label }}
      </a-radio-button>
    </a-radio-group>
    <a-select
      v-if="type === 'select'"
      v-bind="attrs"
      v-model:value="state"
      placeholder="请选择时间"
      :options="getOptions"
      style="width: 120px; margin-right: 10px"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { Radio, Select } from 'ant-design-vue'
import dayjs from 'dayjs'
import { isString } from '@/utils/is'
import { useRuleFormItem } from '@/hooks/component/useFormItem'
import { useAttrs } from '@/hooks/core/useAttrs'

type OptionsItem = { label: string; value: string | number | boolean; disabled?: boolean }
type RadioItem = string | OptionsItem

const emit = defineEmits(['change'])

const props = defineProps({
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>
  },
  type: {
    type: String,
    default: 'radio'
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD HH:mm:ss'
  },
  options: {
    type: Array as PropType<RadioItem[]>,
    default: () => []
  }
})

const ARadioGroup = Radio.Group
const ARadioButton = Radio.Button
const ASelect = Select
const attrs = useAttrs()

const emitData = ref<any[]>([])
const date = ref<string[]>([])
const [state] = useRuleFormItem(props, 'value', 'change', emitData)

const getOptions = computed((): OptionsItem[] => {
  const { options } = props
  if (!options || options?.length === 0) return []
  const isStringArr = options.some((item) => isString(item))
  if (!isStringArr) return options as OptionsItem[]

  return options.map((item) => ({ label: item, value: item })) as OptionsItem[]
})

watch(
  () => state.value,
  (v) => {
    v && handleClick(v)
  }
)

function setDate(num) {
  return dayjs().subtract(num, 'day').format(props.format)
}

function handleClick(value) {
  emitData.value = value
  switch (value) {
    case '0天':
      date.value = [dayjs().format(props.format), dayjs().format(props.format)]
      break
    case '1天':
      emitData.value = [setDate(2), setDate(1)]
      break
    case '3天':
      date.value = [setDate(3), setDate(1)]
      break
    case '7天':
      date.value = [setDate(7), setDate(1)]
      break
    case '30天':
      date.value = [setDate(30), setDate(1)]
      break
    case '180天':
      date.value = [setDate(180), setDate(1)]
      break
    case '365天':
      date.value = [setDate(365), setDate(1)]
      break
    default:
      break
  }
  emit('change', emitData.value, date.value)
}
</script>
