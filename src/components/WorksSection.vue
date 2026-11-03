<script lang="ts" setup>
import type { WorksProps } from '@/types/app'

defineProps<WorksProps>()
</script>

<template>
  <div class="col-span-5 grid gap-3">
    <article v-for="(item, index) in works" :key="index" class="work-entry">
      <header class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div class="min-w-0">
          <span class="text-sm text-tTitle font-bold mr-2">{{ item.company }}</span>
          <span class="text-xs">{{ item.depart }}</span>
          <span class="mx-1 text-xs text-tTitle">|</span>
          <span class="text-xs">{{ item.role }}</span>
        </div>
        <span class="shrink-0 text-right text-xs text-slate-600">{{ item.time }}</span>
      </header>
      <p v-if="item.bg" class="mt-1 text-xs leading-5">{{ item.bg }}</p>
    </article>
  </div>
</template>

<style scoped>
@media print {
  .work-entry {
    break-inside: avoid;
  }
}
</style>
