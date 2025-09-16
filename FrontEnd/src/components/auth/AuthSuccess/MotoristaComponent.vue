<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useUserProfileStore } from '@/stores/userProfile'
import { useAuthStateStore } from '@/stores/authState'
import MotoristaAPI from '@/api/motorista'
import axios from 'axios'

const themeManager = useThemeManagerStore()
const userProfile = useUserProfileStore()
const authState = useAuthStateStore()
const router = useRouter()

const nome = ref(userProfile.nome ?? '')
const telefone = ref(userProfile.telefone ?? '')
const email = ref(userProfile.email ?? '')
const senha = ref(userProfile.senha ?? '')
const nascimento = ref(userProfile.nascimento ?? '')
const verSenha = ref(false)
const modoEdicao = ref(false)

const endereco = ref('Rua Principal, 100')
const editarEndereco = ref(false)

const abrirPerfil = ref(true)
const abrirTransportes = ref(false)

function toggleEdicao() {
  if (modoEdicao.value) {
    userProfile.atualizarPerfil({
      nome: nome.value,
      telefone: telefone.value,
      email: email.value,
      senha: senha.value,
      nascimento: nascimento.value
    })
  } else {
    nome.value = userProfile.nome ?? ''
    telefone.value = userProfile.telefone ?? ''
    email.value = userProfile.email ?? ''
    senha.value = userProfile.senha ?? ''
    nascimento.value = userProfile.nascimento ?? ''
  }
  modoEdicao.value = !modoEdicao.value
}

function sairDaConta() {
  authState.reset()
  router.push('/')
}

onMounted(() => {
  themeManager.init()
  authState.restaurarState()
  // restaura token caso exista
  const t = localStorage.getItem('jwt_access')
  if (t) axios.defaults.headers.common['Authorization'] = `Bearer ${t}`
})

// Rastreamento de localização do motorista
const apiMotorista = new MotoristaAPI()
const motoristaId = ref(null)
const assistindoPosicao = ref(false)
let watchId = null

async function enviarLocalizacao(latitude, longitude, ativa) {
  try {
    if (!motoristaId.value) return
    await apiMotorista.atualizarLocalizacao(motoristaId.value, {
      latitude,
      longitude,
      rota_ativa: ativa
    })
  } catch (e) {
    console.error('Falha ao enviar localização:', e)
  }
}

async function iniciarRastreamento() {
  if (!('geolocation' in navigator) || assistindoPosicao.value) return
  assistindoPosicao.value = true
  // busca meu id de motorista (se usuário é motorista logado)
  if (!motoristaId.value) {
    try {
      const me = await axios.get('http://localhost:8000/api/usuarios/me/')
      if (me?.data?.is_motorista) {
        // buscar primeiro motorista do backend com email igual, como fallback simples
        const lista = await axios.get('http://localhost:8000/api/motoristas/')
        const found = lista?.data?.find?.(m => m?.email?.toLowerCase?.() === (me?.data?.email||'').toLowerCase())
        motoristaId.value = found?.idMotorista || lista?.data?.[0]?.idMotorista || null
      }
    } catch (_) {}
  }
  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords
      enviarLocalizacao(latitude, longitude, true)
    },
    (err) => {
      console.error('Erro no geolocation:', err)
    },
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
  )
}

function pararRastreamento() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId)
    watchId = null
  }
  assistindoPosicao.value = false
  // marca rota como inativa
  enviarLocalizacao(null, null, false)
}

function toggleRota() {
  if (assistindoPosicao.value) {
    pararRastreamento()
  } else {
    iniciarRastreamento()
  }
}

onUnmounted(() => {
  if (assistindoPosicao.value) pararRastreamento()
})

const passageirosIda = ref([
  { nome: 'João Silva', endereco: 'Rua das Flores, 120', pego: false },
  { nome: 'Maria Oliveira', endereco: 'Av. Central, 45', pego: false },
  { nome: 'Carlos Pereira', endereco: 'Rua das Acácias, 88', pego: false },
  { nome: 'Ana Souza', endereco: 'Rua João Paulo, 300', pego: false },
  { nome: 'Lucas Almeida', endereco: 'Rua do Campo, 55', pego: false },
  { nome: 'Juliana Santos', endereco: 'Av. Brasil, 200', pego: false },
  { nome: 'Marcos Vinícius', endereco: 'Rua Lagoa Azul, 14', pego: false },
  { nome: 'Fernanda Costa', endereco: 'Travessa da Serra, 77', pego: false },
  { nome: 'Roberto Lima', endereco: 'Rua XV de Novembro, 90', pego: false },
  { nome: 'Camila Rocha', endereco: 'Av. Atlântica, 101', pego: false }
])

