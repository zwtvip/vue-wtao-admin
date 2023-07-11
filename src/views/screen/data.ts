import type { ModuleInfo } from '@/types/screen'
import { buildUUID } from '@/utils/uuid'

const modules = import.meta.glob('./modules/**/*index.vue', { eager: true })

const moduleList: ModuleInfo[] = []
const compInfo = {}

Object.keys(modules).forEach((key) => {
  const mod = modules[key]?.default || {}
  const modName = mod.name as string
  moduleList.push({
    moduleId: buildUUID(),
    [modName]: mod, // 组件
    moduleName: modName // 组件名称
  })
  compInfo[modName] = mod
})

export { moduleList, compInfo }
