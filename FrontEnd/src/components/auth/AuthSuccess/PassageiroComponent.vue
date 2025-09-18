<script setup>
import { ref, onMounted, watch } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { useUserDataStore } from '@/stores/userData'
import { useRouter } from 'vue-router'
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import MotoristaAPI from '@/api/motorista'
import axios from 'axios'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const userData = useUserDataStore()
const router = useRouter()

const modoEdicao = ref(false)
const verSenha = ref(false)
const abrirPerfil = ref(true)
const abrirTransportes = ref(false)

const mostrarFormularioEndereco = ref(false)
const editandoEndereco = ref(false)
const enderecoEditando = ref(null)
const novoEndereco = ref({
  cidade: '',
  bairro: '',
  rua: '',
  numero: '',
  cep: ''
})

const nome = ref('')
const telefone = ref('')
const email = ref('')
const senha = ref('')
const nascimento = ref('')
const endereco = ref('Rua Principal, 100')
const descricao = ref('')

const ira = ref('')
const voltara = ref('')
const horario = ref('')

onMounted(async () => {
  themeManager.init()
  authState.restaurarState()
  const t = localStorage.getItem('jwt_access')
  if (t) axios.defaults.headers.common['Authorization'] = `Bearer ${t}`

  await userData.fetchUserData()

  initMap()
  iniciarPollingLocalizacao()
})

watch(
  () => userData.userData,
  (novoUsuario) => {
    if (novoUsuario) {
      nome.value = novoUsuario.nome || ''
      telefone.value = novoUsuario.telefone || ''
      email.value = novoUsuario.email || ''
      senha.value = novoUsuario.senha || ''
      nascimento.value = novoUsuario.nascimento || ''
      endereco.value = novoUsuario.endereco || 'Endereço não informado'
      descricao.value = novoUsuario.descricao || ''
    }
  },
  { immediate: true }
)

function initMap() {
  const mapId = window.innerWidth > 768 ? "mapaNotebook" : "mapaCelular"
  const map = L.map(mapId).setView([-23.5505, -46.6333], 13)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map)
  motoristaMap.value = { map, marker: null }
}

const motoristaMap = ref({ map: null, marker: null })
const apiMotorista = new MotoristaAPI()
const motoristaId = ref(null)
let pollingId = null

async function obterELancarMarcador() {
  try {
    let motoristaComRotaAtiva = null
    try {
      const lista = await axios.get('http://localhost:8000/api/motoristas/')
      motoristaComRotaAtiva = lista?.data?.find(m => m.rota_ativa === true)
    } catch (error) {
      console.error('Erro ao buscar motoristas:', error)
      return
    }

    if (!motoristaComRotaAtiva) {
      if (motoristaMap.value.marker) {
        motoristaMap.value.map.removeLayer(motoristaMap.value.marker)
        motoristaMap.value.marker = null
      }
      motoristaId.value = null
      return
    }

    motoristaId.value = motoristaComRotaAtiva.idMotorista

    const loc = await apiMotorista.obterLocalizacaoAtual(motoristaId.value)
    const mapa = motoristaMap.value.map
    if (!mapa) return

    const ativa = !!loc?.rota_ativa
    const hasCoords = loc?.latitude != null && loc?.longitude != null

    if (!ativa || !hasCoords) {
      if (motoristaMap.value.marker) {
        motoristaMap.value.map.removeLayer(motoristaMap.value.marker)
        motoristaMap.value.marker = null
      }
      return
    }

    const lat = Number(loc.latitude)
    const lng = Number(loc.longitude)

    if (!motoristaMap.value.marker) {
      motoristaMap.value.marker = L.marker([lat, lng]).addTo(motoristaMap.value.map)
      motoristaMap.value.map.setView([lat, lng], 15)
    } else {
      motoristaMap.value.marker.setLatLng([lat, lng])
    }
  } catch (e) {
    console.error('Falhou', e)
  }
}

function iniciarPollingLocalizacao() {
  if (pollingId) return
  obterELancarMarcador()
  pollingId = setInterval(obterELancarMarcador, 4000)
}


async function toggleEdicao() {
  if (modoEdicao.value && userData.userData) {
    const success = await userData.updateUserData({
      nome: nome.value,
      telefone: telefone.value,
      email: email.value,
      senha: senha.value,
      nascimento: nascimento.value,
      endereco: endereco.value,
      descricao: descricao.value
    })

    if (success) {
      alert('Perfil atualizado com sucesso!')
    } else {
      alert('Erro ao atualizar perfil. Tente novamente.')
    }
  }
  modoEdicao.value = !modoEdicao.value
}

