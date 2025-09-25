<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { useAdminStore } from '@/stores/admin'

import VansComponent from './AdminComponents/VansComponent.vue'
import ConfigVans from './AdminComponents/ConfigVans.vue'
import MotoristaComponent from './AdminComponents/MotoristaComponent.vue'
import PassageiroComponent from './AdminComponents/PassageiroComponent.vue'
import EditarRota from './AdminComponents/EditarRota.vue'
import AddMotorista from './AdminComponents/AddMotorista.vue'
import AddPassageiro from './AdminComponents/AddPassageiro.vue'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const admin = useAdminStore()

onMounted(async () => {
  themeManager.init()
  authState.restaurarStateEmpresa()
  await nextTick()

  // Carregar dados reais do backend
  try {
    await admin.loadBackendData()
  } catch (_) {}

  const elements = document.querySelectorAll('.animate-on-scroll')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('in-view', entry.isIntersecting)
    })
  }, { threshold: 0.1 })

  elements.forEach(el => observer.observe(el))
})
</script>

<template>
  <main class="pagina-gerenciamento animate-on-scroll">
    <!-- Transição suave ao trocar de página -->
    <Transition name="fade-slide" mode="out-in">
      <component
        :is="{
          vans: VansComponent,
          configVans: ConfigVans,
          motorista: MotoristaComponent,
          passageiro: PassageiroComponent,
          editarRota: EditarRota,
          addmotorista: AddMotorista,
          addpassageiro: AddPassageiro
        }[authState.stateAdminPage]"
        :key="authState.stateAdminPage"
      />
    </Transition>
  </main>
</template>

<style scoped>
.pagina-gerenciamento {
  text-align: center;
  padding: 0;
  margin: 0;
}

/* animação inicial */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* transição entre componentes */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
