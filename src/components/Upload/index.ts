import { withInstall } from '@/utils'
import basicUpload from './src/BasicUpload.vue'
import uploadHead from './src/components/UploadHead.vue'
import uploadCard from './src/components/UploadCard.vue'

export const BasicUpload = withInstall(basicUpload)
export const UploadHead = withInstall(uploadHead)
export const UploadCard = withInstall(uploadCard)
