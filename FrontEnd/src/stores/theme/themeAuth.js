import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useThemeManagerStore } from './themeManager'

const CORES_CLARAS = {
  menininha: '/src-auth/auth-welcome-illustration.png',
  linha: '/src-auth/linha_login_claro.png'
}

const CORES_ESCURAS = {
  menininha: '/src-auth/auth-welcome-illustration-dark.png',
  linha: '/src-auth/linha_login_escuro.png'
}

export const useThemeAuthStore = defineStore('themeAuth', () => {
  const menininha = ref(CORES_CLARAS.menininha)
  const linha = ref(CORES_CLARAS.linha)

  const applyDark = () => {
    menininha.value = CORES_ESCURAS.menininha
    linha.value = CORES_ESCURAS.linha
  }

  const applyLight = () => {
    menininha.value = CORES_CLARAS.menininha
    linha.value = CORES_CLARAS.linha
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
    linha
  }
})
