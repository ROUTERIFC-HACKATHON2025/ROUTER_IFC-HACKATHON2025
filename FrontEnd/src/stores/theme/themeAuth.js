import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useThemeManagerStore } from './themeManager'

const CORES_CLARAS = {
  menininha: '/src-auth/auth-welcome-illustration.png',
}

const CORES_ESCURAS = {
  menininha: '/src-auth/auth-welcome-illustration-dark.png',
}

export const useThemeAuthStore = defineStore('themeAuth', () => {
  const menininha = ref(CORES_CLARAS.menininha)

  const applyDark = () => {
    menininha.value = CORES_ESCURAS.menininha
  }

  const applyLight = () => {
    menininha.value = CORES_CLARAS.menininha
  }

  const themeManager = useThemeManagerStore()

  watch(
    () => themeManager.isDark,
    (isDark) => {
      isDark ? applyDark() : applyLight()
    },
    { immediate: true }
  )

  return {
    menininha,
  }
})
