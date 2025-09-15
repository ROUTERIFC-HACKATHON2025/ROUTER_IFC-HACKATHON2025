<script setup>
import { computed, ref } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { useUserProfileStore } from '@/stores/userProfile'
import { useAdminStore } from '@/stores/admin'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const userProfile = useUserProfileStore()
const admin = useAdminStore()

const vanSelecionada = computed(() => admin.selectedVan || { 
  nome: '-', 
  modelo: '-', 
  marca: '-',
  placa: '-', 
  acentos: 0, 
  ano: '-',
  cor: '-',
  caracteristicas: [],
  status: '-',
  motorista: null 
})
const motoristaSelecionado = computed(() => admin.selectedDriver)

const infoExpandida = ref(false)
const caracteristicasExpandida = ref(false)
const motoristaExpandido = ref(true) 

function toggleInfo() {
  infoExpandida.value = !infoExpandida.value
}

function toggleCaracteristicas() {
  caracteristicasExpandida.value = !caracteristicasExpandida.value
}

function toggleMotorista() {
  motoristaExpandido.value = !motoristaExpandido.value
}

function toggleStatusVan() {
  if (admin.selectedVan) {
    const novoStatus = admin.selectedVan.status === 'Ativo' ? 'Manutenção' : 'Ativo'
    const acao = novoStatus === 'Manutenção' ? 'colocar em manutenção' : 'ativar'
    
    if (confirm(`Tem certeza que deseja ${acao} a van "${admin.selectedVan.nome}"?`)) {
      admin.updateVanStatus(novoStatus)
      
      if (novoStatus === 'Manutenção') {
        admin.clearDriver()
        admin.clearAllPassengers()
      }
    }
  }
}

function removerPassageiro(id) {
  admin.removePassenger(id)
}

const rotaIda = computed(() => admin.getRotaEditada('ida'))
const rotaVolta12 = computed(() => admin.getRotaEditada('volta12'))
const rotaVolta17 = computed(() => admin.getRotaEditada('volta17'))

function editarRota(tipoRota, passageiros) {
  const rotaAtual = admin.getRotaEditada(tipoRota)
  const passageirosParaEditar = rotaAtual.length > 0 ? rotaAtual : passageiros
  
  admin.setRotaEmEdicao({ tipo: tipoRota, passageiros: passageirosParaEditar })
  authState.mudarAdminPage('editarRota')
}
</script>

