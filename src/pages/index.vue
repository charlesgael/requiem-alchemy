<script lang="ts" setup>
const router = useRouter()
const goIngredient = () => router.push('/ingredient')

// const mods = Object.values(ingr)
//   .flatMap(it => it)
//   .sort()
//   .filter((it, idx, arr) => arr.indexOf(it) === idx)
</script>

<template lang="pug">
div.middle.h-50.w-100.flex.flex-col.items-stretch
  n-button.flex-1(@click="goIngredient")
    | By ingredient
  n-button.flex-1(disabled)
    | By effect
</template>

<style lang="sass" scoped>
</style>

<route lang="yaml">
meta:
  template: default
</route>
