<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{ content: string }>()
const paragraphs = computed(() =>
  props.content
    .split('\n')
    .filter(Boolean)
    .map((text) =>
      text
        .split(/(<[^>]+>)/)
        .filter(Boolean)
        .map((part) => ({
          emphasis: part.startsWith('<') && part.endsWith('>'),
          text: part.startsWith('<') && part.endsWith('>') ? part.slice(1, -1) : part,
        })),
    ),
)
</script>

<template>
  <div class="core-highlights text-xs leading-6 whitespace-normal break-words">
    <p
      v-for="(parts, index) in paragraphs"
      :key="index"
      :class="{ 'intro-lead': index === 0 && paragraphs.length > 1 }"
    >
      <template v-for="(part, partIndex) in parts" :key="partIndex">
        <strong v-if="part.emphasis" class="resume-emphasis">{{ part.text }}</strong>
        <span v-else>{{ part.text }}</span>
      </template>
    </p>
  </div>
</template>

<style scoped>
.core-highlights {
  border-left: 3px solid var(--resume-accent);
  background: var(--resume-surface);
  border-radius: 0 4px 4px 0;
  padding: 10px 12px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.intro-lead {
  font-size: 13px;
  line-height: 1.8;
  margin-bottom: 6px;
}
@media print {
  .core-highlights {
    break-inside: avoid;
  }
}
</style>