const passageirosVolta12 = ref([
  { nome: 'Pedro Henrique', endereco: 'Rua do Comércio, 12', pego: false },
  { nome: 'Beatriz Ramos', endereco: 'Av. Independência, 89', pego: false },
  { nome: 'Rafael Gomes', endereco: 'Rua São Jorge, 35', pego: false },
  { nome: 'Larissa Ferreira', endereco: 'Rua Esperança, 222', pego: false },
  { nome: 'Thiago Martins', endereco: 'Av. Dom Pedro II, 333', pego: false },
  { nome: 'Gabriela Dias', endereco: 'Rua da Liberdade, 70', pego: false },
  { nome: 'André Carvalho', endereco: 'Travessa Bela Vista, 18', pego: false },
  { nome: 'Patrícia Mendes', endereco: 'Rua Santa Luzia, 150', pego: false }
])

const passageirosVolta17 = ref([
  { nome: 'Vinícius Barbosa', endereco: 'Rua Santo Antônio, 45', pego: false },
  { nome: 'Carolina Azevedo', endereco: 'Av. das Nações, 77', pego: false },
  { nome: 'Gustavo Nunes', endereco: 'Rua Projetada, 102', pego: false },
  { nome: 'Isabela Moraes', endereco: 'Rua Palmeira, 11', pego: false },
  { nome: 'Felipe Duarte', endereco: 'Rua São Paulo, 220', pego: false },
  { nome: 'Amanda Ribeiro', endereco: 'Av. Sete de Setembro, 60', pego: false },
  { nome: 'Eduardo Farias', endereco: 'Rua Marechal Deodoro, 15', pego: false },
  { nome: 'Natália Teixeira', endereco: 'Rua Horizonte, 90', pego: false },
  { nome: 'Henrique Moreira', endereco: 'Rua Monte Verde, 38', pego: false },
  { nome: 'Mariana Cunha', endereco: 'Av. Beira Rio, 270', pego: false },
  { nome: 'Rodrigo Lopes', endereco: 'Rua Presidente Vargas, 12', pego: false },
  { nome: 'Sofia Almeida', endereco: 'Travessa Aurora, 50', pego: false }
])

const rotaAtiva = ref(0)
function mudarRota(direcao) {
  if (direcao === 'next' && rotaAtiva.value < 2) rotaAtiva.value++
  if (direcao === 'prev' && rotaAtiva.value > 0) rotaAtiva.value--
}

function marcarPegou(p) {
  p.pego = !p.pego
}
</script>

