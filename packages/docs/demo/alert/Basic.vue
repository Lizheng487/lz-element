<template>
  <h2>通过 slot 传入内容</h2>
  <div style="max-width: 600px">
    <lz-alert type="success">Success alert</lz-alert>
    <lz-alert type="info">Info alert</lz-alert>
    <lz-alert type="warning">Warning alert</lz-alert>
    <lz-alert type="danger">Error alert</lz-alert>
  </div>
  <h2>通过 prop 传入内容</h2>
  <div style="max-width: 600px">
    <lz-alert type="success" title="Success alert" />
    <lz-alert type="info" title="Info alert" />
    <lz-alert type="warning" title="Warning alert" />
    <lz-alert type="danger" title="Error alert" />
  </div>
</template>
