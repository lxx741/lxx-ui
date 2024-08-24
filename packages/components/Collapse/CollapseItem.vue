<template>
  <div
    class="lxx-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="lxx-collapse-item__header"
      :id="`item-header-${name}`"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      @click="handleClick"
    >
      <span class="lxx-collapse-item__title">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <lxx-icon icon="angle-right" class="header-angle" />
    </div>
    <transition name="slide" v-on="transitionEvents">
      <div class="lxx-collapse-item__wapper" v-show="isActive">
        <div class="lxx-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue'
import type { CollapseItemProps } from './types'
import { COLLAPSE_CTX_KEY } from './constants'
import transitionEvents from './transitionEvents'
import LxxIcon from '../Icon/Icon.vue'

defineOptions({ name: 'LxxCollapseItem' })
const props = defineProps<CollapseItemProps>()
const ctx = inject(COLLAPSE_CTX_KEY, void 0)
const isActive = computed(() => ctx?.activeNames.value?.includes(props.name))
function handleClick() {
  if (props.disabled) return
  ctx?.handleItemClick(props.name)
}
</script>

<style scoped>
@import './style.css';
</style>
