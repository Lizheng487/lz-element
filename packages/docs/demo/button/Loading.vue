<template>
  <div>
    <lz-button type="primary" loading>Loading</lz-button>
    <lz-button type="primary" loading-icon="circle-notch" loading
      >Loading</lz-button
    >
    <lz-button type="primary" loading>
      <template #loading>
        <lz-icon style="margin-right: 6px" icon="star" spin />
      </template>
      Loading
    </lz-button>
  </div>
</template>
