<script setup>
// import { ErMessage } from "eric-ui";
// function handleBtnClick() {
//   ErMessage.info("btn click");
// }
</script>

<template>
  <p>
    <lxx-button @click="handleBtnClick"> with throttle</lxx-button>
    <lxx-button :use-throttle="false" @click="handleBtnClick"
      >without throttle</lxx-button
    >
  </p>
</template>
