import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  const selectedVan = ref(null)
  // assignments por van: { [vanId]: { driver: {}, passengers: [] } }
  const assignments = ref({})
  // status das vans: { [vanId]: 'Ativo' | 'Manutenção' }
  const vanStatus = ref({})

  const STORAGE_KEY = 'adminAssignments'
  const STATUS_STORAGE_KEY = 'vanStatus'

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
    
    try {
      const statusRaw = localStorage.getItem(STATUS_STORAGE_KEY)
      if (statusRaw) {
        const statusParsed = JSON.parse(statusRaw)
        if (statusParsed && typeof statusParsed === 'object') {
          vanStatus.value = statusParsed
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

  function persistStatus() {
    try {
      localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(vanStatus.value))
    } catch (_) {
      // ignore
    }
  }

  loadFromStorage()

  // Inicializar status das vans se não existir
  function initializeVanStatus() {
    // Importar as vans do userProfile para inicializar status
    import('@/stores/userProfile').then(({ useUserProfileStore }) => {
      const userProfile = useUserProfileStore()
      userProfile.vans.forEach(van => {
        if (!vanStatus.value[van.id]) {
          vanStatus.value[van.id] = 'Ativo'
        }
      })
      persistStatus()
    }).catch(() => {
      // Se não conseguir importar, não faz nada
    })
  }

  // Inicializar status das vans
  initializeVanStatus()

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
    // Aplicar o status persistido à van
    if (van) {
      const statusPersistido = getVanStatus(van.id)
      van.status = statusPersistido
    }
    
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
    // Verificar se a van está em manutenção
    if (selectedVan.value.status === 'Manutenção') {
      alert('Não é possível adicionar passageiros a uma van em manutenção.')
      return
    }
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
    // Verificar se a van está em manutenção
    if (selectedVan.value.status === 'Manutenção') {
      alert('Não é possível atribuir motoristas a uma van em manutenção.')
      return
    }
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

  function clearAllPassengers() {
    if (!selectedVan.value) return
    const assn = currentAssignment.value
    assignments.value[selectedVan.value.id] = { ...assn, passengers: [] }
    persist()
  }

  // persiste quando assignments mudar profundamente
  watch(assignments, persist, { deep: true })
  
  // persiste quando vanStatus mudar profundamente
  watch(vanStatus, persistStatus, { deep: true })

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

  function updateVanStatus(status) {
    if (selectedVan.value) {
      const vanId = selectedVan.value.id
      selectedVan.value.status = status
      vanStatus.value[vanId] = status
      persistStatus()
    }
  }

  function getVanStatus(vanId) {
    return vanStatus.value[vanId] || 'Ativo'
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
    clearAllPassengers,
    getDriverVanId,
    isDriverAssigned,
    updateVanStatus,
    getVanStatus,
  }
})


