<template>
  <div class="lxx-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch, watchEffect } from 'vue'
import type { CollapseEmits, CollapseItemName, CollapseProps } from './types'
import { debugWarn } from '@lxx-ui/utils'
import { COLLAPSE_CTX_KEY } from './constants'

const COMP_NAME = 'LxxCollapse' as const

// 定义组件名称
defineOptions({
  name: COMP_NAME,
})
// 定义组件属性
const props = defineProps<CollapseProps>()
// 定义组件事件
const emits = defineEmits<CollapseEmits>()
// 展开的折叠项
const activeNames = ref(props.modelValue)
// 提供状态
provide(COLLAPSE_CTX_KEY, {
  activeNames, // 展开的项
  handleItemClick, // 折叠项的点击事件
})

watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    debugWarn(COMP_NAME, 'accordion mode should only have one active item')
  }
})

// 监听展开项的变化，进行更新
watch(
  () => props.modelValue,
  (newNames) => updateActiveNames(newNames)
)

// 折叠项点击事件
function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value]

  if (props.accordion) {
    _activeNames = [_activeNames[0] === item ? '' : item]
    updateActiveNames(_activeNames)
    return
  }

  const index = _activeNames.indexOf(item)
  if (index > -1) {
    _activeNames.splice(index, 1)
  } else {
    _activeNames.push(item)
  }
  updateActiveNames(_activeNames)
}
// 设置展开的项
function updateActiveNames(newNames: CollapseItemName[]) {
  activeNames.value = newNames
  emits('update:modelValue', newNames)
  emits('change', newNames)
}
</script>

<style scoped>
@import './style.css';
</style>
