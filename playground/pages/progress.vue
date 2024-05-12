<template>
  <div class="flex flex-col gap-4 items-center">
    <div class="flex flex-col gap-4 w-96">
      <UProgress />
      <UProgress animation="carousel-inverse" />
      <UProgress animation="swing" />
      <UProgress animation="elastic" />
      <UProgress :model-value="progressValue" />
      <UProgress :model-value="progressValue" inverted />
      <UProgress :model-value="progressValue" size="2xl" color="pink" status />
    </div>

    <div class="h-48 flex items-center gap-8">
      <UProgress orientation="vertical" />
      <UProgress animation="carousel-inverse" orientation="vertical" />
      <UProgress animation="swing" orientation="vertical" />
      <UProgress animation="elastic" orientation="vertical" />
      <UProgress :model-value="progressValue" orientation="vertical" size="xs" />
      <UProgress :model-value="progressValue" orientation="vertical" size="xs" inverted />
      <UProgress :model-value="progressValue" orientation="vertical" size="2xl" inverted status />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const progressValue = ref(10)

onMounted(() => {
  const timer = setTimeout(() => (progressValue.value = 66), 500)
  return () => clearTimeout(timer)
})
</script>
