<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()

const step = ref('request') 
const email = ref('')
const uid = ref('')
const token = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const erro = ref('')
const sucesso = ref('')

onMounted(async () => {
  themeManager.init()
  authState.restaurarState()

  const urlParams = new URLSearchParams(window.location.search)
  const resetToken = urlParams.get('token')
  if (resetToken) {
    token.value = resetToken
    step.value = 'reset'
  }
})

async function requestReset() {
  erro.value = ''
  sucesso.value = ''
  try {
    const response = await axios.post('http://localhost:8000/api/password-reset/', { email: email.value })
    uid.value = response.data.uid
    token.value = response.data.token
    step.value = 'reset'
  } catch (err) {
    console.error('Erro ao solicitar redefinição:', err)
    erro.value = 'Erro ao solicitar redefinição de senha. Verifique o e-mail.'
  }
}

async function resetPassword() {
  erro.value = ''
  sucesso.value = ''
  if (newPassword.value !== confirmPassword.value) {
    erro.value = 'As senhas não coincidem.'
    return
  }
  try {
    const response = await axios.post('http://localhost:8000/api/password-reset/confirm/', {
      uid: uid.value,
      token: token.value,
      password: newPassword.value
    })
    sucesso.value = 'Senha alterada com sucesso. Você pode fazer login agora.'
    setTimeout(() => {
      authState.mudarState('inicio')
    }, 2000)
  } catch (err) {
    console.error('Erro ao alterar senha:', err)
    erro.value = 'Erro ao alterar senha. Verifique o token.'
  }
}

function goBack() {
  authState.mudarState('inicio')
}
</script>

<template>
  <section class="forgot-container" :style="{ backgroundColor: themeManager.fundo }">
    <div class="form-box" :style="{ backgroundColor: themeManager.fundo, borderColor: themeManager.text }">
      <h1 class="title" :style="{ color: themeManager.text }">Esqueceu sua senha?</h1>

      <div v-if="step === 'request'">
        <p class="subtitle" :style="{ color: themeManager.text }">Digite seu e-mail para receber instruções de redefinição.</p>

        <form @submit.prevent="requestReset" class="form">
          <p v-if="erro" class="erro-msg">{{ erro }}</p>
          <p v-if="sucesso" class="sucesso-msg">{{ sucesso }}</p>

          <div class="input-group">
            <span class="mdi mdi-email icon" :style="{ color: themeManager.text }"></span>
            <input
              v-model="email"
              type="email"
              placeholder="E-mail"
              class="input"
              :style="{ backgroundColor: themeManager.fundo, color: themeManager.text, borderColor: themeManager.text }"
              required />
          </div>

          <button type="submit" class="submit-btn" :style="{ backgroundColor: themeManager.detalhe }">
            Enviar
          </button>
        </form>
      </div>

      <div v-else-if="step === 'reset'">
        <p class="subtitle" :style="{ color: themeManager.text }">Digite o UID, token e sua nova senha.</p>

        <form @submit.prevent="resetPassword" class="form">
          <p v-if="erro" class="erro-msg">{{ erro }}</p>
          <p v-if="sucesso" class="sucesso-msg">{{ sucesso }}</p>

          <div class="input-group">
            <span class="mdi mdi-account icon" :style="{ color: themeManager.text }"></span>
            <input
              v-model="uid"
              type="text"
              placeholder="UID"
              class="input"
              :style="{ backgroundColor: themeManager.fundo, color: themeManager.text, borderColor: themeManager.text }"
              required />
          </div>

          <div class="input-group">
            <span class="mdi mdi-key icon" :style="{ color: themeManager.text }"></span>
            <input
              v-model="token"
              type="text"
              placeholder="Token"
              class="input"
              :style="{ backgroundColor: themeManager.fundo, color: themeManager.text, borderColor: themeManager.text }"
              required />
          </div>

          <div class="input-group">
            <span class="mdi mdi-lock icon" :style="{ color: themeManager.text }"></span>
            <input
              v-model="newPassword"
              type="password"
              placeholder="Nova senha"
              class="input"
              :style="{ backgroundColor: themeManager.fundo, color: themeManager.text, borderColor: themeManager.text }"
              required />
          </div>

          <div class="input-group">
            <span class="mdi mdi-lock icon" :style="{ color: themeManager.text }"></span>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirme a nova senha"
              class="input"
              :style="{ backgroundColor: themeManager.fundo, color: themeManager.text, borderColor: themeManager.text }"
              required />
          </div>

          <button type="submit" class="submit-btn" :style="{ backgroundColor: themeManager.detalhe }">
            Alterar Senha
          </button>
        </form>
      </div>

      <button @click="goBack" class="back-btn" :style="{ color: themeManager.detalhe }">
        Voltar ao Login
      </button>
    </div>
  </section>
</template>

<style scoped>
.forgot-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.form-box {
  max-width: 400px;
  width: 100%;
  padding: 40px;
  border-radius: 12px;
  border: 1px solid;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  position: relative;
}

.input {
  width: 100%;
  padding: 14px 44px;
  border-radius: 12px;
  font-size: 1rem;
  border: 1px solid;
}

.icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.3rem;
}

.submit-btn {
  padding: 14px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  opacity: 0.9;
}

.back-btn {
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 1rem;
  text-decoration: underline;
}

.erro-msg {
  color: red;
  font-size: 0.9rem;
}

.sucesso-msg {
  color: green;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .forgot-container {
    padding: 10px;
  }

  .form-box {
    padding: 20px;
  }
}
</style>
