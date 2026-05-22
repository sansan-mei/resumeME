<script lang="ts" setup>
defineProps<{
  content: string
}>()
</script>

<template>
  <p class="text-xs tracking-wide leading-6 whitespace-normal break-words">
    {{ content }}
  </p>
</template>

<style></style>
