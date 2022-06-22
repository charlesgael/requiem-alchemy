<script lang="ts" setup>
import type { MenuOption, NInput, NTabs } from 'naive-ui'
import ingredients from '../../data/ingredients.json'
import { useShortcuts } from '~/composables/useShortcuts'

const textMenuOptions = (options: string[]): MenuOption[] => options.map(it => ({ label: it, key: it }))

// filter
const filterRef = ref<InstanceType<typeof NInput>>()
const filter = ref('')
const clearFilter = () => filter.value = ''
const filteredIngredients = computed(() => Object.keys(ingredients).filter((it): it is keyof typeof ingredients => new RegExp(filter.value, 'i').test(it)))
///

// selected item
const selectedText = ref<keyof typeof ingredients>()
const selected = computed<string[] | null>(() => (selectedText.value && ingredients[selectedText.value]) || null)
const changedItem = () => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  viewedEffect.value = ''
}
///

// selected effect
const tabInstRef = ref<InstanceType<typeof NTabs>>()
const viewedEffect = ref<string>('')
const compatibleIngredients = computed(() =>
  Object.entries(ingredients)
    .filter(([, effects]) => effects.includes(viewedEffect.value))
    .map(([name]) => name)
    .filter((it): it is keyof typeof ingredients => it !== selectedText.value),
)
///

// shortcuts
const useSearch = (e) => {
  e.preventDefault()
  filterRef.value?.focus()
  filter.value = ''
}
const selectFirst = () => {
  if (filteredIngredients.value.length > 0)
    selectedText.value = filteredIngredients.value[0]
}
const nextItem = () => {
  if (filteredIngredients.value.length > 0) {
    if (selectedText.value === undefined)
      selectedText.value = filteredIngredients.value[0]
    else
      selectedText.value = filteredIngredients.value[(filteredIngredients.value.indexOf(selectedText.value) + 1) % filteredIngredients.value.length]
  }
  viewedEffect.value = ''
}
const previousItem = () => {
  if (filteredIngredients.value.length > 0) {
    if (selectedText.value === undefined)
      selectedText.value = filteredIngredients.value[filteredIngredients.value.length - 1]
    else
      selectedText.value = filteredIngredients.value[(filteredIngredients.value.indexOf(selectedText.value) + filteredIngredients.value.length - 1) % filteredIngredients.value.length]
  }
  viewedEffect.value = ''
}
const nextEffect = () => {
  if (selected.value !== null) {
    if (viewedEffect.value === '')
      viewedEffect.value = selected.value[0]
    else
      viewedEffect.value = selected.value[(selected.value.indexOf(viewedEffect.value) + 1) % selected.value.length]
  }
}
const previousEffect = () => {
  if (selected.value !== null) {
    if (viewedEffect.value === '')
      viewedEffect.value = selected.value[selected.value.length - 1]
    else
      viewedEffect.value = selected.value[(selected.value.indexOf(viewedEffect.value) + selected.value.length - 1) % selected.value.length]
  }
}
useShortcuts({
  '/': useSearch,
  'control+f': useSearch,
  'enter': selectFirst,
  'arrowdown': nextItem,
  'arrowup': previousItem,
  'arrowleft': previousEffect,
  'arrowright': nextEffect,
})
///
</script>

<template lang="pug">
n-layout(position="absolute" has-sider)
  n-layout-sider(bordered :native-scrollbar="false" :width="372")
    n-input(v-model:value="filter" placeholder="Filter..." @focus="clearFilter" ref="filterRef")
    n-menu(:options="textMenuOptions(filteredIngredients)" v-model:value="selectedText" @update:value="changedItem")
  n-layout(:native-scrollbar="false")
    .selected-item(v-if="selected != null")
      Ingredient(:name="selectedText || 'unknown'" :effects="selected")
      .title {{selectedText}}
      n-tabs(type="segment" v-model:value="viewedEffect" ref="tabInstRef")
        n-tab-pane(v-for="effect in selected" :key="effect" :name="effect")
          .flex.flex-wrap.mx-4
            Ingredient(v-for="compatible of compatibleIngredients" :key="compatible" :name="compatible" :effects="ingredients[compatible]")
</template>

<style lang="sass" scoped>
.selected-item
  @apply flex flex-col items-center py-8 space-y-2
  .title
    @apply text-xl

  .effects
    @apply grid grid-cols-4 w-200

    .effect
      @apply text-center
</style>

<route lang="yaml">
meta:
  template: default
</route>
