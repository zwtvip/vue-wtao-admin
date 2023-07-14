<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" showFooter title="选择模块" width="25%" @ok="handleSubmit">
    <List :pagination="pagination">
      <template #header>
        <BasicForm @register="registerForm" />
      </template>
      <template v-for="item in moduleList" :key="item.moduleName">
        <ListItem>
          <Card :hoverable="true" :bordered="false">
            <template #title> {{ item.fileName }} </template>
            <template #extra>
              <Checkbox v-model:checked="item.checked" @change="handleChange($event, item)"> 选中模块 </Checkbox>
            </template>
            <template #cover>
              <!-- <Image :src="item.images[0]" /> -->
            </template>
          </Card>
        </ListItem>
      </template>
    </List>
  </BasicDrawer>
</template>

<script lang="ts" setup>
import { ref, unref } from 'vue'
import { List, Card, Checkbox } from 'ant-design-vue'
import { BasicForm, useForm } from '@/components/Form/index'
import { BasicDrawer, useDrawerInner } from '@/components/Drawer'
import { useScreenStore } from '@/store/modules/screen'
import type { CardInfo, ModuleInfo } from '@/types/screen'
import { searchFormSchema } from './data'

const ListItem = List.Item

const emit = defineEmits(['register', 'success'])
const screenStore = useScreenStore()

let cardInfo = {} as CardInfo
let moduleInfo = {} as ModuleInfo
const isUpdate = ref(true)
const moduleList = screenStore.getModuleList

const [registerForm, { resetFields, setFieldsValue, getFieldsValue }] = useForm({
  schemas: searchFormSchema,
  labelWidth: 100,
  showActionButtonGroup: false,
  actionColOptions: {
    span: 12
  }
})

const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
  resetFields()
  cardInfo = data.record
  moduleList.forEach((item) => {
    item.checked = false
    if (item.moduleName === cardInfo.moduleName) {
      item.checked = true
    }
  })
  isUpdate.value = !!data?.isUpdate
  if (unref(isUpdate)) {
    setFieldsValue({
      ...data.record
    })
  }
})

async function handleSubmit() {
  try {
    setDrawerProps({ confirmLoading: true, loading: true })
    cardInfo.cardName = moduleInfo.fileName || cardInfo.cardName
    cardInfo.moduleName = moduleInfo.moduleName || cardInfo.moduleName
    cardInfo = Object.assign(cardInfo, getFieldsValue())
    emit('success', cardInfo)
    closeDrawer()
  } finally {
    setDrawerProps({ confirmLoading: false, loading: false })
  }
}

// 卡片操作
async function fetch() {
  // const res = await screenStore.getCardListData({
  //   page: page.value,
  //   pageSize: pageSize.value,
  //   ...p
  // })
  // total.value = res.total
}

function handleChange(e: any, item) {
  moduleList.forEach((json) => {
    json.checked = false
  })
  item.checked = e.target.checked
  if (item.checked) {
    moduleInfo = item
  }
}

// 分页相关
const page = ref(1)
const pageSize = ref(12)
const total = ref(moduleList.length)
const pagination = ref({
  showSizeChanger: false,
  showQuickJumper: false,
  pageSize,
  current: page,
  total,
  size: 'small',
  showTotal: (total) => `总共 ${total} 条`,
  onChange: pageChange,
  onShowSizeChange: pageSizeChange
})

function pageChange(p, pz) {
  page.value = p
  pageSize.value = pz
  fetch()
}
function pageSizeChange(_current, size) {
  pageSize.value = size
  fetch()
}
</script>
./data
