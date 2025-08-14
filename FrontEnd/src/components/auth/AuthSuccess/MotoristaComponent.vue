<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useUserProfileStore } from '@/stores/userProfile'
import { useAuthStateStore } from '@/stores/authState'

const themeManager = useThemeManagerStore()
const userProfile = useUserProfileStore()
const authState = useAuthStateStore()
const router = useRouter()

// Perfil
const nome = ref(userProfile.nome ?? '')
const telefone = ref(userProfile.telefone ?? '')
const email = ref(userProfile.email ?? '')
const senha = ref(userProfile.senha ?? '')
const nascimento = ref(userProfile.nascimento ?? '')
const verSenha = ref(false)
const modoEdicao = ref(false)

// Transporte
const transporte = ref({
    placa: 'ABC-1234',
    tipo: 'Van Escolar',
    numero: '45'
})

// Rotas
const rotas = ref([
    { nome: 'João Silva', endereco: 'Rua das Flores, 123', expandido: false },
    { nome: 'Maria Souza', endereco: 'Av. Brasil, 456', expandido: false },
    { nome: 'Carlos Pereira', endereco: 'Praça Central, 78', expandido: false }
])

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

function toggleRota(index) {
    rotas.value[index].expandido = !rotas.value[index].expandido
}

onMounted(() => {
    themeManager.init()
    authState.restaurarState()
})
</script>

<template>
    <section class="container" :style="{ backgroundColor: themeManager.fundo }">

        <!-- PERFIL -->
        <div class="perfil" :style="{ backgroundColor: themeManager.detalhe }">
            <h2>MEU PERFIL</h2>
            <div class="perfil-topo">
                <div class="avatar"></div>
                <div class="enderecos">
                    <p>MEUS ENDEREÇOS <span class="mdi mdi-plus-circle-outline"></span></p>
                    <ul>
                        <li>
                            <span class="mdi mdi-map-marker"></span>
                            <p>Av. Getúlio Vargas, 554</p>
                            <span class="mdi mdi-pencil"></span>
                        </li>
                        <li>
                            <span class="mdi mdi-map-marker"></span>
                            <p>Rua XV de Novembro, 65</p>
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

        <div class="transporte" :style="{ backgroundColor: themeManager.detalhe }">
            <h2>SEU TRANSPORTE PARA HOJE</h2>
            <p><strong>Veículo:</strong></p>
            <div class="card">
                <div class="card-text">
                    <p><strong>Placa:</strong> {{ transporte.placa }}</p>
                    <p><strong>Tipo:</strong> {{ transporte.tipo }}</p>
                    <p><strong>Número:</strong> {{ transporte.numero }}</p>
                </div>
            </div>
        </div>

        <div class="rotas" :style="{ color: themeManager.text, borderColor: themeManager.detalhe }">
            <h2 :style="{ color: '#fff', backgroundColor: themeManager.detalhe }">ROTAS</h2>
            <div v-for="(rota, index) in rotas" :key="index" class="rota-item" >
                <div 
                    class="rota-info"
                    :style="{ borderBottom: rota.expandido ? 'none' : '2px solid ' + themeManager.detalhe }"
                >
                    <span class="mdi mdi-account-circle"></span>
                    <p>{{ rota.nome }} | {{ rota.endereco }}</p>
                    <span 
                        class="mdi" 
                        :class="rota.expandido ? 'mdi-chevron-up' : 'mdi-chevron-down'" 
                        @click="toggleRota(index)"
                        :style="{ color: themeManager.detalhe }"
                    ></span>
                </div>
                <div v-if="rota.expandido" class="rota-detalhes" :style="{ borderColor: themeManager.detalhe }">
                    <p>Informações adicionais do passageiro...</p>
                </div>
            </div>
        </div>

    </section>
</template>

<style scoped>
.container {
    padding: 20px 130px 60px 130px;
    min-height: 80vh;
    display: flex;
    gap: 16px;
    justify-content: space-between;
    flex-wrap: wrap;
}

.perfil {
  color: #fff;
  border-radius: 4px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
}

.perfil h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 12px;
}

.perfil-topo {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.avatar {
  width: 140px;
  height: 140px;
  background: #fff;
  border-radius: 50%;
}

.enderecos p {
  font-size: 20px;
  border-bottom: 1px solid #dadadab4;
  margin-bottom: 4px;
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
  font-size: 14px;
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

.input-group {
  background: #fff;
  border-radius: 4px;
  color: #383838;
  font-size: 16px;
  padding: 8px 12px;
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
  font-size: 13px;
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

.transporte {
  padding: 20px;
  height: 50%;
  border-radius: 4px;
  flex: 1 1 320px;
  min-width: 320px;
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
  color: #ffffff;
  border-radius: 4px;
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
  background: #ffffff;
  flex-shrink: 0;
}

.card .card-text p {
  margin: 0;
}

.rotas {
    border: 2px solid black;
    border-radius: 4px;
}

.rotas h2 {
    text-align: center;
    font-size: 2rem;
    padding: 8px;
}

.rota-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px;
}

.rota-info p {
    font-size: 1rem;
    margin: 0;
}

.rota-detalhes {
    font-size: 12px;
    opacity: 0.8;
    border-bottom: 2px solid black;
    padding: 0px 30px 15px 60px;
}

.mdi {
    cursor: pointer;
    font-size: 1.7rem;
}
</style>