function sairDaConta() {
  userData.clearUserData()
  authState.reset()
  router.push('/')
}

function confirmarIdaVolta() {
  console.log({ ira: ira.value, voltara: voltara.value, horario: horario.value })
  alert("Informações de ida e volta salvas!")
}

function abrirFormularioEndereco() {
  mostrarFormularioEndereco.value = true
  editandoEndereco.value = false
  enderecoEditando.value = null
  novoEndereco.value = {
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    cep: ''
  }
}

function abrirEdicaoEndereco(endereco) {
  mostrarFormularioEndereco.value = true
  editandoEndereco.value = true
  enderecoEditando.value = endereco
  novoEndereco.value = {
    cidade: endereco.cidade,
    bairro: endereco.bairro,
    rua: endereco.rua,
    numero: endereco.numero,
    cep: endereco.cep
  }
}

function fecharFormularioEndereco() {
  mostrarFormularioEndereco.value = false
  editandoEndereco.value = false
  enderecoEditando.value = null
  novoEndereco.value = {
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    cep: ''
  }
}

async function salvarEndereco() {
  try {
    if (!novoEndereco.value.cidade || !novoEndereco.value.bairro || !novoEndereco.value.rua || !novoEndereco.value.numero) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const enderecoData = {
      cidade: novoEndereco.value.cidade,
      bairro: novoEndereco.value.bairro,
      rua: novoEndereco.value.rua,
      numero: parseInt(novoEndereco.value.numero),
      cep: novoEndereco.value.cep ? parseInt(novoEndereco.value.cep) : 0
    }

    console.log('Dados do endereço preparados:', enderecoData)

    let success = false
    if (editandoEndereco.value) {
      success = await userData.editarEndereco(enderecoEditando.value.idEndereco, enderecoData)
    } else {
      success = await userData.adicionarEndereco(enderecoData)
    }

    if (success) {
      alert(editandoEndereco.value ? 'Endereço atualizado com sucesso!' : 'Endereço adicionado com sucesso!')
      fecharFormularioEndereco()
    } else {
      alert('Erro ao salvar endereço. Tente novamente.')
    }
  } catch (error) {
    console.error('Erro ao salvar endereço:', error)
    alert('Erro ao salvar endereço. Tente novamente.')
  }
}

async function removerEndereco(idEndereco) {
  if (confirm('Tem certeza que deseja remover este endereço?')) {
    const success = await userData.removerEndereco(idEndereco)
    if (success) {
      alert('Endereço removido com sucesso!')
    } else {
      alert('Erro ao remover endereço. Tente novamente.')
    }
  }
}

function formatarEndereco(endereco) {
  return `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade}`
}
</script>

