<template>
  <div>
    <Upload
      v-model:file-list="fileList"
      list-type="picture-card"
      :accept="getStringAccept"
      :before-upload="beforeUpload"
      :custom-request="customRequest"
      @preview="handlePreview"
      @remove="handleRemove"
    >
      <div v-if="fileList && fileList.length < maxNumber">
        <plus-outlined />
        <div style="margin-top: 8px">{{ t('component.upload.upload') }}</div>
      </div>
    </Upload>
    <Modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="" style="width: 100%" :src="previewImage" />
    </Modal>
  </div>
</template>

<script lang="ts" setup name="ImageUpload">
import { ref, toRefs, watch } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { Upload, Modal } from 'ant-design-vue'
import type { UploadProps } from 'ant-design-vue'
import { UploadRequestOption } from 'ant-design-vue/lib/vc-upload/interface'
import { useMessage } from '@/hooks/web/useMessage'
import { isArray, isFunction } from '@/utils/is'
import { warn } from '@/utils/log'
import { useI18n } from '@/hooks/web/useI18n'
import { useUploadType } from '../useUpload'
import { uploadContainerProps } from '../props'
import { isImgTypeByName } from '../helper'

const emit = defineEmits(['change', 'update:value', 'delete'])
const props = defineProps({
  ...uploadContainerProps
})
const { t } = useI18n()
const { createMessage } = useMessage()
const { accept, helpText, maxNumber, maxSize } = toRefs(props)
const { getStringAccept } = useUploadType({
  acceptRef: accept,
  helpTextRef: helpText,
  maxNumberRef: maxNumber,
  maxSizeRef: maxSize
})
const previewVisible = ref<boolean>(false)
const previewImage = ref<string>('')
const previewTitle = ref<string>('')

const fileList = ref<UploadProps['fileList']>([])
const isLtMsg = ref<boolean>(true)
const isActMsg = ref<boolean>(true)

watch(
  () => props.value,
  (v) => {
    if (isArray(v)) {
      fileList.value = v.map((url, i) => ({
        uid: String(-i),
        name: url ? url.slice(url.lastIndexOf('/')) : 'image.png',
        status: 'done',
        url
      }))
    }
  },
  {
    immediate: true,
    deep: true
  }
)

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const handlePreview = async (file: UploadProps['fileList'][number]) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string
  }
  previewImage.value = file.url || file.preview
  previewVisible.value = true
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
}

const handleRemove = async (file: UploadProps['fileList'][number]) => {
  if (fileList.value) {
    const index = fileList.value.findIndex((item: any) => item.uuid === file.uuid)
    index !== -1 && fileList.value.splice(index, 1)
    emit('change', fileList.value)
    emit('delete', file)
  }
}

const handleCancel = () => {
  previewVisible.value = false
  previewTitle.value = ''
}

const beforeUpload = (file: File) => {
  const { maxSize, accept } = props
  const { name } = file
  isActMsg.value = isImgTypeByName(name)
  if (!isActMsg.value) {
    createMessage.error(t('component.upload.acceptUpload', [accept]))
    isActMsg.value = false
    // 防止弹出多个错误提示
    setTimeout(() => (isActMsg.value = true), 1000)
  }
  isLtMsg.value = file.size / 1024 / 1024 > maxSize
  if (isLtMsg.value) {
    createMessage.error(t('component.upload.maxSizeMultiple', [maxSize]))
    isLtMsg.value = false
    // 防止弹出多个错误提示
    setTimeout(() => (isLtMsg.value = true), 1000)
  }
  return (isActMsg.value && !isLtMsg.value) || Upload.LIST_IGNORE
}

async function customRequest(info: UploadRequestOption<any>) {
  const { api } = props
  if (!api || !isFunction(api)) {
    return warn('upload api must exist and be a function')
  }
  try {
    const res = await props.api?.({
      data: {
        ...(props.uploadParams || {})
      },
      file: info.file,
      name: props.name,
      filename: props.filename
    })
    info.onSuccess!(res.data)
    emit('change', fileList.value)
  } catch (e: any) {
    info.onError!(e)
  }
}
</script>

<style lang="less">
.ant-upload-select-picture-card i {
  color: #999;
  font-size: 32px;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
