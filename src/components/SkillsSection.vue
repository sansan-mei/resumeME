<script lang="tsx" setup>
type Props = {
  content: string[]
}
const props = defineProps<Props>()

function FormAtList(items?: string[]) {
  if (!items) return
  return items.map((item, index) => {
    const parts = item.split(/(<[^>]+>)/).map((part, i) => {
      if (part.startsWith('<') && part.endsWith('>')) {
        return <b key={i}>{part.slice(1, -1)}</b>
      }
      return part
    })
    return (
      <li key={index} class="tracking-wide mx-0.5 ml-1.5 mb-1 leading-5">
        {parts}
      </li>
    )
  })
}

const LiNode = () => FormAtList(props.content)
</script>

<template>
  <ol class="list-decimal col-span-5 ml-5 text-xs">
    <LiNode />
  </ol>
</template>

<style></style>
