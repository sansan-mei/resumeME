<script lang="ts" setup>
import type { LinkProps } from '@/types/app'
import { PhAddressBook, PhAt, PhCactus, PhCirclesThree, PhGithubLogo, PhPhone } from '@phosphor-icons/vue'
import { computed } from 'vue'

const props = defineProps<LinkProps>()

const parentClass = computed(() => [
  'flex',
  'items-center',
  props.showIcon && 'gap-x-1',
  props.headerFlex ? 'justify-start' : 'justify-center',
  props.headerFlex && 'w-[48.5%]',
])
</script>

<template>
  <div
    :class="[
      'flex',
      'flex-wrap',
      'items-center',
      'gap-y-0.5',
      headerFlex ? 'text-sm' : 'text-xs',
      !headerFlex && 'justify-between gap-x-2',
      'mt-2',
    ]"
  >
    <div :class="parentClass" v-if="experience">
      <PhCactus color="var(--resume-accent)" v-if="showIcon" />
      <span v-else>工作经验：</span>
      <span class="resume-contact">{{ experience }}</span>
    </div>
    <div :class="parentClass" v-if="age">
      <PhCirclesThree color="var(--resume-accent)" v-if="showIcon" />
      <span v-else>年龄：</span>
      <span class="resume-contact">{{ age }}岁 </span>
    </div>
    <div :class="parentClass" v-if="phone">
      <PhPhone color="var(--resume-accent)" v-if="showIcon" />
      <span v-else>联系电话：</span>
      <span class="resume-contact">{{ phone }}</span>
    </div>
    <div :class="parentClass" v-if="email">
      <PhAt color="var(--resume-accent)" v-if="showIcon" />
      <span v-else>联系邮箱：</span>
      <span class="resume-contact">{{ email }}</span>
    </div>
    <div :class="parentClass" v-if="github">
      <PhGithubLogo color="var(--resume-accent)" v-if="showIcon" />
      <span v-else>GitHub：</span>
      <span class="resume-contact">{{ github }}</span>
    </div>
    <div :class="parentClass" v-if="socialAddress">
      <PhAddressBook color="var(--resume-accent)" v-if="showIcon" />
      <span v-else>个人站点：</span>
      <span class="resume-contact">{{ socialAddress }}</span>
    </div>
  </div>
</template>

<style></style>
