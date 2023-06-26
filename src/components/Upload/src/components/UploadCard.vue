<template>
  <div>
    <Upload
      v-model:file-list="fileList"
      list-type="picture-card"
      :accept="getStringAccept"
      :before-upload="beforeUpload"
      :custom-request="customRequest"
      @preview="handlePreview"
    >
      <div v-if="fileList.length < maxNumber">
        <plus-outlined />
        <div style="margin-top: 8px">上传图片</div>
      </div>
    </Upload>
    <Modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </Modal>
  </div>
</template>
<script lang="ts" setup name="UploaddCard">
import { ref, toRefs } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { Upload, Modal } from 'ant-design-vue'
import type { UploadProps } from 'ant-design-vue'
import { useMessage } from '@/hooks/web/useMessage'
import { isFunction } from '@/utils/is'
import { warn } from '@/utils/log'
import { useI18n } from '@/hooks/web/useI18n'
import { FileItem, UploadResultStatus } from '../typing'
import { basicProps } from '../props'
import { useUploadType } from '../useUpload'

const emit = defineEmits(['change'])
const props = defineProps({
  ...basicProps
})
const { accept, helpText, maxNumber, maxSize } = toRefs(props)
const { getStringAccept } = useUploadType({
  acceptRef: accept,
  helpTextRef: helpText,
  maxNumberRef: maxNumber,
  maxSizeRef: maxSize
})
const previewVisible = ref(false)
const previewImage = ref('')
const previewTitle = ref('')

const { t } = useI18n()
const { createMessage } = useMessage()
const fileList = ref<UploadProps['fileList']>([])

const handleCancel = () => {
  previewVisible.value = false
  previewTitle.value = ''
}
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

const beforeUpload = (file: UploadProps['fileList'][number]) => {
  const { maxSize } = props
  const isJpgOrPng = accept.value.indexOf(file.type.split('/')[1]) > -1 ? true : false
  if (!isJpgOrPng) {
    createMessage.error('请上传指定格式图片!')
  }
  const isLtMax = file.size / 1024 / 1024 < maxSize
  if (!isLtMax) {
    createMessage.error(t('component.upload.maxSizeMultiple', [maxSize]))
  }
  return (isJpgOrPng && isLtMax) || Upload.LIST_IGNORE
}

async function customRequest(info: FileItem) {
  const { api } = props
  if (!api || !isFunction(api)) {
    return warn('upload api must exist and be a function')
  }
  try {
    info.status = UploadResultStatus.UPLOADING
    const { data } = await props.api?.({
      data: {
        ...(props.uploadParams || {})
      },
      file: info.file,
      name: props.name,
      filename: props.filename
    })
    info.status = UploadResultStatus.SUCCESS
    info.responseData = data
    fileList.value?.forEach((item) => {
      if (info.file.uid === item.uid) {
        item.status = UploadResultStatus.SUCCESS
        item.url = data.url
      }
    })
    emit('change', fileList.value)
    return {
      success: true,
      error: null
    }
  } catch (e) {
    console.log(e)
    info.status = UploadResultStatus.ERROR
    return {
      success: false,
      error: e
    }
  }
}
</script>

<style lang="less">
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
