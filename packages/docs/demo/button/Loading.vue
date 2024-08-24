<template>
  <div>
    <lxx-button type="primary" loading>Loading</lxx-button>
    <lxx-button type="primary" loading-icon="circle-notch" loading
      >Loading</lxx-button
    >
    <lxx-button type="primary" loading>
      <template #loading>
        <lxx-icon style="margin-right: 6px" icon="star" spin />
      </template>
      Loading
    </lxx-button>
  </div>
</template>
