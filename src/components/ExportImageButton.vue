<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ targetId: string }>()
const exporting = ref(false)
const message = ref('')

async function exportImage() {
  if (exporting.value) return
  exporting.value = true
  message.value = ''
  let objectUrl: string | undefined
  let downloadLink: HTMLAnchorElement | undefined

  try {
    const target = document.getElementById(props.targetId)
    if (!target) throw new Error('找不到简历正文，请刷新页面后重试。')

    const { toBlob } = await import('html-to-image')
    await document.fonts.ready
    await Promise.all(
      Array.from(target.querySelectorAll('img')).map((image) => image.decode().catch(() => {})),
    )

    const blob = await toBlob(target, {
      backgroundColor: '#ffffff',
      pixelRatio: 2,
      preferredFontFormat: 'woff2',
      style: { margin: '0', boxShadow: 'none' },
    })
    if (!blob) throw new Error('图片生成失败，请重试。')

    objectUrl = URL.createObjectURL(blob)
    downloadLink = document.createElement('a')
    downloadLink.href = objectUrl
    // 固定文件名，避免把被隐藏的姓名带进下载文件。
    downloadLink.download = '简历-分享版.png'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    message.value = '图片已生成，请在浏览器下载中查看。'
  } catch (error) {
    console.error('导出简历图片失败', error)
    message.value = '导出失败，请检查网络和图片是否加载完成后重试。'
  } finally {
    downloadLink?.remove()
    if (objectUrl) {
      const url = objectUrl
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
    }
    exporting.value = false
  }
}
</script>

<template>
  <aside class="export-image-panel" aria-label="简历图片导出">
    <button type="button" :disabled="exporting" :aria-busy="exporting" @click="exportImage">
      {{ exporting ? '正在生成图片…' : '导出图片' }}
    </button>
    <p>高清 PNG 长图</p>
    <p v-if="message" role="status">{{ message }}</p>
  </aside>
</template>

<style scoped>
.export-image-panel {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 50;
  max-width: 15rem;
  padding: 0.75rem;
  border: 1px solid #e5e0d9;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 0 4px 16px rgb(0 0 0 / 12%);
  color: #4b4640;
}

button {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background: #80533f;
  color: #fff;
  font-size: 0.875rem;
}

button:disabled {
  cursor: wait;
  opacity: 0.65;
}

p {
  margin-top: 0.375rem;
  font-size: 0.75rem;
}

@media print {
  .export-image-panel {
    display: none;
  }
}
</style>
