import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useThemeManagerStore } from './themeManager'

const CORES_CLARAS = {
  linhaHomeClara: '/src-home/linha_pag_inicial_claro.svg'
}

const CORES_ESCURAS = {
  linhaHomeEscura: '/src-home/linha_pag_inicial_escuro.svg'
}

export const useThemeHomeStore = defineStore('themeHome', () => {
  const linhaHome = ref(CORES_CLARAS.linhaHomeClara)

  const applyDark = () => {
    linhaHome.value = CORES_ESCURAS.linhaHomeEscura
  }

  const applyLight = () => {
    linhaHome.value = CORES_CLARAS.linhaHomeClara
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
    linhaHome
  }
})
