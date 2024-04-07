<template>
  <div class="w-full max-w-xs mx-4">
    <div class="text-white leading-5 font-semibold">
      Radix Primitives
    </div>
    <div class="text-white leading-5">
      An open-source UI component library.
    </div>
    <UDivider icon="i-simple-icons-nuxtdotjs" type="dashed" />
    <div class="flex h-24 items-center">
      <div class="text-white leading-5">
        Blog
      </div>
      <UDivider
        :avatar="{ src: 'https://avatars.githubusercontent.com/u/739984?v=4' }"
        decorative
        orientation="vertical"
      />
      <div class="text-white leading-5">
        Docs
      </div>
      <UDivider decorative orientation="vertical">
        <UAvatar src="https://avatars.githubusercontent.com/u/13056429?v=4" />
      </UDivider>
      <div class="text-white leading-5">
        Source
      </div>
    </div>
    <UDivider label="As simple as it gets" type="dotted" size="lg" color="yellow" />
  </div>
</template>
