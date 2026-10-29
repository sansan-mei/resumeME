<script lang="ts" setup>
defineProps<{
  content: string
}>()
</script>

<template>
  <p
    class="core-highlights text-xs tracking-wide leading-6 whitespace-normal break-words bg-[#f1f5fb] border-l-[3px] border-tBlue rounded-r px-3 py-2"
  >
    {{ content }}
  </p>
</template>

<style>
/* 打印 / 导出 PDF 时浏览器默认会丢弃背景色 */
.core-highlights {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
</style>
