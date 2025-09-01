<script setup>
import { ref, computed } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { useUserProfileStore } from '@/stores/userProfile'
import { useAdminStore } from '@/stores/admin'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const userProfile = useUserProfileStore()
const admin = useAdminStore()

const busca = ref('')
const expandidoId = ref(null)

const motoristasFiltrados = computed(() => {
    if (!busca.value.trim()) {
        return userProfile.motoristas
    }
    
    const termoBusca = busca.value.toLowerCase().trim()
    
    return userProfile.motoristas.filter(m => {
        // Buscar apenas por nome (case-insensitive)
        if (m.nome && m.nome.toLowerCase().includes(termoBusca)) return true
        
        return false
    })
})

const toggleExpand = (id) => {
    expandidoId.value = expandidoId.value === id ? null : id
}

function selecionarMotorista(motorista) {
    admin.selectDriver(motorista)
    authState.mudarAdminPage('configVans')
}



// Removido botão inline; seleção é feita pelo botão dentro dos detalhes
</script>

<template>
    <section :style="{ color: themeManager.text }">
        <h1 class="titulo" :style="{ color: themeManager.text }">
            PÁGINA DE
            <span class="azul" :style="{ color: themeManager.detalheAlternativo }">
                GERENCIAMENTO <br> (NOME DA EMPRESA)
            </span>
        </h1>

        <p class="footer" :style="{ color: themeManager.text }">
            <button class="link" @click="authState.mudarAdminPage('configVans')"
                :style="{ color: themeManager.detalhe }">
                &larr; Voltar
            </button>
        </p>

        <div class="gerenciar" :style="{ borderColor: themeManager.detalhe }">
            <div class="header" :style="{ backgroundColor: themeManager.detalhe }">
                <h2>GERENCIAR<br> MOTORISTAS</h2>
                <div class="search">
                    <input type="text" placeholder="Buscar por nome do motorista..." v-model="busca" :style="{
                        backgroundColor: '#fff',
                        color: '#000',
                        border: '2px solid ' + themeManager.detalhe
                    }" />
                    <span class="mdi mdi-magnify" :style="{ color: themeManager.detalhe }"></span>
                </div>
            </div>

            <!-- Indicador de resultados da busca -->
            <div v-if="busca.trim()" class="resultados-busca" :style="{ color: themeManager.text }">
                <p>
                    {{ motoristasFiltrados.length }} motorista{{ motoristasFiltrados.length !== 1 ? 's' : '' }} encontrado{{ motoristasFiltrados.length !== 1 ? 's' : '' }}
                    {{ motoristasFiltrados.length !== userProfile.motoristas.length ? ` de ${userProfile.motoristas.length}` : '' }}
                    para "{{ busca }}"
                </p>
            </div>

            <div class="lista-motoristas" :style="{ backgroundColor: '#fff', color: '#000' }">
                <div v-for="m in motoristasFiltrados" :key="m.id" class="motorista">
                    <div class="linha-motorista" @click="toggleExpand(m.id)">
                        <div class="info-motorista">
                            <img src="/public/src-auth/motorista.png" class="avatar" />
                            <span>{{ m.nome }}</span>
                        </div>
                        <span class="mdi mdi-chevron-down seta" :class="{ rotaciona: expandidoId === m.id }"></span>
                    </div>

                        <div v-if="expandidoId === m.id" class="detalhes" :style="{ backgroundColor: themeManager.detalhe }">
                            <div class="card-detalhes">
                                <div class="avatar-container">
                                    <img src="/public/src-auth/motorista.png" class="avatarG" />
                                    <h3>{{ m.nome }}</h3>
                                </div>
                                <div class="info">
                                    <p><strong>Data de nascimento:</strong> {{ m.nascimento }}</p>
                                    <p><strong>CPF:</strong> {{ m.cpf }}</p>
                                    <p><strong>E-mail:</strong> {{ m.email }}</p>
                                    <p><strong>Telefone:</strong> {{ m.telefone }}</p>
                                </div>
                                <div class="vans">
                                    <h3>Vans:
                                    </h3>
                                    <p v-if="!admin.isDriverAssigned(m.id)">Nenhuma van cadastrada a esse motorista</p>
                                    <p v-else>Motorista cadastrado em uma van</p>
                                    <button 
                                        class="btn-add" 
                                        :disabled="admin.selectedVan && admin.selectedVan.status === 'Manutenção'"
                                        :style="{ 
                                            backgroundColor: (admin.selectedVan && admin.selectedVan.status === 'Manutenção') ? '#666' : themeManager.detalheAlternativo,
                                            opacity: (admin.selectedVan && admin.selectedVan.status === 'Manutenção') ? 0.6 : 1,
                                            cursor: (admin.selectedVan && admin.selectedVan.status === 'Manutenção') ? 'not-allowed' : 'pointer'
                                        }" 
                                        @click="(admin.selectedVan && admin.selectedVan.status !== 'Manutenção') && selecionarMotorista(m)"
                                    >
                                        {{ (admin.selectedVan && admin.selectedVan.status === 'Manutenção') ? 'Van em Manutenção' : 'Adicionar Motorista' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
                
                <!-- Mensagem quando nenhum motorista é encontrado -->
                <div v-if="busca.trim() && motoristasFiltrados.length === 0" class="nenhum-motorista">
                    <div class="nenhum-motorista-content">
                        <span class="mdi mdi-account-off" :style="{ color: themeManager.detalhe, fontSize: '4rem' }"></span>
                        <h3>Nenhum motorista encontrado</h3>
                        <p>Tente usar termos diferentes na busca</p>
                        <button class="btn-limpar-busca" @click="busca = ''" :style="{ color: themeManager.detalhe }">
                            Limpar busca
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.titulo {
    font-size: 3rem;
    margin: 30px 0 0px 0;
}

.link {
    background: none;
    border: none;
    text-decoration: underline;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 30px;
}

.gerenciar {
    margin-top: 30px;
    border: 1px solid;
    border-radius: 8px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
    border-radius: 8px 8px 0 0;
}

h2 {
    font-size: 2rem;
    text-align: left;
    color: #fff;
}

.search {
    position: relative;
    margin: 8px 0;
}

.search input {
    padding: 10px 38px 10px 15px;
    border-radius: 25px;
    width: 400px;
    font-size: 1rem;
    border: 2px solid;
}

.search input:focus {
    outline: none;
}

.search .mdi {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.3em;
    pointer-events: none;
    transition: transform 0.3s ease;
}

.search input:focus+.mdi {
    transform: translateY(-50%) scale(1.2);
}

.lista-motoristas {
    display: flex;
    flex-direction: column;
}

.motorista {
    border-top: 1px solid #ccc;
}

.linha-motorista {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    cursor: pointer;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.info-motorista {
    display: flex;
    align-items: center;
    gap: 20px;
}

.seta {
    font-size: 1.5rem;
    transition: transform 0.3s;
}

.seta.rotaciona {
    transform: rotate(180deg);
}

.detalhes {
    padding: 50px 80px;
    color: #fff;
    margin: 10px;
    border-radius: 8px;
}

.card-detalhes {
    display: flex;
    gap: 50px;
    text-align: left;
}

.avatar-container {
  text-align: center;
  display: block;
  margin: 0;
}

.avatar-container h3 {
  display: block;
  margin-top: 10px;
  color: #fff;
  font-size: 2rem;
}

.avatarG{
 width: 200px;
    height: 200px;
    border-radius: 50%;
}

.info {
    flex: 1;
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
    padding: 0 50px;
}

.vans {
    width: 200px;
}

.vans h3{
  color: #fff;
  font-size: 2rem;
  border-bottom: 1px solid #ccc;
}

.vans ul {
    list-style: none;
    padding: 0;
}

.vans li {
    padding: 5px 0;
    border-bottom: 1px solid #ccc;
}

.btn-add {
    color: white;
    border: none;
    padding: 15px;
    font-size: 1.2rem;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
}

.resultados-busca {
    padding: 10px 20px;
    text-align: center;
    font-size: 0.9rem;
    opacity: 0.8;
}

.resultados-busca p {
    margin: 0;
}

.nenhum-motorista {
    text-align: center;
    padding: 40px 20px;
}

.nenhum-motorista-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.nenhum-motorista-content h3 {
    margin: 0;
    font-size: 1.5rem;
    color: inherit;
}

.nenhum-motorista-content p {
    margin: 0;
    font-size: 1rem;
    opacity: 0.7;
}

.btn-limpar-busca {
    background: none;
    border: 1px solid;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.btn-limpar-busca:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
