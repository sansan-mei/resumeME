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
import SocialSection from './components/SocialSection.vue'
import WorksSection from './components/WorksSection.vue'
import {
  type Direction,
  type EducationProps,
  type HeaderProps,
  type LinkProps,
  type ProductProps,
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

    <LeftContentSection title="" :direction="direction" v-if="coreHighlights">
      <CoreHighlightsSection :content="coreHighlights" />
    </LeftContentSection>

    <LeftContentSection title="社交信息" :direction="direction" v-if="socials">
      <SocialSection :socials="socials" />
    </LeftContentSection>

    <LeftContentSection title="技术栈" :direction="direction" v-if="mySkills">
      <MySkillsSection :content="mySkills" />
    </LeftContentSection>

    <LeftContentSection title="工作经历" :direction="direction">
      <WorksSection :works="works" />
    </LeftContentSection>

    <LeftContentSection title="专业技能" :direction="direction">
      <SkillsSection :content="professionSkills" />
    </LeftContentSection>

    <LeftContentSection v-if="productRef.length" title="项目经历" :direction="direction">
      <ProductsSection v-for="(product, index) of productRef" v-bind="product" :key="index" />
    </LeftContentSection>

    <LeftContentSection v-if="educationRef.length" title="教育经历" :direction="direction">
      <EducationSection v-for="(edu, index) of educationRef" v-bind="edu" :key="index" />
    </LeftContentSection>
  </PageSection>
</template>

<style scoped>
svg {
  margin-bottom: 0.125rem;
}
</style>