<template>
  <section :style="{ color: themeManager.text }">
    <h1 class="titulo">
      PÁGINA DE 
      <span class="azul" :style="{ color: themeManager.detalheAlternativo }">
        GERENCIAMENTO
      </span>
    </h1>

    <p class="footer">
      <button class="link" @click="authState.mudarAdminPage('vans')" :style="{ color: themeManager.detalhe }">
        &larr; Voltar
      </button>
    </p>

    <div class="gerenciar" :style="{ backgroundColor: themeManager.detalhe, color: '#000' }">
      <div class="col-info">
        <div class="secao-retratil" :style="{ border: `2px solid ${themeManager.detalheAlternativo}` }">
          <div class="secao-header" @click="toggleInfo" :style="{backgroundColor: themeManager.detalheAlternativo}">
            <h3>INFORMAÇÕES DA VAN</h3>
            <span class="mdi" :class="infoExpandida ? 'mdi-chevron-up' : 'mdi-chevron-down'" :style="{ color: '#fff' }"></span>
          </div>
                      <div v-show="infoExpandida" class="secao-conteudo">
              <p><strong>Nome:</strong> {{ vanSelecionada.nome }}</p>
              <p><strong>Modelo:</strong> {{ vanSelecionada.modelo }}</p>
              <p><strong>Marca:</strong> {{ vanSelecionada.marca }}</p>
              <p><strong>Placa:</strong> {{ vanSelecionada.placa }}</p>
              <p><strong>Ano:</strong> {{ vanSelecionada.ano }}</p>
              <p><strong>Cor:</strong> {{ vanSelecionada.cor }}</p>
              <p><strong>Acentos:</strong> {{ vanSelecionada.acentos }}</p>
              <div class="status-container">
                <p><strong>Status:</strong> 
                  <span :style="{ color: vanSelecionada.status === 'Ativo' ? '#4CAF50' : '#FF9800' }">{{ vanSelecionada.status }}</span>
                </p>
                <button 
                  class="btn-status" 
                  @click="toggleStatusVan"
                  :style="{ 
                    backgroundColor: vanSelecionada.status === 'Ativo' ? '#FF9800' : '#4CAF50',
                    color: '#fff'
                  }"
                >
                  <span class="mdi" :class="vanSelecionada.status === 'Ativo' ? 'mdi-wrench' : 'mdi-check-circle'"></span>
                  {{ vanSelecionada.status === 'Ativo' ? 'Colocar em Manutenção' : 'Ativar Van' }}
                </button>
              </div>
            </div>
        </div>

        <div class="secao-retratil" :style="{ border: `2px solid ${themeManager.detalheAlternativo}` }">
          <div class="secao-header" @click="toggleCaracteristicas" :style="{backgroundColor: themeManager.detalheAlternativo}">
            <h3>CARACTERÍSTICAS</h3>
            <span class="mdi" :class="caracteristicasExpandida ? 'mdi-chevron-up' : 'mdi-chevron-down'" :style="{ color: '#fff' }"></span>
          </div>
          <div v-show="caracteristicasExpandida" class="secao-conteudo">
            <div class="caracteristicas">
              <ul>
                <li v-for="carac in vanSelecionada.caracteristicas" :key="carac">{{ carac }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="secao-retratil" :style="{ border: `2px solid ${themeManager.detalheAlternativo}` }">
          <div class="secao-header" @click="toggleMotorista" :style="{backgroundColor: themeManager.detalheAlternativo}">
            <h3>MOTORISTA</h3>
            <span class="mdi" :class="motoristaExpandido ? 'mdi-chevron-up' : 'mdi-chevron-down'" :style="{ color: '#fff' }"></span>
          </div>
                        <div v-show="motoristaExpandido" class="secao-conteudo">
                <div class="motorista-box">
                  <img src="/public/src-auth/motorista.png" alt="">
                  <p v-if="motoristaSelecionado">{{ motoristaSelecionado.nome }}</p>
                  <p v-else>Selecione um motorista</p>
                  <button 
                    class="btn-add" 
                    :disabled="vanSelecionada.status === 'Manutenção'"
                    :style="{ 
                      backgroundColor: vanSelecionada.status === 'Manutenção' ? '#666' : themeManager.detalheAlternativo,
                      opacity: vanSelecionada.status === 'Manutenção' ? 0.6 : 1,
                      cursor: vanSelecionada.status === 'Manutenção' ? 'not-allowed' : 'pointer'
                    }" 
                    @click="vanSelecionada.status !== 'Manutenção' && authState.mudarAdminPage('motorista')"
                  >
                    {{ vanSelecionada.status === 'Manutenção' ? 'Van em Manutenção' : (motoristaSelecionado ? 'Mudar Motorista' : 'Adicionar Motorista') }}
                  </button>
                </div>
              </div>
        </div>
      </div>

      <div class="col-passageiros">
        <div class="header-pass" :style="{ backgroundColor: themeManager.detalheAlternativo }">
          <h3>PASSAGEIROS</h3>
          <span>{{ admin.vanPassengers.length }}/{{ vanSelecionada.acentos }}</span>
        </div>
        
        <div v-if="vanSelecionada.status === 'Manutenção'" class="aviso-manutencao">
          <span class="mdi mdi-wrench"></span>
          <p>Van em manutenção - Não é possível adicionar passageiros</p>
        </div>
        <ul class="lista-passageiros">
          <li v-for="p in admin.vanPassengers" :key="p.id">
            <img src="/public/src-auth/passageiro.png" alt="" class="avatarP"> {{ p.nome }}
            <button class="remover" @click="removerPassageiro(p.id)">remover</button>
          </li>
        </ul>
        <button 
          class="btn-add" 
          :disabled="vanSelecionada.status === 'Manutenção'"
          :style="{ 
            backgroundColor: vanSelecionada.status === 'Manutenção' ? '#666' : themeManager.detalheAlternativo,
            opacity: vanSelecionada.status === 'Manutenção' ? 0.6 : 1,
            cursor: vanSelecionada.status === 'Manutenção' ? 'not-allowed' : 'pointer'
          }" 
          @click="vanSelecionada.status !== 'Manutenção' && authState.mudarAdminPage('passageiro')"
        >
          {{ vanSelecionada.status === 'Manutenção' ? 'Van em Manutenção' : 'Adicionar Passageiro' }}
        </button>
      </div>

      <div class="col-rotas">
        <div class="rota">
          <h3 :style="{ backgroundColor: themeManager.detalheAlternativo }">Rota Ida</h3>
          <ul>
            <li v-for="(p,i) in rotaIda" :key="p.id">
              <span>{{ i+1 }}</span> {{ p.nome }}
            </li>
          </ul>
          <button class="btn-edit" :style="{ backgroundColor: themeManager.detalheAlternativo }" @click="editarRota('ida', rotaIda)">Editar Rota</button>
        </div>

        <div class="rota">
          <h3 :style="{ backgroundColor: themeManager.detalheAlternativo }">Volta 12:00</h3>
          <ul>
            <li v-for="(p,i) in rotaVolta12" :key="p.id">
              <span>{{ i+1 }}</span> {{ p.nome }}
            </li>
          </ul>
          <button class="btn-edit" :style="{ backgroundColor: themeManager.detalheAlternativo }" @click="editarRota('volta12', rotaVolta12)">Editar Rota</button>
        </div>

        <div class="rota">
          <h3 :style="{ backgroundColor: themeManager.detalheAlternativo }">Volta 17:00</h3>
          <ul>
            <li v-for="(p,i) in rotaVolta17" :key="p.id">
              <span>{{ i+1 }}</span> {{ p.nome }}
            </li>
          </ul>
          <button class="btn-edit" :style="{ backgroundColor: themeManager.detalheAlternativo }" @click="editarRota('volta17', rotaVolta17)">Editar Rota</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section{
    padding: 0px 100px 100px 100px;

}

