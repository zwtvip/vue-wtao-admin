import type { ModuleInfo } from '@/types/screen'
import { buildUUID } from '@/utils/uuid'

const modules = import.meta.glob('./modules/**/*index.vue', { eager: true })

const moduleList: ModuleInfo[] = []
const compInfo = {}

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modName = mod.name
  let moduleName = ''
  let fileName = ''
  if (modName && modName.indexOf('-') > -1) {
    moduleName = modName.split('-')[0]
    fileName = modName.split('-')[1]
  } else {
    moduleName = modName
    fileName = modName
  }
  moduleList.push({
    moduleId: buildUUID(),
    [modName]: mod, // 组件
    checked: false,
    moduleName, // 组件名称
    fileName // 文件名称
  })
  compInfo[moduleName] = mod
})

export { moduleList, compInfo }
