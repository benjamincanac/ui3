<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col gap-2">
    <UAlert title="Heads up!" />
    <UAlert
      description="You can add components to your app using the cli."
      title="Heads up!"
    />
    <UAlert
      icon="i-heroicons-command-line"
      description="You can add components to your app using the cli."
      title="Heads up!"
    />
    <UAlert
      description="You can add components to your app using the cli."
      :avatar="{ src: 'https://avatars.githubusercontent.com/u/739984?v=4' }"
      title="Heads up!"
    />
    <UAlert
      icon="i-heroicons-command-line"
      color="green"
      variant="subtle"
      title="Heads up!"
      description="You can add components to your app using the cli."
      closable
      :actions="[{ label: 'Action 1' }, { variant: 'ghost', color: 'gray', label: 'Action 2' }]"
    />
    <UAlert
      closable
      title="Heads up!"
      @update:show="() => { console.log('closed') }"
    />
    <UAlert
      :close="{ icon: 'i-heroicons-x-mark-20-solid' }"
      title="Heads up!"
    />
    <UAlert
      :actions="[{ label: 'Action 1' }, { variant: 'ghost', color: 'gray', label: 'Action 2', click(){ console.log('clicked') } }]"
      title="Heads up!"
    />
  </div>
</template>
