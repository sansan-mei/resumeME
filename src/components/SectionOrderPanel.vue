<script lang="ts" setup>
import type { SectionKey } from '@/types/app'
import { computed, ref } from 'vue'

const props = defineProps<{
  /** 当前显示的板块及顺序 */
  order: SectionKey[]
  /** 全部可用板块 */
  all: SectionKey[]
}>()

const emit = defineEmits<{
  change: [order: SectionKey[]]
  reset: []
}>()

const LABELS: Record<SectionKey, string> = {
  highlights: '个人简介',
  socials: '社交信息',
  mySkills: '技术栈',
  works: '工作经历',
  skills: '专业技能',
  products: '项目经历',
  educations: '教育经历',
}

const collapsed = ref(false)
const dragging = ref<SectionKey | null>(null)
const overKey = ref<SectionKey | null>(null)
const copied = ref(false)

// 显示中的板块按当前顺序在前，隐藏的板块排在后面
const items = computed(() => [
  ...props.order,
  ...props.all.filter((key) => !props.order.includes(key)),
])

const isVisible = (key: SectionKey) => props.order.includes(key)

function onDragStart(key: SectionKey, event: DragEvent) {
  dragging.value = key
  event.dataTransfer?.setData('text/plain', key)
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'
}

function onDrop(target: SectionKey) {
  const from = dragging.value
  dragging.value = null
  overKey.value = null
  if (!from || from === target) return

  const list = [...items.value]
  const fromIndex = list.indexOf(from)
  const toIndex = list.indexOf(target)
  list.splice(fromIndex, 1)
  // 删除后直接插回目标原位置：往下拖落在目标之后，往上拖落在目标之前
  list.splice(toIndex, 0, from)
  emit(
    'change',
    list.filter((key) => isVisible(key)),
  )
}

function toggle(key: SectionKey) {
  const visible = new Set(props.order)
  if (visible.has(key)) visible.delete(key)
  else visible.add(key)
  emit(
    'change',
    items.value.filter((k) => visible.has(k)),
  )
}

async function copyConfig() {
  const text = `sectionOrder: [${props.order.map((key) => `'${key}'`).join(', ')}],`
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    window.prompt('复制以下配置到 content.ts', text)
  }
}
</script>

<template>
  <aside class="section-order-panel">
    <header class="flex items-center justify-between gap-2">
      <strong class="text-sm">板块顺序</strong>
      <button type="button" class="text-xs text-gray-500" @click="collapsed = !collapsed">
        {{ collapsed ? '展开' : '收起' }}
      </button>
    </header>

    <template v-if="!collapsed">
      <p class="mt-1 text-xs text-gray-500">拖动排序，勾选控制显示；仅开发模式可见</p>
      <ul class="mt-2 space-y-1">
        <li
          v-for="key of items"
          :key="key"
          draggable="true"
          :data-key="key"
          :class="[
            'flex items-center gap-2 rounded border px-2 py-1 text-sm cursor-move select-none',
            isVisible(key) ? 'bg-white' : 'bg-gray-50 text-gray-400',
            dragging === key && 'opacity-40',
            overKey === key && dragging !== key && 'border-blue-400',
          ]"
          @dragstart="onDragStart(key, $event)"
          @dragover.prevent="overKey = key"
          @dragleave="overKey = overKey === key ? null : overKey"
          @drop.prevent="onDrop(key)"
          @dragend="dragging = null; overKey = null"
        >
          <span class="text-gray-400">⋮⋮</span>
          <input
            type="checkbox"
            :checked="isVisible(key)"
            :aria-label="`显示${LABELS[key]}`"
            @change="toggle(key)"
          />
          <span>{{ LABELS[key] }}</span>
        </li>
      </ul>
      <div class="mt-2 flex gap-2">
        <button type="button" class="panel-button" @click="copyConfig">
          {{ copied ? '已复制' : '复制配置' }}
        </button>
        <button type="button" class="panel-button" @click="emit('reset')">重置</button>
      </div>
    </template>
  </aside>
</template>

<style scoped>
.section-order-panel {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 50;
  width: 13rem;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  color: #111827;
}

.panel-button {
  flex: 1;
  padding: 0.25rem 0;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  background: #fff;
}

.panel-button:hover {
  background: #f3f4f6;
}

@media print {
  .section-order-panel {
    display: none;
  }
}
</style>
