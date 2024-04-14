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
      <USlider color="green" />
      <USlider :min="4" :max="12" :step="2" />
    </div>
  </div>
</template>