<template>
  <section class="notebook" :style="{ backgroundColor: themeManager.fundo }">
    <div class="perfil" :style="{ backgroundColor: themeManager.detalhe }">
      <h2>MEU PERFIL</h2>
      <div class="perfil-topo">
        <img src="/src-auth/passageiro.png" class="avatar" alt="">
        <div class="enderecos">
          <p>MEUS ENDEREÇOS <span class="mdi mdi-plus-circle-outline" @click="abrirFormularioEndereco"></span></p>
          <ul>
            <li v-for="endereco in userData.userData?.enderecos || []" :key="endereco.idEndereco">
              
              <p>{{ formatarEndereco(endereco) }}</p>
              <div class="endereco-actions">
                <span class="mdi mdi-pencil" @click="abrirEdicaoEndereco(endereco)"></span>
                <span class="mdi mdi-delete" @click="removerEndereco(endereco.idEndereco)"></span>
              </div>
            </li>
            <li v-if="!userData.userData?.enderecos || userData.userData?.enderecos.length === 0">
              
              <p>Nenhum endereço cadastrado</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="inputs">
        <p class="info-label">Nome completo:</p>
        <div class="input-group"><span class="mdi mdi-account"></span>
          <input v-model="nome" :readonly="!modoEdicao" class="input-text" type="text" />
        </div>

        <p class="info-label">Telefone:</p>
        <div class="input-group"><span class="mdi mdi-phone"></span>
          <input v-model="telefone" :readonly="!modoEdicao" class="input-text" type="tel" />
        </div>

        <p class="info-label">Email:</p>
        <div class="input-group"><span class="mdi mdi-email"></span>
          <input v-model="email" :readonly="!modoEdicao" class="input-text" type="email" />
        </div>

        <p class="info-label">Senha:</p>
        <div class="input-group senha-campo">
          <span class="mdi mdi-lock"></span>
          <input :type="verSenha ? 'text' : 'password'" v-model="senha" :readonly="!modoEdicao" class="input-text" />
          <span class="mdi" :class="verSenha ? 'mdi-eye-off' : 'mdi-eye'" @click="verSenha = !verSenha"></span>
        </div>

        <p class="info-label">Data de nascimento:</p>
        <div class="input-group data-campo">
          <span class="mdi mdi-calendar-month-outline"></span>
          <input type="date" v-model="nascimento" :readonly="!modoEdicao" class="input-text" />
        </div>
      </div>

      <div class="editar">
        <span @click="toggleEdicao">{{ modoEdicao ? 'Salvar' : 'Editar' }}</span> | Ver informação completa
      </div>

      <div class="sair" @click="sairDaConta">SAIR DA CONTA</div>
    </div>

    <div>
      <div class="row right-side">
        <div class="transporte" :style="{ backgroundColor: themeManager.detalhe }">
          <h2>MEUS TRANSPORTES</h2>
          <p><strong>Motorista:</strong></p>
          <div class="card">
            <img src="/src-auth/motorista.png" class="avatar" alt="">
            <div class="card-text">
              <p>{{ userData.userData?.motorista?.nome || 'Pedro' }}</p>
              <p>{{ userData.userData?.motorista?.telefone || '(47) 99999-9999' }}</p>
            </div>
          </div>

          <p><strong>Veículo:</strong></p>
          <div class="card">
            <div class="card-separacao-text"></div>
            <p>{{ userData.userData?.van?.nome || 'Van Executiva Premium' }}</p>
          </div>
        </div>

        <div id="mapaNotebook" class="mapa"></div>
      </div>

      <div class="ida-volta" :style="{ backgroundColor: themeManager.fundoAlternativo, color: themeManager.text }">
        <h2>MINHA IDA E VOLTA</h2>
        <div class="ida-grid">
          <div class="ida-card" :style="{ backgroundColor: themeManager.fundo }">
            <p>IREI COM O TRANSPORTE DIA 02/07?</p>
            <label><input type="radio" v-model="ira" value="sim" /> SIM</label>
            <label><input type="radio" v-model="ira" value="nao" /> NÃO</label>
          </div>
          <div class="ida-card" :style="{ backgroundColor: themeManager.fundo }">
            <p>VOLTAREI COM O TRANSPORTE DIA 02/07?</p>
            <label><input type="radio" v-model="voltara" value="sim" /> SIM</label>
            <label><input type="radio" v-model="voltara" value="nao" /> NÃO</label>
          </div>
          <div class="ida-card" :style="{ backgroundColor: themeManager.fundo }">
            <p>VOLTAREI EM QUE HORÁRIO?</p>
            <label><input type="radio" v-model="horario" value="12" :disabled="voltara !== 'sim'" /> 12:00H</label>
            <label><input type="radio" v-model="horario" value="17" :disabled="voltara !== 'sim'" /> 17:00H</label>
          </div>
        </div>
        <button @click="confirmarIdaVolta" class="confirmar"
          :style="{ backgroundColor: themeManager.detalhe }">CONFIRMAR</button>
      </div>
    </div>
  </section>

  <section class="celular" :style="{ backgroundColor: themeManager.fundo }">
    <div class="barra-retratil" :style="{ backgroundColor: themeManager.detalhe }">
      <div class="barra-titulo" @click="abrirPerfil = !abrirPerfil">
        <h2>MEU PERFIL</h2>
        <span class="mdi" :class="abrirPerfil ? 'mdi-chevron-up' : 'mdi-chevron-down'"></span>
      </div>
      <div v-show="abrirPerfil" class="conteudo-retratil">
        <div class="perfil-topo">
          <img src="/src-auth/passageiro.png" class="avatar" alt="">
          <div class="enderecos">
            <p>MEUS ENDEREÇOS <span class="mdi mdi-plus-circle-outline" @click="abrirFormularioEndereco"></span></p>
            <ul>
              <li v-for="endereco in userData.userData?.enderecos || []" :key="endereco.idEndereco">
                
                <p>{{ formatarEndereco(endereco) }}</p>
                <div class="endereco-actions">
                  <span class="mdi mdi-pencil" @click="abrirEdicaoEndereco(endereco)"></span>
                  <span class="mdi mdi-delete" @click="removerEndereco(endereco.idEndereco)"></span>
                </div>
              </li>
              <li v-if="!userData.userData?.enderecos || userData.userData?.enderecos.length === 0">
                
                <p>Nenhum endereço cadastrado</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="inputs">
          <p class="info-label">Nome completo:</p>
          <div class="input-group"><span class="mdi mdi-account"></span>
            <input v-model="nome" :readonly="!modoEdicao" class="input-text" type="text" />
          </div>
          <p class="info-label">Telefone:</p>
          <div class="input-group"><span class="mdi mdi-phone"></span>
            <input v-model="telefone" :readonly="!modoEdicao" class="input-text" type="tel" />
          </div>
          <p class="info-label">Email:</p>
          <div class="input-group"><span class="mdi mdi-email"></span>
            <input v-model="email" :readonly="!modoEdicao" class="input-text" type="email" />
          </div>
          <p class="info-label">Senha:</p>
          <div class="input-group senha-campo">
            <span class="mdi mdi-lock"></span>
            <input :type="verSenha ? 'text' : 'password'" v-model="senha" :readonly="!modoEdicao" class="input-text" />
            <span class="mdi" :class="verSenha ? 'mdi-eye-off' : 'mdi-eye'" @click="verSenha = !verSenha"></span>
          </div>
          <p class="info-label">Data de nascimento:</p>
          <div class="input-group data-campo">
            <span class="mdi mdi-calendar-month-outline"></span>
            <input type="date" v-model="nascimento" :readonly="!modoEdicao" class="input-text" />
          </div>
        </div>

        <div class="editar">
          <span @click="toggleEdicao">{{ modoEdicao ? 'Salvar' : 'Editar' }}</span> | Ver informação completa
        </div>
        <div class="sair" @click="sairDaConta">SAIR DA CONTA</div>
      </div>
    </div>

    <div class="barra-retratil" :style="{ backgroundColor: themeManager.detalhe }">
      <div class="barra-titulo" @click="abrirTransportes = !abrirTransportes">
        <h2>MEUS TRANSPORTES</h2>
        <span class="mdi" :class="abrirTransportes ? 'mdi-chevron-up' : 'mdi-chevron-down'"></span>
      </div>
      <div v-show="abrirTransportes" class="conteudo-retratil">
        <p><strong>Motorista:</strong></p>
        <div class="card">
          <img src="/src-auth/motorista.png" class="avatar" alt="">
          <div class="card-text">
            <p>{{ userData.userData?.motorista?.nome || 'Pedro' }}</p>
            <p>{{ userData.userData?.motorista?.telefone || '(47) 99999-9999' }}</p>
          </div>
        </div>
        <p><strong>Veículo:</strong></p>
        <div class="card">
          <div class="card-separacao-text"></div>
          <p>{{ userData.userData?.van?.nome || 'Van Executiva Premium' }}</p>
        </div>
      </div>
      <div id="mapaCelular" class="mapa"></div>
    </div>

    <div class="ida-volta" :style="{ backgroundColor: themeManager.fundoAlternativo, color: themeManager.text }">
      <h2>MINHA IDA E VOLTA</h2>
      <div class="ida-grid">
        <div class="ida-card" :style="{ backgroundColor: themeManager.fundo }">
          <p>IREI COM O TRANSPORTE DIA 02/07?</p>
          <label><input type="radio" v-model="ira" value="sim" /> SIM</label>
          <label><input type="radio" v-model="ira" value="nao" /> NÃO</label>
        </div>
        <div class="ida-card" :style="{ backgroundColor: themeManager.fundo }">
          <p>VOLTAREI COM O TRANSPORTE DIA 02/07?</p>
          <label><input type="radio" v-model="voltara" value="sim" /> SIM</label>
          <label><input type="radio" v-model="voltara" value="nao" /> NÃO</label>
        </div>
        <div class="ida-card" :style="{ backgroundColor: themeManager.fundo }">
          <p>VOLTAREI EM QUE HORÁRIO?</p>
          <label><input type="radio" v-model="horario" value="12" :disabled="voltara !== 'sim'" /> 12:00H</label>
          <label><input type="radio" v-model="horario" value="17" :disabled="voltara !== 'sim'" /> 17:00H</label>
        </div>
      </div>
      <button @click="confirmarIdaVolta" class="confirmar"
        :style="{ backgroundColor: themeManager.detalhe }">CONFIRMAR</button>
    </div>
  </section>

  <div v-if="mostrarFormularioEndereco" class="modal-overlay" @click="fecharFormularioEndereco">
    <div class="modal-content" :style="{ backgroundColor: themeManager.fundo }" @click.stop>
      <div class="modal-header">
        <h3 :style="{ color: themeManager.text }">{{ editandoEndereco ? 'Editar Endereço' : 'Adicionar Endereço' }}</h3>
        <span class="mdi mdi-close" @click="fecharFormularioEndereco"></span>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label :style="{ color: themeManager.text }">Cidade *</label>
          <input v-model="novoEndereco.cidade" type="text" placeholder="Digite a cidade" />
        </div>

        <div class="form-group">
          <label :style="{ color: themeManager.text }" >Bairro *</label>
          <input v-model="novoEndereco.bairro" type="text" placeholder="Digite o bairro" />
        </div>

        <div class="form-group">
          <label :style="{ color: themeManager.text }">Rua *</label>
          <input v-model="novoEndereco.rua" type="text" placeholder="Digite a rua" />
        </div>

        <div class="form-group">
          <label :style="{ color: themeManager.text }">Número *</label>
          <input v-model="novoEndereco.numero" type="number" placeholder="Digite o número" />
        </div>

        <div class="form-group">
          <label :style="{ color: themeManager.text }">CEP</label>
          <input v-model="novoEndereco.cep" type="number" placeholder="Digite o CEP" />
        </div>
      </div>

      <div class="modal-footer">
        <button @click="fecharFormularioEndereco" class="btn-cancelar">Cancelar</button>
        <button @click="salvarEndereco" class="btn-salvar" :style="{ backgroundColor: themeManager.detalhe }">
          {{ editandoEndereco ? 'Atualizar' : 'Adicionar' }}
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.notebook,
.celular {
  padding: 20px 130px 60px 130px;
  min-height: 80vh;
  display: flex;
  gap: 16px;
  justify-content: space-between;
}

