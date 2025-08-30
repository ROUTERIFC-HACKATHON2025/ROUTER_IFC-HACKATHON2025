import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  const selectedVan = ref(null)
  // assignments por van: { [vanId]: { driver: {}, passengers: [] } }
  const assignments = ref({})

  const STORAGE_KEY = 'adminAssignments'

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === 'object') {
          assignments.value = parsed
        }
      }
    } catch (_) {
      // ignore
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments.value))
    } catch (_) {
      // ignore
    }
  }

  loadFromStorage()

  const currentAssignment = computed(() => {
    if (!selectedVan.value) return { driver: null, passengers: [] }
    const id = selectedVan.value.id
    if (!assignments.value[id]) {
      assignments.value[id] = { driver: null, passengers: [] }
    }
    return assignments.value[id]
  })

  const vanPassengers = computed(() => currentAssignment.value.passengers || [])
  const selectedDriver = computed(() => currentAssignment.value.driver || null)

  const capacidadeRestante = computed(() => {
    if (!selectedVan.value) return Infinity
    const capacidade = selectedVan.value.acentos ?? 0
    return capacidade - vanPassengers.value.length
  })

  function selectVan(van) {
    selectedVan.value = van
    // garante estrutura para a van
    const id = van?.id
    if (id !== undefined && !assignments.value[id]) {
      assignments.value[id] = { driver: null, passengers: [] }
      persist()
    }
  }

  function addPassenger(passageiro) {
    if (!selectedVan.value) return
    // Remover passageiro de qualquer outra van em que esteja
    const alvoId = selectedVan.value.id
    for (const [vanId, assn] of Object.entries(assignments.value)) {
      if ((assn.passengers || []).some(p => p.id === passageiro.id)) {
        assignments.value[vanId] = {
          ...assn,
          passengers: (assn.passengers || []).filter(p => p.id !== passageiro.id)
        }
      }
    }
    // Adicionar na van atual, respeitando capacidade
    const assnAtual = currentAssignment.value
    if (capacidadeRestante.value <= 0) return
    const novaLista = [...(assnAtual.passengers || []), passageiro]
    assignments.value[alvoId] = { ...assnAtual, passengers: novaLista }
    persist()
  }

  function removePassenger(passageiroId) {
    if (!selectedVan.value) return
    const assn = currentAssignment.value
    const novaLista = (assn.passengers || []).filter(p => p.id !== passageiroId)
    assignments.value[selectedVan.value.id] = { ...assn, passengers: novaLista }
    persist()
  }

  function isPassengerAdded(passageiroId) {
    const assn = currentAssignment.value
    return (assn.passengers || []).some(p => p.id === passageiroId)
  }

  function selectDriver(motorista) {
    if (!selectedVan.value) return
    const alvoId = selectedVan.value.id
    // Remover motorista de qualquer outra van
    for (const [vanId, assn] of Object.entries(assignments.value)) {
      if (assn.driver && assn.driver.id === motorista.id) {
        assignments.value[vanId] = { ...assn, driver: null }
      }
    }
    // Atribuir na van atual
    const assnAtual = currentAssignment.value
    assignments.value[alvoId] = { ...assnAtual, driver: motorista }
    persist()
  }

  function clearDriver() {
    if (!selectedVan.value) return
    const assn = currentAssignment.value
    assignments.value[selectedVan.value.id] = { ...assn, driver: null }
    persist()
  }

  // persiste quando assignments mudar profundamente
  watch(assignments, persist, { deep: true })

  function getDriverVanId(motoristaId) {
    for (const [vanId, assn] of Object.entries(assignments.value)) {
      if (assn.driver && assn.driver.id === motoristaId) {
        return Number(vanId)
      }
    }
    return null
  }

  function isDriverAssigned(motoristaId) {
    return getDriverVanId(motoristaId) !== null
  }

  return {
    selectedVan,
    vanPassengers,
    selectedDriver,
    capacidadeRestante,
    selectVan,
    addPassenger,
    removePassenger,
    isPassengerAdded,
    selectDriver,
    clearDriver,
    getDriverVanId,
    isDriverAssigned,
  }
})


