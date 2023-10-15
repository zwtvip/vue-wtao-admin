<template>
  <PageWrapper title="Tree基础示例">
    <Row :gutter="[16, 16]">
      <Col :span="8">
        <BasicTree title="基础示例，默认展开第一层" :treeData="treeData" defaultExpandLevel="1">
          <template #title> 123123 </template>
        </BasicTree>
      </Col>
      <Col :span="8">
        <BasicTree title="可勾选，默认全部展开" :treeData="treeData" :checkable="true" defaultExpandAll />
      </Col>
      <Col :span="8">
        <BasicTree title="指定默认展开/勾选示例" :treeData="treeData" :checkable="true" :expandedKeys="['0-0']" :checkedKeys="['0-0']" />
      </Col>
      <Col :span="8">
        <BasicTree title="懒加载异步树" ref="asyncTreeRef" :treeData="tree" :load-data="onLoadData" />
      </Col>
      <Col :span="8">
        <Card title="异步数据，默认展开">
          <template #extra>
            <a-button @click="loadTreeData" :loading="treeLoading">加载数据</a-button>
          </template>
          <Spin :spinning="treeLoading">
            <BasicTree ref="asyncExpandTreeRef" :treeData="tree2" />
          </Spin>
        </Card>
      </Col>
      <Col :span="8">
        <Card title="BasicTree内置加载">
          <template #extra>
            <a-button @click="loadTreeData2" :loading="treeLoading">请求数据</a-button>
          </template>
          <BasicTree ref="loadTreeRef" :treeData="tree2" :loading="treeLoading" />
        </Card>
      </Col>
      <Col :span="8">
        <BasicTree
          ref="treeRef"
          title="父子级取消关联，改成手动关联, 实现半选、全选"
          :treeData="treeData"
          :checkable="true"
          :check-strictly="true"
          :expandedKeys="['0-0']"
          @check="handleCheck"
        />
      </Col>
      <Col :span="8">
        <a-button type="primary" @click="handleClick">获取选中节点</a-button>
      </Col>
    </Row>
  </PageWrapper>
</template>
<script lang="ts" setup>
import { nextTick, ref, unref } from 'vue'
import { BasicTree, TreeActionType, TreeItem } from '@/components/Tree'
import { treeData } from './data'
import { PageWrapper } from '@/components/Page'
import { Card, Row, Col, Spin } from 'ant-design-vue'
import { cloneDeep, uniq } from 'lodash-es'
import { isArray } from '@/utils/is'

const asyncTreeRef = ref<Nullable<TreeActionType>>(null)
const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null)
const loadTreeRef = ref<Nullable<TreeActionType>>(null)
const tree2 = ref<TreeItem[]>([])
const treeLoading = ref(false)
const checkedList = ref<string[]>([])
const halfCheckedKeys = ref<string[]>([])
const treeRef = ref<Nullable<TreeActionType>>(null)

