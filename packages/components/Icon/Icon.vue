<template>
  <i class="lxx-icon">
    <slot v-bind="$attrs" />
  </i>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LxxIcon',
})
</script>

<style scoped>
@import './style.css';
</style>
