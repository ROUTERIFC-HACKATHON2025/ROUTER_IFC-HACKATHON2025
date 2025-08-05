import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useThemeManagerStore } from './themeManager'


const CORES_CLARAS = {
  linhaEquipeClara: '/src-equipe/linhaEquipeClaro.svg'
}

const CORES_ESCURAS = {
  linhaEquipeEscura: '/src-equipe/linhaEquipeEscuro.svg'
}

export const useThemeEquipeStore = defineStore('themeEquipe', () => {
  const linhaEquipe = ref(CORES_CLARAS.linhaEquipeClara)

  const applyDark = () => {
    linhaEquipe.value = CORES_ESCURAS.linhaEquipeEscura
  }

  const applyLight = () => {
    linhaEquipe.value = CORES_CLARAS.linhaEquipeClara
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
    linhaEquipe
  }
}) 