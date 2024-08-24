<script setup>
// import { LxxMessage } from 'lxx-ui'

function handleClose() {
  // LxxMessage.info('close callback')
}
</script>
<template>
  <div class="basic block">
    <lxx-alert title="Unclosable alert" type="success" :closable="false" />
    <lxx-alert
      title="Alert with callback"
      type="warning"
      @close="handleClose"
    />
  </div>
</template>
