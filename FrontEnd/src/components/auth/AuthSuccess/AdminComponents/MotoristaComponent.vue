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



</script>

<template>
    <section :style="{ color: themeManager.text }">
       <div class="tabs" :style="{ backgroundColor: themeManager.detalhe }">
        <div class="tabs-button">
          <button :class="{ active: admin.page === 'transportes' }" @click="authState.mudarAdminPage('configVans')"
          :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">
          Transportes
        </button>
        <button :class="{ active: admin.page === 'passageiros' }" @click="authState.mudarAdminPage('passageiro')"
          :style="{  backgroundColor: themeManager.detalhe, color: '#fff' }">
          Passageiros
        </button>
        <button :class="{ active: admin.page === 'motoristas' }" @click="authState.mudarAdminPage('motorista')"
          :style="{ backgroundColor: '#fff', color: themeManager.detalhe }">
          Motoristas
        </button>
        </div>
        <div class="tabs-sair">
          <button :class="{ active: admin.page === 'motoristas' }" @click="authState.mudarAdminPage('vans')"
          :style="{ backgroundColor: '#fff', color: themeManager.detalhe  }">
          Sair da Van
        </button>
        </div>
      </div>
      <div class="gerenciar" :style="{ backgroundColor: themeManager.fundo }">
      <div class="header-actions">
        <button class="btn-cadastrar" @click="authState.mudarAdminPage('addmotorista')" :style="{ backgroundColor: themeManager.detalhe }">
          Adicionar Motorista
        </button>

      </div>

            <div class="lista-motoristas" :style="{ backgroundColor: '#fff', color: '#000' }">
                <div v-for="m in motoristasFiltrados" :key="m.id" class="motorista">
                        <div v-if="expandidoId === m.id" class="detalhes" :style="{ backgroundColor: themeManager.detalhe }">
                            <div class="card-detalhes">
                                <div class="avatar-container">
                                    <img src="/src-auth/motorista.png" class="avatarG" />
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
section {
  padding: 60px 100px 100px 100px;
}

.tabs {
  display: flex;
  justify-content: right;
  gap: 20px;
  margin: 0px;
  padding: 20px 20px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
  border-radius: 10px 10px 0 0;
}

.tabs button {
  border: none;
  padding: 10px 25px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tabs-button{
  margin-right: 280px;
}

.gerenciar {
  border-radius: 0 0 10px 10px;
  padding: 20px 30px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn-cadastrar {
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search {
  position: relative;
}

.search input {
  padding: 8px 38px 8px 15px;
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

@media (max-width: 768px) {

  section{
    padding: 0px 0px 50px 0px;

  }
  .titulo {
  font-size: 2.5rem;
  margin: 20px 0 0px 0;
}

.link {
  margin-bottom: 0px;
}

.gerenciar {
  margin-top: 30px;
    border: none;
    border-radius: 0;
}

.header {
  display: block;
  padding: 20px 5px 20px 5px;
  border-radius: 0;
}

h2 {
    font-size: 1.5rem;
    text-align: center;
}

.detalhes {
    padding: 50px 20px;
    border-radius: 8px;
}

.card-detalhes {
    display: block;
}

.avatarG{
 width: 150px;
    height: 150px;
}

.info {
    border-right: none;
    border-left: none;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 30px 0px;
    margin: 30px 0;
}

.vans {
    width: 250px;
    margin: 0 45px;
}

.vans h3{
  text-align: center;
  border-bottom: 1px solid #ccc;

}
}

</style>
