<script setup>
import { ref } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import VansComponent from './AdminComponents/VansComponent.vue'
import ConfigVans from './AdminComponents/ConfigVans.vue'
import MotoristaComponent from './AdminComponents/MotoristaComponent.vue'
import PassageiroComponent from './AdminComponents/PassageiroComponent.vue'
import EditarRota from './AdminComponents/EditarRota.vue'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()

</script>

<template>
    <main class="pagina-gerenciamento">
        <VansComponent v-if="authState.stateAdminPage === 'vans'" />
        <ConfigVans v-if="authState.stateAdminPage === 'configVans'" />
        <MotoristaComponent v-if="authState.stateAdminPage === 'motorista'" />
        <PassageiroComponent v-if="authState.stateAdminPage === 'passageiro'" />
        <EditarRota v-if="authState.stateAdminPage === 'editarRota'" />
    </main>
</template>

<style scoped>
.pagina-gerenciamento {
    text-align: center;
}
</style>
