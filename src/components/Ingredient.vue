<script lang="ts" setup>
const { name, effects } = defineProps<{
  name: string
  effects: string[]
}>()
</script>

<template lang="pug">
.ingredient.skyfont
  .ingredient-name {{name}}
  .ingredient-effects
    .ingredient-effect(v-for="effect in effects" :key="effect") {{effect}}
</template>

<style lang="sass" scoped>
.ingredient
  @apply border border-gray-500 border-width-2
  @apply rounded rounded-lg
  @apply bg-black text-white
  @apply px-6 py-3 mb-3 mr-3 w-80

  .ingredient-name
    @apply text-center uppercase text-lg
    @apply border-b border-gray-500
    @apply mb-2

  .ingredient-effects
    @apply grid grid-cols-2

    .ingredient-effect
      @apply text-center
</style>
