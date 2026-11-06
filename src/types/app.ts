export type ProductProps = {
  // 组件属性
  title: string
  time: string
  skills?: string[]
  bg?: string[]
  role?: string[]
  actionsTitle?: string
  actions?: string[]
  result?: string[]
}

export type WorksProps = {
  works: {
    company: string
    time: string
    role: string
    depart: string
    bg?: string
  }[]
}

export type LinkProps = {
  phone?: string
  email?: string
  experience?: string
  age?: string
  socialAddress?: string
  github?: string
  showIcon?: boolean
  headerFlex?: boolean
}

export type EducationProps = {
  school: string
  major: string
  gpa?: string
  time: string
  // 学历
  degree?: string
}

export type HeaderProps = {
  showImg: boolean
  name: string
  avatar?: string
  headerFlex?: boolean
  title?: string
}

export type SocialProps = {
  iconUrl: string
  name: string
  value: string
  a_href: string
}

export type Direction = 'left' | 'top'

/** 页面板块标识，用于 AppState.sectionOrder 自定义板块顺序 */
export type SectionKey =
  | 'highlights'
  | 'socials'
  | 'mySkills'
  | 'works'
  | 'skills'
  | 'products'
  | 'educations'

export type MySkillsProps = {
  content: {
    icon: string
    title: string
    src?: string
  }[]
}

export type AppState = {
  works: WorksProps['works']
  link: LinkProps
  coreHighlights?: string | string[]
  skills: string[]
  products: ProductProps[]
  educations: EducationProps[]
  header: HeaderProps
  direction: Direction
  socials?: SocialProps[]
  mySkills?: MySkillsProps['content']
  acknowledgments?: boolean
  headerFlex?: boolean
  /** 板块顺序；未列出的板块不显示，不填时使用默认顺序 */
  sectionOrder?: SectionKey[]
}
