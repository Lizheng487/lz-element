<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <lz-tooltip
        class="box-item"
        content="Top Left prompts info"
        placement="top-start"
      >
        <lz-button>top-start</lz-button>
      </lz-tooltip>
      <lz-tooltip
        class="box-item"
        content="Top Center prompts info"
        placement="top"
      >
        <lz-button>top</lz-button>
      </lz-tooltip>
      <lz-tooltip
        class="box-item"
        content="Top Right prompts info"
        placement="top-end"
      >
        <lz-button>top-end</lz-button>
      </lz-tooltip>
    </div>
    <div class="row">
      <lz-tooltip
        class="box-item"
        content="Left Top prompts info"
        placement="left-start"
      >
        <lz-button>left-start</lz-button>
      </lz-tooltip>
      <lz-tooltip
        class="box-item"
        content="Right Top prompts info"
        placement="right-start"
      >
        <lz-button>right-start</lz-button>
      </lz-tooltip>
    </div>
    <div class="row">
      <lz-tooltip
        class="box-item"
        content="Left Center prompts info"
        placement="left"
      >
        <lz-button class="mt-3 mb-3">left</lz-button>
      </lz-tooltip>
      <lz-tooltip
        class="box-item"
        content="Right Center prompts info"
        placement="right"
      >
        <lz-button>right</lz-button>
      </lz-tooltip>
    </div>
    <div class="row">
      <lz-tooltip
        class="box-item"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <lz-button>left-end</lz-button>
      </lz-tooltip>
      <lz-tooltip
        class="box-item"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <lz-button>right-end</lz-button>
      </lz-tooltip>
    </div>
    <div class="row center">
      <lz-tooltip
        class="box-item"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <lz-button>bottom-start</lz-button>
      </lz-tooltip>
      <lz-tooltip
        class="box-item"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <lz-button>bottom</lz-button>
      </lz-tooltip>
      <lz-tooltip
        class="box-item"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <lz-button>bottom-end</lz-button>
      </lz-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
