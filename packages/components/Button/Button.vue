<template>
  <component
    ref="_ref"
    class="lxx-button"
    :is="tag"
    :autofocus="autofocus"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`lxx-button--${type}`]: type,
      [`lxx-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    @click="
      (e: MouseEvent) =>
        useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)
    "
  >
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types'
import { throttle } from 'lodash-es'
import { BUTTON_GROUP_CTX_KEY } from './constants'

defineOptions({
  name: 'LxxButton',
})
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle: true,
  throttleDuration: 500,
})
const emits = defineEmits<ButtonEmits>()

const slots = defineSlots()
const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0)
const _ref = ref<HTMLButtonElement>()
const size = computed(() => ctx?.size ?? props?.size ?? '')
const type = computed(() => ctx?.type ?? props?.type ?? '')
const disabled = computed(() => ctx?.disabled || props?.disabled || false)

const handleBtnClick = (e: MouseEvent) => emits('click', e)
const handleBtnClickThrottle = throttle(
  handleBtnClick,
  props.throttleDuration,
  { trailing: false }
)

defineExpose<ButtonInstance>({
  ref: _ref,
  disabled,
  size,
  type,
})
</script>

<style scoped>
@import './style.css';
</style>
