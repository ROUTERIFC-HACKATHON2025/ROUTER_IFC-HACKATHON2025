import { defineStore } from 'pinia'
import { ref, computed, watchEffect } from 'vue'

const CORES_CLARAS = {
  icone: 'mdi mdi-weather-sunny',
  fundo: '#ffffff',
  fundoAlternativo: '#f1f1f1',
  texto: '#383838',
  detalhe: '#1863A2',
  detalheAlternativo: '#59A3E2',
  logo: '/src-logos/Logo-ROUTER.png',
  logoFooter: '/src-logos/Logo-ROUTER-footer.png',
}

const CORES_ESCURAS = {
  icone: 'mdi mdi-weather-night',
  fundo: '#1a1a1a',
  fundoAlternativo: '#1f1f1f',
  texto: '#e4e4e4',
  detalhe: '#003F74',
  detalheAlternativo: '#1863A2',
  logo: '/src-logos/Logo-ROUTER-escuro.png',
  logoFooter: '/src-logos/Logo-ROUTER-footer-escuro.png',
}

export const useThemeManagerStore = defineStore('themeManager', () => {
  const icone = ref(CORES_CLARAS.icone)
  const fundo = ref(CORES_CLARAS.fundo)
  const fundoAlternativo = ref(CORES_CLARAS.fundoAlternativo)
  const text = ref(CORES_CLARAS.texto)
  const detalhe = ref(CORES_CLARAS.detalhe)
  const detalheAlternativo = ref(CORES_CLARAS.detalheAlternativo)
  const logo = ref(CORES_CLARAS.logo)
  const logofooter = ref(CORES_CLARAS.logoFooter)

  const isDark = computed(() => fundo.value === CORES_ESCURAS.fundo)

  const applyDark = () => {
    icone.value = CORES_ESCURAS.icone
    fundo.value = CORES_ESCURAS.fundo
    fundoAlternativo.value = CORES_ESCURAS.fundoAlternativo
    text.value = CORES_ESCURAS.texto
    detalhe.value = CORES_ESCURAS.detalhe
    detalheAlternativo.value = CORES_ESCURAS.detalheAlternativo
    logo.value = CORES_ESCURAS.logo
    logofooter.value = CORES_ESCURAS.logoFooter
  }

  const applyLight = () => {
    icone.value = CORES_CLARAS.icone
    fundo.value = CORES_CLARAS.fundo
    fundoAlternativo.value = CORES_CLARAS.fundoAlternativo
    text.value = CORES_CLARAS.texto
    detalhe.value = CORES_CLARAS.detalhe
    detalheAlternativo.value = CORES_CLARAS.detalheAlternativo
    logo.value = CORES_CLARAS.logo
    logofooter.value = CORES_CLARAS.logoFooter
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
    logo,
    logofooter,
    detalheAlternativo,
    toggleTheme,
    init,
    isDark,
    icone,
  }
})
