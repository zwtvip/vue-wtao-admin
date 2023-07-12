import { defineStore } from 'pinia'
import type { ModuleInfo, CardInfo } from '@/types/screen'
import { MODULE_LIST_KEY, CARD_LIST_KEY } from '@/enums/cacheEnum'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import { buildUUID } from '@/utils/uuid'
import { moduleList } from '@/views/screen/data'

interface ScreenState {
  moduleList: ModuleInfo[]
  cardList: CardInfo[]
  headerHeight: number
  gutter: number
}

export const useScreenStore = defineStore({
  id: 'app-screen',
  state: (): ScreenState => ({
    moduleList: [],
    cardList: [],
    headerHeight: 76,
    gutter: 20
  }),
  getters: {
    getModuleList(): ModuleInfo[] {
      return this.moduleList || getAuthCache<ModuleInfo[]>(MODULE_LIST_KEY) || []
    },
    getCardList(): CardInfo[] {
      const { headerHeight, gutter } = this
      const realWidth = window.innerWidth
      const realHeight = window.innerHeight - headerHeight
      const width = parseInt((realWidth - 5 * gutter) / 4)
      const height = parseInt((realHeight - 4 * gutter) / 3)
      this.cardList = []
      // 初始化卡片数据
      for (let i = 0; i < 4; i++) {
        this.cardList.push({
          cardId: buildUUID(),
          cardName: '测试卡片' + (i + 1),
          moduleName: 'Position',
          x: i * (width + gutter),
          y: 0,
          h: height,
          w: width,
          parent: true,
          active: false
        })
      }
      return getAuthCache<CardInfo[]>(CARD_LIST_KEY) && getAuthCache<CardInfo[]>(CARD_LIST_KEY).length > 0
        ? getAuthCache<CardInfo[]>(CARD_LIST_KEY)
        : this.cardList
    }
  },
  actions: {
    setModuleList() {
      this.moduleList = moduleList
      setAuthCache(MODULE_LIST_KEY, moduleList)
    },
    setCardList(cardList: CardInfo[]) {
      this.cardList = cardList
      setAuthCache(CARD_LIST_KEY, cardList)
    }
  }
})