function handleCheck(checkedKeys, e) {
  // console.log('checkedKeys', checkedKeys)
  // console.log('e', e)
  // 获取所有父节点
  const parentNodes = getParentNodes(treeData, e.node.key)
  if (e.checked) {
    // 遍历父节点并且判断父节点是否半选或全选
    parentNodes.forEach((item) => {
      const keys = item.children.map((item) => item.key)
      if (isInclude(checkedKeys.checked, keys)) {
        !checkedKeys.checked.includes(item.key) && checkedKeys.checked.push(item.key)
        delHalfCheckedKeys(checkedKeys.halfChecked, item.key)
      } else {
        !checkedKeys.halfChecked.includes(item.key) && checkedKeys.halfChecked.push(item.key)
      }
    })
    // 获取该节点下所有子集
    const nodeChilds = getNodeChilds(e.node)
    const keys = nodeChilds.map((item) => item.key)
    checkedKeys.checked = Array.from(new Set([...checkedKeys.checked, ...keys]))
  } else {
    // 取消选中，让其子节点全部取消选中
    const nodeChilds = getNodeChilds(e.node)
    const childKeys = nodeChilds.map((item) => item.key)
    childKeys.forEach((key) => {
      delCheckedKeys(checkedKeys.checked, key)
      delHalfCheckedKeys(checkedKeys.halfChecked, key)
    })
    // 取消选中，则让父节点取消全选或者半选
    // 获取当前节点的兄弟节点集合
    const brotherNodes = getParentChilds(treeData, e.node.key)
    const keys = brotherNodes.map((item: any) => item.key)
    const checkedList = intersection(keys, checkedKeys.checked)
    // 兄弟节点存在选中 则父节点半选 并 取消父节点全选
    if (checkedList.length > 0) {
      parentNodes.forEach((item) => {
        !checkedKeys.halfChecked.includes(item.key) && checkedKeys.halfChecked.push(item.key)
        delCheckedKeys(checkedKeys.checked, item.key)
      })
    }
    // 兄弟节点不存在全选 则父节点取消半选
    if (checkedList.length === 0) {
      // 判断父节点的兄弟节点是否选中
      // 获取父节点的所有兄弟节点集合
      const parentBrotherKeys: string[] = []
      parentNodes.forEach((item) => {
        const parentChilds = getParentChilds(treeData, item.key)
        const keys = parentChilds.map((item: any) => item.key)
        parentBrotherKeys.push(...keys)
      })
      const interCheckedKeys = intersection(parentBrotherKeys, checkedKeys.checked)
      // 父节点存在选中节点
      if (interCheckedKeys.length > 0) {
        interCheckedKeys.forEach((key) => {
          const parentNodes = getParentNodes(treeData, key)
          parentNodes.forEach((item) => {
            !checkedKeys.halfChecked.includes(item.key) && checkedKeys.halfChecked.push(item.key)
          })
        })
      }
      // 不存在选中节点
      if (interCheckedKeys.length === 0) {
        parentBrotherKeys.forEach((key) => {
          delHalfCheckedKeys(checkedKeys.halfChecked, key)
        })
      }
      // 判断父节点的子集是否存在选中
      parentNodes.forEach((item) => {
        const nodeChilds = getNodeChilds(item)
        const keys = nodeChilds.map((item) => item.key)
        const inter = intersection(keys, checkedKeys.checked)
        inter.length === 0 && delHalfCheckedKeys(checkedKeys.halfChecked, item.key)
        inter.length > 0 && !checkedKeys.halfChecked.includes(item.key) && checkedKeys.halfChecked.push(item.key)
      })
    }
  }
  halfCheckedKeys.value = checkedKeys.halfChecked
  checkedList.value = checkedKeys.checked
}

// 判断一个数组的数据是否全包含另外一个数组
const isInclude = (a, b) => b.every((key) => a.includes(key))

// 获取两个数组的交集
function intersection(a, b) {
  return a.filter(function (key) {
    return b.indexOf(key) > -1
  })
}

// 根据节点查找其所有父节点
function getParentNodes(list, key) {
  for (let i in list) {
    if (list[i].key === key) {
      return []
    }
    if (list[i].children) {
      let node = getParentNodes(list[i].children, key)
      if (node !== undefined) {
        return node.concat(list[i])
      }
    }
  }
}

// 根据节点获取其兄弟节点集合
function getParentChilds(childs, findKey) {
  let parentChilds = []
  for (let i = 0, len = childs.length; i < len; i++) {
    let item = childs[i]
    if (item.key !== findKey && item.children && item.children.length > 0) {
      parentChilds = getParentChilds(item.children, findKey)
    }
    if (item.key == findKey) {
      parentChilds = childs
    }
    if (parentChilds.length > 0) {
      break
    }
  }
  return parentChilds
}

// 根据节点获取其所有子节点
function getNodeChilds(node) {
  const descendants: any[] = []
  function traverse(node) {
    if (node && node.children) {
      node.children.forEach((child) => {
        descendants.push(child)
        traverse(child)
      })
    }
  }
  traverse(node)
  return descendants
}

