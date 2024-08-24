<template>
  <h2>通过 slot 传入内容</h2>
  <div style="max-width: 600px">
    <lxx-alert type="success">Success alert</lxx-alert>
    <lxx-alert type="info">Info alert</lxx-alert>
    <lxx-alert type="warning">Warning alert</lxx-alert>
    <lxx-alert type="danger">Error alert</lxx-alert>
  </div>
  <h2>通过 prop 传入内容</h2>
  <div style="max-width: 600px">
    <lxx-alert type="success" title="Success alert" />
    <lxx-alert type="info" title="Info alert" />
    <lxx-alert type="warning" title="Warning alert" />
    <lxx-alert type="danger" title="Error alert" />
  </div>
</template>
