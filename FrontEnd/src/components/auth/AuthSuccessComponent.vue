<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeManagerStore } from '@/stores/themeManager'
import { useUserProfileStore } from '@/stores/userProfile'
import { useAuthStateStore } from '@/stores/authState'

const themeManager = useThemeManagerStore()
const userProfile = useUserProfileStore()
const authState = useAuthStateStore()
const router = useRouter()

const nome = ref(userProfile.nome)
const telefone = ref(userProfile.telefone)
const email = ref(userProfile.email)
const senha = ref(userProfile.senha)
const nascimento = ref(userProfile.nascimento)

const verSenha = ref(false)
const modoEdicao = ref(false)

const ira = ref('sim')
const voltara = ref('nao')
const horario = ref('12')

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
    nome.value = userProfile.nome
    telefone.value = userProfile.telefone
    email.value = userProfile.email
    senha.value = userProfile.senha
    nascimento.value = userProfile.nascimento
  }
  modoEdicao.value = !modoEdicao.value
}

function sairDaConta() {
  authState.reset()
  router.push('/')
}
</script>

<template>
  <section class="container" :style="{ backgroundColor: themeManager.fundo }">
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

      <div class="editar" @click="toggleEdicao">
        {{ modoEdicao ? 'Salvar' : 'Editar' }} | Ver informação completa
      </div>

      <div class="sair" @click="sairDaConta">SAIR DA CONTA</div>
    </div>

    <div>
      <div class="row right-side">
        <div class="transporte" :style="{ backgroundColor: themeManager.detalhe }">
          <h2>MEUS TRANSPORTES</h2>
          <p><strong>Motorista:</strong></p>
          <div class="card">
            <div class="avatar"></div>
            <div class="card-text">
              <p>{{ nome }}</p>
              <p>{{ telefone }}</p>
            </div>
          </div>

          <p><strong>Veículo:</strong></p>
          <div class="card">
            <div class="card-separacao-text"></div>
            <p>Número do veículo</p>
          </div>
        </div>

        <div class="mapa">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.5!2d-49.1!3d-26.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzI0LjAiUyA0OcKwMDYnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
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
            <label>
              <input type="radio" v-model="horario" value="12" :disabled="voltara !== 'sim'" /> 12:00H
            </label>
            <label>
              <input type="radio" v-model="horario" value="17" :disabled="voltara !== 'sim'" /> 17:00H
            </label>
          </div>
        </div>
        <button class="confirmar" :style="{ backgroundColor: themeManager.detalhe }">CONFIRMAR</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  padding: 24px 130px 100px 130px;
  min-height: 100vh;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  flex-wrap: wrap;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.perfil,
.transporte,
.mapa,
.ida-volta {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  transition: all 0.3s ease;
}

.perfil {
  color: #fff;
  border-radius: 8px;
  padding: 25px;
  width: 100%;
  max-width: 400px;
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

.input-group {
  background: #fff;
  border-radius: 5px;
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
  transition: all 0.3s ease;
}

.input-group input[readonly] {
  cursor: default;
}

.senha-campo span,
.data-campo span {
  cursor: pointer;
  font-size: 18px;
  transition: transform 0.2s ease;
}

.senha-campo span:hover,
.data-campo span:hover {
  transform: scale(1.2);
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

.right-side {
  display: flex;
  justify-content: center;
}

.transporte {
  padding: 20px;
  border-radius: 12px;
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
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 14px;
  font-size: 15px;
  box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.2);
  display: flex;
  gap: 12px;
  align-items: center;
  transition: all 0.3s ease;
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

.mapa {
  flex: 1 1 320px;
  min-width: 320px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.mapa iframe {
  width: 100%;
  height: 100%;
  min-height: 290px;
  border: none;
  border-radius: 12px;
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
  flex-direction: column;
  gap: 16px;
}

.ida-card {
  padding: 16px;
  border-radius: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.3s ease;
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 768px) {
  .ida-grid {
    flex-direction: row;
  }
}

@media (max-width: 767px) {
  .right-side {
    flex-direction: column;
    align-items: center;
  }

  .transporte,
  .mapa {
    min-width: 90vw;
  }
}
</style>