<template>
  <section class="notebook" :style="{ backgroundColor: themeManager.fundo }">
    <!-- PERFIL -->
    <div class="perfil" :style="{ backgroundColor: themeManager.detalhe }">
      <h2>MEU PERFIL</h2>
      <div class="perfil-topo">
        <img src="/src-auth/motorista.png" class="avatar" alt="Avatar Motorista" />
        <div class="enderecos">
          <p>MEUS ENDEREÇOS</p>
          <ul>
            <li>
              <span class="mdi mdi-map-marker"></span>
              <div v-if="!editarEndereco">
                <p>{{ endereco }}</p>
              </div>
              <div v-else>
                <input v-model="endereco" class="input-endereco" type="text" />
              </div>
              <span class="mdi mdi-pencil" @click="editarEndereco = !editarEndereco"></span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Campos do Perfil -->
      <div class="inputs">
        <p class="info-label">Nome completo:</p>
        <div class="input-group">
          <span class="mdi mdi-account"></span>
          <input v-model="nome" :readonly="!modoEdicao" class="input-text" type="text" />
        </div>

        <p class="info-label">Telefone:</p>
        <div class="input-group">
          <span class="mdi mdi-phone"></span>
          <input v-model="telefone" :readonly="!modoEdicao" class="input-text" type="tel" />
        </div>

        <p class="info-label">Email:</p>
        <div class="input-group">
          <span class="mdi mdi-email"></span>
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
        <span @click="toggleEdicao">{{ modoEdicao ? 'Salvar' : 'Editar' }}</span>
      </div>

      <div class="sair" @click="sairDaConta">SAIR DA CONTA</div>
    </div>

    <!-- TRANSPORTE -->
    <div class="transporte" :style="{ backgroundColor: themeManager.detalhe }">
      <h2>SEU TRANSPORTE PARA HOJE</h2>
      <div class="card">
        <div class="card-text">
          <p><strong>nome:</strong> Van Executiva Premium</p>
          <p><strong>modelo:</strong> Sprinter 515 CDI</p>
          <p><strong>placa:</strong> ABC-1234</p>
        </div>
      </div>
    </div>

    <!-- ROTAS (IDA E VOLTA) -->
    <div v-for="(passageiros, index) in [passageirosIda, passageirosVolta12, passageirosVolta17]" :key="index" class="rota-container" v-show="rotaAtiva === index">
      <div class="rota-header" :style="{ backgroundColor: themeManager.detalhe }">
        <button @click="mudarRota('prev')" class="seta">‹</button>
        <h2>{{ index === 0 ? 'ROTA IDA' : index === 1 ? 'ROTA VOLTA 12h' : 'ROTA VOLTA 17h' }}</h2>
        <button @click="mudarRota('next')" class="seta">›</button>
      </div>

      <div class="rota-lista">
        <div v-for="(p, i) in passageiros" :key="p.nome + '-' + i" class="rota-item">
          <div class="passageiro">
            <img src="/src-auth/passageiro.png" alt="" class="avatar" />
            <div>
              <p>{{ p.nome }}</p>
              <p class="endereco">{{ p.endereco }}</p>
            </div>
          </div>
          <button
            class="ok-btn"
            :class="{ pego: p.pego }"
            @click="marcarPegou(p)"
            :style="{ backgroundColor: p.pego ? '#2e7d32' : themeManager.detalhe }"
          >
            {{ p.pego ? '✓' : 'OK' }}
          </button>
        </div>
      </div>

      <button class="iniciar-rota" :style="{ backgroundColor: themeManager.detalhe }" @click="toggleRota">{{ assistindoPosicao ? 'Parar Rota' : 'Iniciar Rota' }}</button>
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
            <img src="/src-auth/motorista.png" class="avatar" alt="">
            <div class="enderecos">
              <p>MEUS ENDEREÇOS <span class="mdi mdi-plus-circle-outline"></span></p>
              <ul>
                <li v-if="endereco">
                  <span class="mdi mdi-map-marker"></span>
                  <p>{{ endereco }}</p>
                  <span class="mdi mdi-pencil"></span>
                </li>
              </ul>
            </div>
          </div>

          <div class="inputs">
        <p class="info-label">Nome completo:</p>
        <div class="input-group">
          <span class="mdi mdi-account"></span>
          <input v-model="nome" :readonly="!modoEdicao" class="input-text" type="text" />
        </div>

        <p class="info-label">Telefone:</p>
        <div class="input-group">
          <span class="mdi mdi-phone"></span>
          <input v-model="telefone" :readonly="!modoEdicao" class="input-text" type="tel" />
        </div>

        <p class="info-label">Email:</p>
        <div class="input-group">
          <span class="mdi mdi-email"></span>
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
          <div class="transporte" :style="{ backgroundColor: themeManager.detalhe }">
        <div class="card">
          <div class="card-text">
            <p><strong>nome:</strong> Van Executiva Premium</p>
            <p><strong>modelo:</strong> Sprinter 515 CDI</p>
            <p><strong>placa:</strong> ABC-1234</p>
          </div>
        </div>
      </div>
        </div>
    </div>
    <div class="rota-container" v-show="rotaAtiva === 0">
      <div class="rota-header" :style="{ backgroundColor: themeManager.detalhe }">
        <button @click="mudarRota('prev')" class="seta">‹</button>
        <h2>ROTA IDA</h2>
        <button @click="mudarRota('next')" class="seta">›</button>
      </div>

      <div class="rota-lista">
        <div v-for="(p, i) in passageirosIda" :key="'ida-' + i" class="rota-item">
          <div class="passageiro">
            <img src="/src-auth/passageiro.png" alt="" class="avatar" />
            <div>
              <p>{{ p.nome }}</p>
              <p class="endereco">{{ p.endereco }}</p>
            </div>
          </div>
          <button
            class="ok-btn"
            :class="{ pego: p.pego }"
            @click="marcarPegou(p)"
            :style="{ backgroundColor: p.pego ? '#2e7d32' : themeManager.detalhe }"
          >
            {{ p.pego ? '✓' : 'OK' }}
          </button>
        </div>
      </div>

      <button class="iniciar-rota" :style="{ backgroundColor: themeManager.detalhe }" @click="toggleRota">{{ assistindoPosicao ? 'Parar Rota' : 'Iniciar Rota' }}</button>
    </div>

    <div class="rota-container" v-show="rotaAtiva === 1">
      <div class="rota-header" :style="{ backgroundColor: themeManager.detalhe }">
        <button @click="mudarRota('prev')" class="seta">‹</button>
        <h2>ROTA VOLTA 12h</h2>
        <button @click="mudarRota('next')" class="seta">›</button>
      </div>

      <div class="rota-lista">
        <div v-for="(p, i) in passageirosVolta12" :key="'v12-' + i" class="rota-item">
          <div class="passageiro">
            <img src="/src-auth/passageiro.png" alt="" class="avatar" />
            <div>
              <p>{{ p.nome }}</p>
              <p class="endereco">{{ p.endereco }}</p>
            </div>
          </div>
          <button
            class="ok-btn"
            :class="{ pego: p.pego }"
            @click="marcarPegou(p)"
            :style="{ backgroundColor: p.pego ? '#2e7d32' : themeManager.detalhe }"
          >
            {{ p.pego ? '✓' : 'OK' }}
          </button>
        </div>
      </div>

      <button class="iniciar-rota" :style="{ backgroundColor: themeManager.detalhe }" @click="toggleRota">{{ assistindoPosicao ? 'Parar Rota' : 'Iniciar Rota' }}</button>
    </div>

    <div class="rota-container" v-show="rotaAtiva === 2">
      <div class="rota-header" :style="{ backgroundColor: themeManager.detalhe }">
        <button @click="mudarRota('prev')" class="seta">‹</button>
        <h2>ROTA VOLTA 17h</h2>
        <button @click="mudarRota('next')" class="seta">›</button>
      </div>

      <div class="rota-lista">
        <div v-for="(p, i) in passageirosVolta17" :key="'v17-' + i" class="rota-item">
          <div class="passageiro">
            <img src="/src-auth/passageiro.png" alt="" class="avatar" />
            <div>
              <p>{{ p.nome }}</p>
              <p class="endereco">{{ p.endereco }}</p>
            </div>
          </div>
          <button
            class="ok-btn"
            :class="{ pego: p.pego }"
            @click="marcarPegou(p)"
            :style="{ backgroundColor: p.pego ? '#2e7d32' : themeManager.detalhe }"
          >
            {{ p.pego ? '✓' : 'OK' }}
          </button>
        </div>
      </div>

      <button class="iniciar-rota" :style="{ backgroundColor: themeManager.detalhe }">Iniciar Rota</button>
    </div>
  </section>