// 查找节点
function findNodeByKey(treeData, targetKey) {
  if (!treeData) {
    return null
  }
  for (let i = 0; i < treeData.length; i++) {
    if (treeData[i].key === targetKey) {
      return treeData[i]
    } else {
      const result = findNodeByKey(treeData[i].children, targetKey)
      if (result) {
        return result
      }
    }
  }
  return null
}

// 全选删除
function delCheckedKeys(checkedKeys, key) {
  if (checkedKeys.includes(key)) {
    const i = checkedKeys.indexOf(key)
    checkedKeys.splice(i, 1)
  }
}

// 半选删除
function delHalfCheckedKeys(halfcheckedKeys, key) {
  if (halfcheckedKeys.includes(key)) {
    const i = halfcheckedKeys.indexOf(key)
    halfcheckedKeys.splice(i, 1)
  }
}

// function getTree() {
//   const tree = unref(treeRef)
//   if (!tree) {
//     throw new Error('tree is null!')
//   }
//   return tree
// }

function handleClick() {
  // console.log(halfCheckedKeys.value)
  console.log(checkedList.value)
  const keys = JSON.parse(JSON.stringify(checkedList.value))
  const list = JSON.parse(JSON.stringify(treeData))
  // const keys = getTree().getCheckedKeys()
  console.log(keys)
  let checkedNodes: any[] = []
  const childNodes: any[] = []
  keys.forEach((key) => {
    const node = findNodeByKey(list, key)
    checkedNodes.push(node)
  })
  checkedNodes.forEach((item: any) => {
    getNodeChilds(item).length > 0 && childNodes.push(...getNodeChilds(item))
  })
  checkedNodes = [...checkedNodes, ...childNodes]
  checkedNodes.forEach((item) => item && item.children && delete item.children)
  console.log(checkedNodes)
  const duplicates = checkedNodes.filter((value, i) => checkedNodes.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(value)) !== i)
  console.log(duplicates)
  const duplicatesKeys = duplicates.map((item) => item && item.key)
  const difference = keys.filter((key) => !duplicatesKeys.includes(key))
  const arr: any[] = []
  difference.forEach((key) => {
    const node = findNodeByKey(treeData, key)
    arr.push(node)
  })
  console.log(arr.map((item) => item))
}

function loadTreeData() {
  treeLoading.value = true
  // 以下是模拟异步获取数据
  setTimeout(() => {
    // 设置数据源
    tree2.value = cloneDeep(treeData)
    treeLoading.value = false
    // 展开全部
    nextTick(() => {
      console.log(unref(asyncExpandTreeRef))
      unref(asyncExpandTreeRef)?.expandAll(true)
    })
  }, 2000)
}
function loadTreeData2() {
  treeLoading.value = true
  // 以下是模拟异步获取数据
  setTimeout(() => {
    // 设置数据源
    tree2.value = cloneDeep(treeData)
    treeLoading.value = false
  }, 2000)
}

const tree = ref([
  {
    title: 'parent ',
    key: '0-0'
  }
])

function onLoadData(treeNode) {
  return new Promise((resolve: (value?: unknown) => void) => {
    if (isArray(treeNode.children) && treeNode.children.length > 0) {
      resolve()
      return
    }
    setTimeout(() => {
      const asyncTreeAction: TreeActionType | null = unref(asyncTreeRef)
      if (asyncTreeAction) {
        const nodeChildren = [
          { title: `Child Node ${treeNode.eventKey}-0`, key: `${treeNode.eventKey}-0` },
          { title: `Child Node ${treeNode.eventKey}-1`, key: `${treeNode.eventKey}-1` }
        ]
        asyncTreeAction.updateNodeByKey(treeNode.eventKey, { children: nodeChildren })
        asyncTreeAction.setExpandedKeys(uniq([treeNode.eventKey, ...asyncTreeAction.getExpandedKeys()]))
      }

      resolve()
      return
    }, 300)
  })
}
</script>
