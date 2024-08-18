<template>
  <i
    class="lxx-icon"
    :class="[`lxx-icon-${props.type}`]"
    :style="customStyles"
    v-bind="$attrs"
  >
    <FontAwesomeIcon v-bind="filterProps" />
  </i>
</template>

<script setup lang="ts">
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { omit } from 'lodash-es'
import { computed } from 'vue'

library.add(faUser)

defineOptions({
  name: 'LxxIcon',
  inheritAttrs: false,
})

const props = defineProps<IconProps>()
const filterProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => ({ color: props.color ?? void 0 }))
</script>

<style scoped>
@import './style.css';
</style>
