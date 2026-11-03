<script lang="tsx" setup>
import type { ProductProps } from '@/types/app'
const props = defineProps<ProductProps>()

function FormAtList(items?: string[], liClass = 'leading-5') {
  if (!items) return
  return items.map((item, index) => {
    const parts = item.split(/(<[^>]+>)/).map((part, i) => {
      if (part.startsWith('<') && part.endsWith('>')) {
        return (
          <strong key={i} class="resume-emphasis">
            {part.slice(1, -1)}
          </strong>
        )
      }
      return part
    })
    return (
      <li key={index} class={liClass}>
        {parts}
      </li>
    )
  })
}

// PDF 投递使用纯文本标题；兼容旧内容中的 Markdown 链接标签。
function FormatText(input?: string) {
  return <span>{input?.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')}</span>
}

const RoleNode = () => FormAtList(props.role)
const BgNode = () => FormAtList(props.bg)
const ActionsNode = () => FormAtList(props.actions, 'pl-0.5 leading-5')
const ResultNode = () => FormAtList(props.result, 'pl-0.5 leading-5')
const SkillNode = () => FormAtList(props.skills)

const TitleNode = () => FormatText(props.title)
</script>

<template>
  <article class="project-entry text-xs leading-5">
    <header class="project-header">
      <h3 class="project-title text-tTitle font-bold text-base"><TitleNode /></h3>
      <span class="project-meta">{{ time }}</span>
    </header>

    <div v-if="bg?.length" class="project-summary">
      <span class="project-label text-tTitle">项目背景</span>
      <ul class="list-none">
        <BgNode />
      </ul>
    </div>
    <div v-if="skills?.length" class="project-summary project-tech">
      <span class="project-label">技术栈</span>
      <ul class="list-none">
        <SkillNode />
      </ul>
    </div>
    <div v-if="role?.length" class="project-summary">
      <span class="project-label text-tTitle">承担职责</span>
      <ul class="list-none">
        <RoleNode />
      </ul>
    </div>
    <div v-if="actions?.length" class="project-details">
      <h4 class="project-label text-tTitle">{{ actionsTitle || '主要行动' }}</h4>
      <ol class="project-list list-decimal list-outside pl-5">
        <ActionsNode />
      </ol>
    </div>
    <div v-if="result?.length" class="project-details">
      <h4 class="project-label text-tTitle">主要贡献与成果</h4>
      <ol class="project-list list-decimal list-outside pl-5">
        <ResultNode />
      </ol>
    </div>
  </article>
</template>

<style scoped>
.project-entry + .project-entry {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e0d9;
}
.project-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 2px 16px;
  margin-bottom: 6px;
}
.project-title {
  flex: 1 1 26rem;
  min-width: 0;
  overflow-wrap: anywhere;
  line-height: 1.5;
}
.project-meta {
  margin-left: auto;
  color: #625c55;
}
.project-summary {
  display: grid;
  grid-template-columns: 4em minmax(0, 1fr);
  gap: 8px;
  margin-bottom: 4px;
}
.project-label {
  font-weight: 600;
}
.project-tech {
  color: #625c55;
}
.project-details {
  margin-top: 6px;
}
.project-list {
  margin-top: 4px;
}
.project-list :deep(li + li) {
  margin-top: 4px;
}
@media print {
  .project-header,
  .project-summary,
  .project-details > h4 {
    break-after: avoid;
  }
  .project-entry :deep(li) {
    break-inside: avoid;
  }
}
</style>
