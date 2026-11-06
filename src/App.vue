<script setup lang="ts">
import { computed, ref } from 'vue'
import Content from '../content'
import EducationSection from './components/EducationSection.vue'
import CoreHighlightsSection from './components/CoreHighlightsSection.vue'
import HeaderSection from './components/HeaderSection.vue'
import LeftContentSection from './components/LeftContentSection.vue'
import LinkSection from './components/LinkSection.vue'
import MySkillsSection from './components/MySkillsSection.vue'
import PageSection from './components/PageSection.vue'
import ProductsSection from './components/ProductsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import SectionOrderPanel from './components/SectionOrderPanel.vue'
import SocialSection from './components/SocialSection.vue'
import WorksSection from './components/WorksSection.vue'
import {
  type Direction,
  type EducationProps,
  type HeaderProps,
  type LinkProps,
  type ProductProps,
  type SectionKey,
  type WorksProps,
} from './types/app'

const direction = ref<Direction>(Content.direction)

const professionSkills = ref(Content.skills)

const works = ref<WorksProps['works']>(Content.works)

const linkInfo = ref<LinkProps>(Content.link)

const productRef = ref<ProductProps[]>(Content.products)

const header = ref<HeaderProps>(Content.header)

const educationRef = ref<EducationProps[]>(Content.educations)

const socials = ref(Content.socials)

const mySkills = ref(Content.mySkills)
const coreHighlights = ref(
  Array.isArray(Content.coreHighlights)
    ? Content.coreHighlights.join(' ')
    : Content.coreHighlights || '',
)

const headerFlex = computed(() => Content.headerFlex)

const DEFAULT_SECTION_ORDER: SectionKey[] = [
  'highlights',
  'socials',
  'mySkills',
  'works',
  'skills',
  'products',
  'educations',
]

const configuredOrder: SectionKey[] = Content.sectionOrder?.length
  ? Content.sectionOrder
  : DEFAULT_SECTION_ORDER

// 拖拽面板只在开发模式出现，调整结果存在浏览器本地；构建产物始终以 content.ts 为准
const isDev = import.meta.env.DEV
const STORAGE_KEY = 'resume:sectionOrder'

function loadStoredOrder(): SectionKey[] | null {
  if (!isDev) return null
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (
      Array.isArray(value) &&
      value.every((key) => DEFAULT_SECTION_ORDER.includes(key as SectionKey))
    ) {
      return value as SectionKey[]
    }
  } catch {
    // 本地存储不可用或内容损坏时退回 content.ts 配置
  }
  return null
}

const orderRef = ref<SectionKey[]>(loadStoredOrder() ?? [...configuredOrder])

// 去重，避免同一板块被配置两次时重复渲染
const sectionOrder = computed<SectionKey[]>(() => [...new Set(orderRef.value)])

function changeOrder(order: SectionKey[]) {
  orderRef.value = order
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order))
  } catch {
    // 忽略存储失败，本次会话内的调整仍然生效
  }
}

function resetOrder() {
  orderRef.value = [...configuredOrder]
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // 同上
  }
}
</script>

<template>
  <PageSection>
    <section :class="['mb-3', headerFlex && 'flex']">
      <HeaderSection
        v-bind="{
          ...header,
          headerFlex,
        }"
        :class="[headerFlex && 'w-[28%]']"
      />

      <LinkSection
        v-bind="{
          ...linkInfo,
          headerFlex,
        }"
        :class="[headerFlex && 'w-[72%]']"
      />
    </section>

    <template v-for="key of sectionOrder" :key="key">
      <LeftContentSection
        v-if="key === 'highlights' && coreHighlights"
        title=""
        :direction="direction"
      >
        <CoreHighlightsSection :content="coreHighlights" />
      </LeftContentSection>

      <LeftContentSection
        v-else-if="key === 'socials' && socials"
        title="社交信息"
        :direction="direction"
      >
        <SocialSection :socials="socials" />
      </LeftContentSection>

      <LeftContentSection
        v-else-if="key === 'mySkills' && mySkills"
        title="技术栈"
        :direction="direction"
      >
        <MySkillsSection :content="mySkills" />
      </LeftContentSection>

      <LeftContentSection v-else-if="key === 'works'" title="工作经历" :direction="direction">
        <WorksSection :works="works" />
      </LeftContentSection>

      <LeftContentSection v-else-if="key === 'skills'" title="专业技能" :direction="direction">
        <SkillsSection :content="professionSkills" />
      </LeftContentSection>

      <LeftContentSection
        v-else-if="key === 'products' && productRef.length"
        title="项目经历"
        :direction="direction"
      >
        <ProductsSection v-for="(product, index) of productRef" v-bind="product" :key="index" />
      </LeftContentSection>

      <LeftContentSection
        v-else-if="key === 'educations' && educationRef.length"
        title="教育经历"
        :direction="direction"
      >
        <EducationSection v-for="(edu, index) of educationRef" v-bind="edu" :key="index" />
      </LeftContentSection>
    </template>

    <SectionOrderPanel
      v-if="isDev"
      :order="sectionOrder"
      :all="DEFAULT_SECTION_ORDER"
      @change="changeOrder"
      @reset="resetOrder"
    />
  </PageSection>
</template>

<style scoped>
svg {
  margin-bottom: 0.125rem;
}
</style>
