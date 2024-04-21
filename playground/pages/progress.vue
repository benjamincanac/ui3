<template>
  <div class="flex flex-col gap-4 items-center">
    <div class="flex flex-col gap-4 w-48">
      <UProgress :model-value="progressValue" />

      <!-- Reference -->
      <ProgressRoot
        v-model="progressValue"
        :max="100"
        class="relative overflow-hidden bg-black rounded-full w-full sm:w-[300px] h-4 sm:h-5"
        style="transform: translateZ(0)"
      >
        <ProgressIndicator
          class="bg-white rounded-full w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
          :style="`transform: translateX(-${100 - progressValue}%)`"
        />
      </ProgressRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'radix-vue'

const progressValue = ref(10)

onMounted(() => {
  const timer = setTimeout(() => (progressValue.value = 66), 500)
  return () => clearTimeout(timer)
})
</script>
