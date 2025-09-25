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
        return admin.selectedDriver ? [admin.selectedDriver] : []
    }

    const termoBusca = busca.value.toLowerCase().trim()
    const motoristaAtual = admin.selectedDriver

    if (motoristaAtual && motoristaAtual.nome && motoristaAtual.nome.toLowerCase().includes(termoBusca)) {
        return [motoristaAtual]
    }

    return []
})

const todosMotoristas = computed(() => {
    return userProfile.motoristas || []
})

const mostrarTodosMotoristas = ref(false)

const toggleExpand = (id) => {
    expandidoId.value = expandidoId.value === id ? null : id
}

function selecionarMotorista(motorista) {
    admin.selectDriver(motorista)
    mostrarTodosMotoristas.value = false
    // Não redireciona, fica na aba de motoristas
}

function toggleMostrarTodos() {
    mostrarTodosMotoristas.value = !mostrarTodosMotoristas.value
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
        <button class="btn-cadastrar" @click="toggleMostrarTodos()" :style="{ backgroundColor: themeManager.detalhe }">
          {{ mostrarTodosMotoristas ? 'Voltar' : 'Adicionar Motorista' }}
        </button>

        <div class="search">
          <input 
            type="text" 
            placeholder="Pesquisar..." 
            v-model="busca"
            :style="{ borderColor: themeManager.detalhe, color: themeManager.text, backgroundColor: themeManager.fundo }"
          />
          <span class="mdi mdi-magnify" aria-hidden="true" :style="{color: themeManager.detalhe}"></span>
        </div>
      </div>

            <div class="lista-motoristas" :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }">
                <!-- Mostrar motorista da van quando não estiver no modo de adicionar -->
                <div v-if="!mostrarTodosMotoristas">
                    <div v-for="m in motoristasFiltrados" :key="m.id" class="motorista">
                            <div class="linha-motorista" @click="toggleExpand(m.id)">
                              <div class="info-motorista">
                                <img src="/src-auth/motorista.png" class="avatar" />
                                <span>{{ m.nome }}</span>
                              </div>
                              <span class="mdi mdi-chevron-down seta" :class="{ rotaciona: expandidoId === m.id }"></span>
                            </div>
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
                                            :style="{ backgroundColor: '#fff', color: themeManager.detalhe }"
                                            @click="admin.clearDriver()"
                                        >
                                            Remover da Van
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div v-if="motoristasFiltrados.length === 0" class="nenhum-motorista">
                        <div class="nenhum-motorista-content">
                            <span class="mdi mdi-account-off" :style="{ color: themeManager.detalhe, fontSize: '4rem' }"></span>
                            <h3>Nenhum motorista designado para a van</h3>
                            <p>Clique em "Adicionar Motorista" para selecionar um motorista</p>
                        </div>
                    </div>
                </div>

                <!-- Mostrar todos os motoristas cadastrados quando estiver no modo de adicionar -->
                <div v-else>
                    <div v-for="m in todosMotoristas" :key="m.id" class="motorista">
                            <div class="linha-motorista" @click="toggleExpand(m.id)">
                              <div class="info-motorista">
                                <img src="/src-auth/motorista.png" class="avatar" />
                                <span>{{ m.nome }}</span>
                              </div>
                              <span class="mdi mdi-chevron-down seta" :class="{ rotaciona: expandidoId === m.id }"></span>
                            </div>
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
                                            :style="{ backgroundColor: admin.isDriverAssigned(m.id) ? '#999' : '#fff', color: themeManager.detalhe }"
                                            :disabled="admin.isDriverAssigned(m.id)"
                                            @click="selecionarMotorista(m)"
                                        >
                                            {{ admin.isDriverAssigned(m.id) ? 'Já Adicionado' : 'Adicionar ao Veículo' }}
                                        </button>
                                    </div>
                                </div>
                            </div>
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
  section {
    padding: 80px 10px;
  }

  .tabs {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 15px;
  }

  .tabs-button {
    margin-right: 0;
    justify-content: center;
  }

  .tabs button {
    width: 100%;
    font-size: 1rem;
    padding: 8px 15px;
  }

  .page {
    padding: 15px;
  }

  .gerenciar {
    padding: 20px 20px 20px 10px;
  }

  .search input {
    width: 100%;
    min-width: 200px;
    font-size: 0.95rem;
    margin-left: 10px;
  }
}


@media (max-width: 768px) {
  section {
    padding: 80px 10px;
  }

  .tabs {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 15px;
  }

  .tabs-button {
    margin-right: 0;
    justify-content: center;
  }

  .tabs button {
    width: 100%;
    font-size: 1rem;
    padding: 8px 15px;
  }

  .page {
    padding: 15px;
  }

  .gerenciar {
    padding: 20px 20px 20px 10px;
  }

  .search input {
    width: 100%;
    min-width: 200px;
    font-size: 0.95rem;
    margin-left: 10px;
  }


.detalhes {
    padding: 50px 20px;
    color: #fff;
    margin: 10px;
    border-radius: 8px;
}

.card-detalhes {
    display: block;
    gap: 0px;
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
    border-right: none;
    border-left: none;
    padding: 0 0px;
}

.info .descricao {
    width: 100%;
    height: 120px;
    margin-top: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    font-size: 1rem;
}

.vans {
    width: 200px;
    margin-left: 35px;
}

.vans h3{
  color: #fff;
  font-size: 2rem;
  text-align: center;
  border-bottom: 1px solid #ccc;
}

.enderecos ul {
    list-style: none;
    padding: 0;
}

.enderecos li {
    padding: 5px 0;
    border-bottom: 1px solid #ccc;
}

.btn-add {
    background-color: white;
    border: none;
    padding: 15px;
    font-size: 1.1rem;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
}
}

</style>
