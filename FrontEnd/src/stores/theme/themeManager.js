import { defineStore } from 'pinia'
import { ref, computed, watchEffect } from 'vue'

const CORES_CLARAS = {
  icone: 'mdi mdi-weather-sunny',
  fundo: '#ffffff',
  fundoHeader: '#ffffff96',
  fundoAlternativo: '#fff',
  texto: '#000',
  detalhe: '#08253c',
  detalheAlternativo: '#59A3E2',
}

const CORES_ESCURAS = {
  icone: 'mdi mdi-weather-night',
  fundo: '#1a1a1a',
  fundoAlternativo: '#1f1f1f',
  fundoHeader: '#1a1a1a96',
  texto: '#e4e4e4',
  detalhe: '#0d3e67ff',
  detalheAlternativo: '#1863A2',
}

export const useThemeManagerStore = defineStore('themeManager', () => {
  const icone = ref(CORES_CLARAS.icone)
  const fundo = ref(CORES_CLARAS.fundo)
  const fundoAlternativo = ref(CORES_CLARAS.fundoAlternativo)
  const text = ref(CORES_CLARAS.texto)
  const detalhe = ref(CORES_CLARAS.detalhe)
  const detalheAlternativo = ref(CORES_CLARAS.detalheAlternativo)
  const fundoHeader = ref(CORES_CLARAS.fundoHeader)

  const isDark = computed(() => fundo.value === CORES_ESCURAS.fundo)

  const applyDark = () => {
    icone.value = CORES_ESCURAS.icone
    fundoHeader.value = CORES_ESCURAS.fundoHeader
    fundo.value = CORES_ESCURAS.fundo
    fundoAlternativo.value = CORES_ESCURAS.fundoAlternativo
    text.value = CORES_ESCURAS.texto
    detalhe.value = CORES_ESCURAS.detalhe
    detalheAlternativo.value = CORES_ESCURAS.detalheAlternativo
  }

  const applyLight = () => {
    icone.value = CORES_CLARAS.icone
    fundoHeader.value = CORES_CLARAS.fundoHeader
    fundo.value = CORES_CLARAS.fundo
    fundoAlternativo.value = CORES_CLARAS.fundoAlternativo
    text.value = CORES_CLARAS.texto
    detalhe.value = CORES_CLARAS.detalhe
    detalheAlternativo.value = CORES_CLARAS.detalheAlternativo
  }

  const toggleTheme = () => {
    isDark.value ? applyLight() : applyDark()
  }

  const init = () => {
    localStorage.getItem('tema') === 'escuro' ? applyDark() : applyLight()
  }

  watchEffect(() => {
    localStorage.setItem('tema', isDark.value ? 'escuro' : 'claro')
  })

  return {
    fundo,
    fundoAlternativo,
    text,
    detalhe,
    detalheAlternativo,
    toggleTheme,
    init,
    isDark,
    icone,
    fundoHeader,
  }
})
