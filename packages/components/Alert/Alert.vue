<template>
  <transition name="lxx-alert-fade">
    <div
      v-show="visible"
      class="lxx-alert"
      role="alert"
      :class="{
        [`lxx-alert__${type}`]: type,
        [`lxx-alert__${effect}`]: effect,
        'text-center': center,
      }"
    >
      <lxx-icon
        v-if="showIcon"
        class="lxx-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      />
      <div class="lxx-alert__content">
        <span
          class="lxx-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="lxx-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="lxx-alert__close" v-if="closable">
          <lxx-icon @click.stop="close" icon="xmark" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { AlertProps, AlertEmits, AlertInstance } from './types'
import { typeIconMap } from '@lxx-ui/utils'
import { computed, ref } from 'vue'

import LxxIcon from '../Icon/Icon.vue'

defineOptions({
  name: 'LxxAlert',
})

const props = withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
  type: 'info',
  closable: true,
})

const emits = defineEmits<AlertEmits>()
const slots = defineSlots()

const visible = ref(true)

const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')
const withDescription = computed(() => props.description || slots.default)

function close() {
  visible.value = false
  emits('close')
}

function open() {
  visible.value = true
}

defineExpose<AlertInstance>({
  close,
  open,
})
</script>

<style scoped>
@import './style.css';
</style>