</template>

<style scoped>
.notebook, .celular {
  padding: 20px 130px 60px 130px;
  min-height: 80vh;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.celular{
  display: none;
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
  font-size: 20px;
  border-bottom: 1px solid #dadadab4;
  margin-bottom: 4px;
  color: #fff;
}

.enderecos p span {
  margin-left: 8px;
  color: #fff;
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

.enderecos ul li p{
  font-size: 15px;
  border: none;
  align-items: center;
  margin-top: 5px;
}

.enderecos ul li .mdi {
  font-size: 15px;
}

.input-endereco {
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 4px 8px;
  width: 100%;
  background: rgba(255,255,255,0.1);
  color: #fff;
  outline: none;
}

.inputs p {
  color: #fff;
  font-size: 12px;
  margin-bottom: 3px;
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
  color: #ffffff;
  margin-top: 8px;
  font-size: 10px;
  cursor: pointer;
  user-select: none;
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
  height: 50%;
  border-radius: 4px;
  min-width: 400px;
  box-shadow: 0 6px 15px rgba(26, 86, 156, 0.3);
  color: #ffffff;
}

.transporte h2 {
  text-align: center;
  margin-bottom: 16px;
  font-size: 20px;
}

.card {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  padding: 14px 16px;
  margin-bottom: 14px;
  font-size: 15px;
  box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.2);
}

.rota-container {
  height: 580px;
  width: 400px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.rota-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  padding: 20px;
}

.rota-header h2 {
  font-size: 1.5rem;
  margin: 0;
}

.seta {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}

.rota-lista {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 8px;
  overflow-y: auto;
}

.rota-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  font-size: 13px;
}

.passageiro {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
}

.passageiro .avatar {
  height: 30px;
  width: 30px;
  color: #888;
  background: none;
}

.endereco{
  font-size: 12px;
  color: #666;
  margin: 0;
}

.ok-btn {
  padding: 4px 10px;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  min-width: 50px;
}

.ok-btn.pego {
  background: #2e7d32;
}

.iniciar-rota {
  width: 100%;
  padding: 16px;
  color: #fff;
  font-size: 1.3rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-top: 1px solid #ccc;
}
</style>


<style scoped>
@media (max-width: 768px) {
  .notebook {
    display: none;
  }
  .celular{
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

  .enderecos ul li p{
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
  background: rgba(0,0,0,0.15);
}

.conteudo-retratil {
  padding: 16px;
}

.transporte {
  padding: 0px;
  min-width: 100px;
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
</style>

