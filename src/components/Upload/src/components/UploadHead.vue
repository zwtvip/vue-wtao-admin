<template>
  <Upload
    v-model:file-list="fileList"
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :accept="getStringAccept"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    :custom-request="customRequest"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loading" />
      <plus-outlined v-else />
      <div class="ant-upload-text">上传图片</div>
    </div>
  </Upload>
</template>
<script lang="ts" setup name="UploaddHead">
import { ref, toRefs } from 'vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { Upload } from 'ant-design-vue'
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

const { t } = useI18n()
const { createMessage } = useMessage()
const fileList = ref<UploadProps['fileList']>([])
const loading = ref<boolean>(false)
const imageUrl = ref<string>('')

const beforeUpload = (file: UploadProps['fileList'][number]) => {
  const { maxSize } = props
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
  if (!isJpgOrPng) {
    createMessage.error('请上传指定格式图片!')
  }
  // 设置最大值，则判断
  const isLtMax = file.size / 1024 / 1024 < maxSize
  if (!isLtMax) {
    createMessage.error(t('component.upload.maxSizeMultiple', [maxSize]))
  }
  return isJpgOrPng && isLtMax
}
async function customRequest(info: FileItem) {
  const { api } = props
  if (!api || !isFunction(api)) {
    return warn('upload api must exist and be a function')
  }
  try {
    info.status = UploadResultStatus.UPLOADING
    loading.value = true
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
    imageUrl.value = data.url
    loading.value = false
    if (fileList.value && fileList.value?.length > 0) {
      fileList.value[0].url = data.url
      emit('change', fileList.value)
    }
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
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;

  img {
    width: 100%;
    height: 100%;
  }
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