.celular {
  display: none;
}

.row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.perfil {
  color: #fff;
  border-radius: 8px;
  padding: 25px;
  width: 100%;
  max-width: 400px;
  height: 580px;
}

.perfil h2 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 12px;
}

.perfil-topo {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.avatar {
  width: 120px;
  height: 120px;
  background: #fff;
  border-radius: 50%;
}

.enderecos p {
  font-size: 18px;
  border-bottom: 1px solid #dadadab4;
  margin-bottom: 4px;
  color: #fff;
}

.enderecos p span {
  margin-left: 8px;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease;
}

.enderecos p span:hover {
  color: #4CAF50;
}

.enderecos ul {
  list-style: none;
  padding: 0;
  font-size: 11px;
  color: #fff;
}

.enderecos ul li {
  border-bottom: 1px solid #dadadab4;
  margin-bottom: 4px;
  padding-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.enderecos ul li p {
  font-size: 15px;
  border: none;
  align-items: center;
  margin-top: 5px;
  flex: 1;
}

.endereco-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.endereco-actions span {
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s ease;
}

.endereco-actions .mdi-pencil:hover {
  color: #2196F3;
}

.endereco-actions .mdi-delete:hover {
  color: #f44336;
}

.inputs p {
  font-size: 12px;
  margin-bottom: 3px;
  color: #fff;
}

.info-label {
  font-size: 14px;
  margin: 6px 0 1px;
}

.input-group {
  background: #fff;
  border-radius: 5px;
  color: #383838;
  font-size: 16px;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.input-group input {
  border: none;
  background: transparent;
  font-size: 14px;
  width: 100%;
  outline: none;
  color: #383838;
}

.input-group input[readonly] {
  cursor: default;
}

.senha-campo span,
.data-campo span {
  cursor: pointer;
  font-size: 18px;
}

.data-campo {
  max-width: 50%;
}

.editar {
  margin-top: 8px;
  font-size: 10px;
  cursor: pointer;
  user-select: none;
  color: #ffffff;
}

.sair {
  margin-top: 12px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.sair:hover {
  color: rgb(255, 97, 97);
  transform: scale(1.05);
}

.right-side {
  display: flex;
  justify-content: center;
}

.transporte {
  padding: 20px;
  border-radius: 12px;
  flex: 1 1 300px;
  height: 280px;
  box-shadow: 0 6px 15px rgba(26, 86, 156, 0.3);
  color: #ffffff;
}

.transporte h2 {
  text-align: center;
  margin-bottom: 16px;
  font-size: 20px;
}

.transporte p {
  margin: 0 0 4px;
  font-weight: 600;
  font-size: 14px;
}

.card {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 14px;
  font-size: 15px;
  box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.2);
  display: flex;
  gap: 12px;
  align-items: center;
}

.card .avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.card .card-text p {
  margin: 0;
}

.mapa {
  flex: 1 1 300px;
  height: 280px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.ida-volta {
  padding: 15px;
  border-radius: 12px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ida-volta h2 {
  text-align: center;
  font-size: 22px;
  margin-bottom: 12px;
}

.ida-grid {
  display: flex;
  gap: 16px;
}

.ida-card {
  padding: 16px;
  border-radius: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ida-card p {
  margin: 0 0 8px;
  font-weight: 600;
  font-size: 14px;
}

.ida-card label {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.confirmar {
  color: #ffffff;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  align-self: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirmar:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .notebook {
    display: none;
  }

  .celular {
    display: block;
  }

  .celular {
    padding: 60px 20px 60px 20px;
    min-height: 80vh;
    display: flex;
    gap: 16px;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
  }

  .perfil {
    color: #fff;
    border-radius: 8px;
    padding: 25px;
    width: 100%;
    max-width: none;
  }

  .perfil h2 {
    text-align: center;
    font-size: 28px;
    margin-bottom: 12px;
  }

  .perfil-topo {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
    flex-direction: column;
    align-items: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    background: #fff;
    border-radius: 50%;
  }

  .enderecos p {
    font-size: 20px;
    border-bottom: 1px solid #dadadab4;
    margin-bottom: 4px;
    text-align: center;
  }

  .enderecos p span {
    margin-left: 8px;
  }

  .enderecos ul {
    list-style: none;
    padding: 0;
    font-size: 11px;
  }

  .enderecos ul li {
    border-bottom: 1px solid #dadadab4;
    margin-bottom: 4px;
    padding-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .enderecos ul li p {
    font-size: 15px;
    border: none;
    align-items: center;
    margin-top: 5px;
  }

  .inputs p {
    font-size: 16px;
    margin-bottom: 6px;
  }

  .info-label {
    font-size: 14px;
    margin: 6px 0 1px;
  }

  .barra-retratil {
    border-radius: 8px;
    margin-bottom: 12px;
    overflow: hidden;
    width: 100%;
  }

  .barra-titulo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 14px 20px;
    font-size: 20px;
    width: 100%;
    font-weight: bold;
    color: #fff;
    background: rgba(0, 0, 0, 0.15);
  }

  .conteudo-retratil {
    padding: 16px;
  }


  .ida-volta {
    padding: 20px 10px;
    border-radius: 8px;
    width: 100%;
  }

  .ida-volta h2 {
    font-size: 1rem;
    margin-bottom: 0px;
  }

  .ida-card {
    padding: 10px;
    margin-top: 10px;
  }

  .ida-grid {
    display: block;
  }

  .confirmar {
    padding: 10px 18px;
    width: 100%;
    border-radius: 8px;
    font-size: 20px;
  }

}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 0;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

.modal-header .mdi-close {
  cursor: pointer;
  font-size: 24px;
  color: #666;
  transition: color 0.3s ease;
}

.modal-header .mdi-close:hover {
  color: #f44336;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
}

.btn-cancelar {
  padding: 10px 20px;
  border: 1px solid #ddd;
  background: white;
  color: #666;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn-cancelar:hover {
  background: #f5f5f5;
  border-color: #bbb;
}

.btn-salvar {
  padding: 10px 20px;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-salvar:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 20px;
  }

  .modal-header {
    padding: 16px;
  }

  .modal-body {
    padding: 16px;
  }

  .modal-footer {
    padding: 16px;
    flex-direction: column;
  }

  .btn-cancelar,
  .btn-salvar {
    width: 100%;
  }
}
</style>
