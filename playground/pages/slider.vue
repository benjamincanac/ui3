<template>
  <div class="flex flex-col gap-4 items-center">
    <div class="flex gap-4">
      <USlider size="2xs" />
      <USlider size="xs" />
      <USlider size="sm" />
      <USlider size="md" />
      <USlider size="lg" />
      <USlider size="xl" />
    </div>

    <div class="flex gap-4">
      <USlider disabled />
      <USlider :default-value="100" />
      <USlider color="green" />
      <USlider inverted />
      <USlider :min="4" :max="12" :step="2" />
    </div>
    <div class="flex gap-4">
      <USlider :model-value="[0, 10]" />
      <USlider :model-value="[0, 10, 30]" />
      <USlider :model-value="[0, 30]" :min-steps-between-thumbs="20" />
      <USlider :default-value="[0, 10]" />
    </div>
  </div>
</template>
