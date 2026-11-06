<script lang="ts" setup>
import type { Direction } from '@/types/app'

interface Props {
  title: string
  // 方向
  direction?: Direction
}

const { direction = 'left' } = defineProps<Props>()
</script>

<template>
  <div v-if="direction == 'top' && title" class="section-heading-wrap">
    <h4 class="section-heading text-base text-tTitle font-bold">
      {{ title }}
    </h4>
  </div>
  <section
    class="grid border-t-2 p-2.5 border-black pr-1 mt-1"
    :class="[direction === 'left' ? 'grid-cols-6' : 'grid-cols-5']"
  >
    <div v-if="direction == 'left'">
      <h4 class="section-heading text-base text-tTitle font-bold">
        {{ title }}
      </h4>
    </div>
    <div class="col-span-5 grid gap-x-6 gap-y-1" style="grid-template-columns: repeat(1, 1fr)">
      <slot />
    </div>
  </section>
</template>

<style scoped>
@media print {
  .section-heading {
    break-after: avoid;
  }

  /* Chromium 打印常忽略 break-after，用占位高度让标题与正文首段同页 */
  .section-heading-wrap {
    break-inside: avoid;
  }

  .section-heading-wrap::after {
    content: '';
    display: block;
    height: 6rem;
    margin-bottom: -6rem;
  }
}
</style>