.titulo {
  font-size: 3rem;
  margin: 30px 0 0px 0;
  text-align: center;
}

.link {
  background: none;
  border: none;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 60px;
}

.gerenciar {
  display: grid;
  grid-template-columns: 250px 300px 700px;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
}

.col-info {
  border-right: 1px solid;
  padding: 20px 10px 20px 0;
  text-align: left;
  color: #fff;
}

.secao-retratil {
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
}

.secao-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
}


.secao-header h3 {
  margin: 0;
  font-size: 1rem;
  color: #fff;
  font-weight: bold;
}

.secao-header .mdi {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.secao-conteudo {
  padding: 15px;
}

.col-info p {
    margin: 10px 0px;
    font-size: 1.1rem;
}

.status-container {
  align-items: center;
  margin: 15px 0;
  padding: 10px;
  border-radius: 8px;
}

.status-container p {
  margin: 0;
  font-size: 1.1rem;
}

.btn-status {
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-status .mdi {
  font-size: 1rem;
}

.btn-status:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.aviso-manutencao {
  background-color: rgba(255, 152, 0, 0.2);
  border: 1px solid #FF9800;
  border-radius: 6px;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #FF9800;
}

.aviso-manutencao .mdi {
  font-size: 1.2rem;
}

.aviso-manutencao p {
  margin: 0;
  font-size: 0.9rem;
  font-weight: bold;
}

.caracteristicas {
  margin: 10px 0px;
}

.caracteristicas ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.caracteristicas li {
  padding: 8px 0;
  font-size: 1rem;
  color: #fff;
  position: relative;
  padding-left: 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.caracteristicas li:last-child {
  border-bottom: none;
}

.caracteristicas li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4CAF50;
  font-weight: bold;
  font-size: 1.2rem;
}

.secao-conteudo {
  transition: all 0.3s ease;
}

.motorista-box {
  text-align: center;
  margin-top: 10px;
}

.motorista-box p {
  margin: 10px 0;
  font-size: 1.1rem;
  color: #fff;
}

.motorista-box img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.btn-add, .btn-edit {
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #fff;
}

.col-passageiros {
  border-radius: 8px;
  padding: 10px;
}

.header-pass {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #fff;
  padding: 10px 15px;
  border-radius: 8px 8px 0 0;
}

.header-pass h3 {
    font-size: 1.7rem;
    font-weight: 600;
    margin: 0;
}

.lista-passageiros {
  list-style: none;
  padding: 10px;
  margin: 0;
  height: 400px;
  background-color: #fff;
  overflow-y: auto;
}

.lista-passageiros li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid;
}

.col-passageiros .btn-add {
  width: 100%;
  border-radius: 0;
  font-size: 1.6rem;
  border-radius: 0 0 8px 8px;
}

.avatarP {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.remover {
  background: none;
  border: none;
  color: red;
  font-size: 0.8rem;
  cursor: pointer;
  text-align: right;
}

.col-rotas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.rota {
  padding: 10px;
  border-radius: 8px;
}

.rota h3 {
  text-align: center;
  font-weight: bold;
  color: #fff;
  padding: 10px 15px;
   font-size: 1.7rem;
    font-weight: 600;
  border-radius: 8px 8px 0 0;
}

.rota ul {
  list-style: none;
  padding: 10px;
  margin: 0;
  height: 400px;
  background-color: #fff;
  overflow-y: auto;
}

.rota li {
  display: flex;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid;
  gap: 20px;
}

.btn-edit {
  width: 100%;
  border-radius: 0;
  font-size: 1.7rem;
  border-radius: 0 0 8px 8px;
}

@media (max-width: 768px) {
  section{
    padding: 0px 0px 50px 0px;
  }
  .titulo {
    font-size: 2.5rem;
  margin: 10px 0 0px;
}
.secao-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
}

.gerenciar {
  display: block;
  gap: 20px;
  padding: 25px;
  border-radius: 0;
}
.col-info {
  border-right: none;
  padding: 20px 10px 20px 10px;
}

.col-rotas {
  display: grid;
  grid-template-columns: none;
}

.rota {
  width: 350px;
}

.rota ul {
  list-style: none;
  padding: 10px;
  margin: 0;
  height: 400px;
  background-color: #fff;
  overflow-y: auto;
}

.rota li {
  display: flex;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid;
  gap: 20px;
}

.btn-edit {
  width: 100%;
  border-radius: 0;
  font-size: 1.7rem;
  border-radius: 0 0 8px 8px;
}
  
}
</style>
