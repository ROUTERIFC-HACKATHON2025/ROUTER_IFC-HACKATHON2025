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

const passageirosFiltrados = computed(() => {
    if (!busca.value.trim()) return admin.vanPassengers

    const termoBusca = busca.value.toLowerCase().trim()
    return admin.vanPassengers.filter(p => p.nome && p.nome.toLowerCase().includes(termoBusca))
})

const todosPassageiros = computed(() => {
    return userProfile.passageiros || []
})

const mostrarTodosPassageiros = ref(false)

const toggleExpand = (id) => {
    expandidoId.value = expandidoId.value === id ? null : id
}

function adicionarNaVan(passageiro) {
    admin.addPassenger(passageiro)
    mostrarTodosPassageiros.value = false
    // Não redireciona, fica na aba de passageiros
}

function jaAdicionado(id) {
    return admin.isPassengerAdded(id)
}

function toggleMostrarTodos() {
    mostrarTodosPassageiros.value = !mostrarTodosPassageiros.value
}


</script>

<template>
<section :style="{ color: themeManager.text }">
  <div class="tabs" :style="{ backgroundColor: themeManager.detalhe }">
    <div class="tabs-button">
      <button :class="{ active: admin.page === 'transportes' }" @click="authState.mudarAdminPage('configVans')"
        :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">Transportes</button>
      <button :class="{ active: admin.page === 'passageiros' }" @click="authState.mudarAdminPage('passageiro')"
        :style="{ backgroundColor: '#fff', color: themeManager.detalhe }">Passageiros</button>
      <button :class="{ active: admin.page === 'motoristas' }" @click="authState.mudarAdminPage('motorista')"
        :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">Motoristas</button>
    </div>
    <div class="tabs-sair">
      <button @click="authState.mudarAdminPage('vans')"
        :style="{ backgroundColor: '#fff', color: themeManager.detalhe  }">Sair da Van</button>
    </div>
  </div>

  <div class="gerenciar" :style="{ backgroundColor: themeManager.fundo }">
      <div class="header-actions">
        <button class="btn-cadastrar" @click="toggleMostrarTodos()" :style="{ backgroundColor: themeManager.detalhe }">
          {{ mostrarTodosPassageiros ? 'Ver Passageiros da Van' : 'Adicionar Passageiro' }}
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

    <div class="lista-passageiros" :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }">
      <!-- Mostrar passageiros da van quando não estiver no modo de adicionar -->
      <div v-if="!mostrarTodosPassageiros">
        <div v-for="p in passageirosFiltrados" :key="p.id" class="passageiro">
          <div class="linha-passageiro" @click="toggleExpand(p.id)">
            <div class="info-passageiro">
              <img src="/src-auth/passageiro.png" class="avatar" />
              <span>{{ p.nome }}</span>
            </div>
            <span class="mdi mdi-chevron-down seta" :class="{ rotaciona: expandidoId === p.id }"></span>
          </div>

          <div v-if="expandidoId === p.id" class="detalhes" :style="{ backgroundColor: themeManager.detalhe }">
            <div class="card-detalhes">
              <div class="avatar-container">
                <img src="/src-auth/passageiro.png" class="avatarG" />
                <h3>{{ p.nome }}</h3>
              </div>
              <div class="info">
                <p><strong>Data de nascimento:</strong> {{ p.nascimento }}</p>
                <p><strong>CPF:</strong> {{ p.cpf }}</p>
                <p><strong>E-mail:</strong> {{ p.email }}</p>
                <p><strong>Telefone:</strong> {{ p.telefone }}</p>
                <p class="descricao" :style="{ color: '#000' }">{{ p.descricao }}</p>
              </div>
              <div class="enderecos">
                <h3>ENDEREÇOS:</h3>
                <ul>
                  <li>📍 {{ p.endereco }}</li>
                </ul>
                <button
                  class="btn-add"
                  :style="{ backgroundColor: themeManager.detalheAlternativo }"
                  @click="admin.removePassenger(p.id)"
                >
                  Remover da Van
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="passageirosFiltrados.length === 0" class="nenhum-passageiro">
          <div class="nenhum-passageiro-content">
            <span class="mdi mdi-account-off" :style="{ color: themeManager.detalhe, fontSize: '4rem' }"></span>
            <h3>Nenhum passageiro adicionado à van</h3>
            <p>Clique em "Adicionar Passageiro" para selecionar passageiros</p>
          </div>
        </div>
      </div>

      <!-- Mostrar todos os passageiros cadastrados quando estiver no modo de adicionar -->
      <div v-else>
        <div v-for="p in todosPassageiros" :key="p.id" class="passageiro">
          <div class="linha-passageiro" @click="toggleExpand(p.id)">
            <div class="info-passageiro">
              <img src="/src-auth/passageiro.png" class="avatar" />
              <span>{{ p.nome }}</span>
            </div>
            <span class="mdi mdi-chevron-down seta" :class="{ rotaciona: expandidoId === p.id }"></span>
          </div>

          <div v-if="expandidoId === p.id" class="detalhes" :style="{ backgroundColor: themeManager.detalhe }">
            <div class="card-detalhes">
              <div class="avatar-container">
                <img src="/src-auth/passageiro.png" class="avatarG" />
                <h3>{{ p.nome }}</h3>
              </div>
              <div class="info">
                <p><strong>Data de nascimento:</strong> {{ p.nascimento }}</p>
                <p><strong>CPF:</strong> {{ p.cpf }}</p>
                <p><strong>E-mail:</strong> {{ p.email }}</p>
                <p><strong>Telefone:</strong> {{ p.telefone }}</p>
                <p class="descricao" :style="{ color: '#000' }">{{ p.descricao }}</p>
              </div>
              <div class="enderecos">
                <h3>ENDEREÇOS:</h3>
                <ul>
                  <li>📍 {{ p.endereco }}</li>
                </ul>
                <button
                  class="btn-add"
                  :style="{ backgroundColor: jaAdicionado(p.id) ? '#999' : themeManager.detalheAlternativo }"
                  :disabled="jaAdicionado(p.id)"
                  @click="adicionarNaVan(p)"
                >
                  {{ jaAdicionado(p.id) ? 'Já Adicionado' : 'Adicionar à Van' }}
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

.lista-passageiros {
    display: flex;
    flex-direction: column;
}

.passageiro {
    border-top: 1px solid #ccc;
}

.linha-passageiro {
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

.info-passageiro {
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

.enderecos {
    width: 200px;
}

.enderecos h3{
  color: #fff;
  font-size: 2rem;
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
    color: white;
    border: none;
    padding: 15px;
    font-size: 1.1rem;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
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

.nenhum-passageiro {
    text-align: center;
    padding: 40px 20px;
}

.nenhum-passageiro-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.nenhum-passageiro-content h3 {
    margin: 0;
    font-size: 1.5rem;
    color: inherit;
}

.nenhum-passageiro-content p {
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

<style scoped>
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

.enderecos {
    width: 250px;
    margin: 0 45px;
}

.enderecos h3{
  text-align: center;
  border-bottom: 1px solid #ccc;

}
}

</style>
