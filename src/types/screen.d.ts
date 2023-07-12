import { Component } from 'vue'

// 模块信息
export interface ModuleInfo {
  moduleId: string
  moduleName: string
  fileName: sting
  checked: boolean
  [key: string]: Component | string | boolean
}

// 卡片信息
export interface CardInfo {
  cardId: string
  cardName: string
  moduleName: string
  x: number
  y: number
  h: number
  w: number
  parent: boolean
  active: boolean
  [key: string]: Component | string | boolean | number
}

// 主题列表
export interface ThemeItem {
  themeId: string
  themeName: string
  imgUrl: string
  createTime: string
  updateTime: string
  images: string[]
}

// 卡片列表
export interface CardItem {
  cardId: string
  cardName: string
  imgUrl: string
  createTime: string
  updateTime: string
  images: string[]
}
