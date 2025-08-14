<script setup>
import { ref, onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()

const email = ref('')
const senha = ref('')
const erro = ref('')
const showPassword = ref(false)

onMounted(() => {
  themeManager.init()
  authState.restaurarState()
})

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}

function handleLogin() {
  const emailVal = email.value.trim()
  const senhaVal = senha.value.trim()

  if (emailVal === 'p@p' && senhaVal === 'p') {
    erro.value = ''
    authState.mudarState('passageiro')
  } else if (emailVal === 'm@m' && senhaVal === 'm') {
    erro.value = ''
    authState.mudarState('motorista')
  } else if (emailVal === 'admin@admin' && senhaVal === 'admin') {
    erro.value = ''
    authState.mudarState('admin')

  } else {
    erro.value = 'E‑mail ou senha incorretos.'
  }
}
</script>

<template>
  <section class="login-container" :style="{ backgroundColor: themeManager.fundo }">
    <div class="left-panel" :style="{ backgroundColor: themeManager.detalhe }">
      <img src="/public/src-auth/auth-form-illustration.png" alt="Login Illustration" />
    </div>

    <div class="right-panel" :style="{ backgroundColor: themeManager.fundo }">
      <div class="form-box">
        <h1 class="title" :style="{ color: themeManager.text }">Bem‑vindo de volta</h1>
        <p class="subtitle" :style="{ color: themeManager.text }">Acesse sua conta para continuar</p>

        <form @submit.prevent="handleLogin" class="form">
          <p v-if="erro" class="erro-msg">{{ erro }}</p>

          <div class="input-group">
            <span class="mdi mdi-email icon" :style="{ color: themeManager.text }"></span>
            <input v-model="email" type="email" placeholder="E‑mail" class="input" autocomplete="email"
              :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div class="input-group">
            <span class="mdi mdi-lock icon" :style="{ color: themeManager.text }"></span>
            <input v-model="senha" :type="showPassword ? 'text' : 'password'" placeholder="Senha"
              autocomplete="current-password" class="input"
              :style="{ backgroundColor: themeManager.fundo, color: themeManager.text, borderColor: themeManager.text }" />
            <span class="mdi toggle-eye" :class="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click="toggleShowPassword"
              :style="{ color: themeManager.text }"></span>
          </div>
          <button class="recover-link" @click="authState.mudarState('autentificacao')"
            :style="{ color: themeManager.text }">
            Esqueceu a senha?
          </button>
          <button type="submit" class="submit-btn" :style="{ backgroundColor: themeManager.detalhe }">
            Entrar
          </button>
        </form>

        <p class="register-text" :style="{ color: themeManager.text }">
          Ainda não tem uma conta?
          <button class="register-link" @click="authState.mudarState('autentificacao')"
            :style="{ color: themeManager.detalhe }">
            Cadastre-se
          </button>
        </p>
        <div class="social-login">
          <p :style="{ color: themeManager.text }">Fazer login por outra plataforma?</p>
          <ul>
            <li><button :style="{ borderColor: themeManager.text }"><span :style="{ color: themeManager.text }" class="mdi mdi-google" ></span></button></li>
            <li><button :style="{ borderColor: themeManager.text }"><span :style="{ color: themeManager.text }" class="mdi mdi-facebook"></span></button></li>
            <li><button :style="{ borderColor: themeManager.text }"><span :style="{ color: themeManager.text }" class="mdi mdi-twitter"></span></button></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.login-container {
  display: flex;
  height: 80vh;
}

.left-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.left-panel img {
  max-width: 70%;
}

.right-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.form-box {
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  margin-bottom: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  margin-top: 1rem;
}

.icon {
  position: absolute;
  left: 14px;
  top: 60%;
  transform: translateY(-50%);
  font-size: 1.3rem;
}

.toggle-eye {
  position: absolute;
  right: 14px;
  top: 60%;
  transform: translateY(-50%);
  font-size: 1.3rem;
  cursor: pointer;
}

.submit-btn {
  padding: 14px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s ease;
}

.submit-btn:hover {
  transform: scale(1.05);
}

.footer {
  margin-top: 1.5rem;
}

.register-text {
  font-size: 0.8rem;
  text-align: center;
  margin-top: 10px;
}

.register-link {
  background: none;
  font-size: 0.8rem;
  text-decoration: underline;
  transition: color 0.3s ease, text-shadow 0.3s ease;
  border: none;
  cursor: pointer;
}

.recover-link {
  background: none;
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
  margin: 0 0 0 70%;
}

.register-link:hover {
  color: #003F74;
}

.social-login {
  margin-top: 1rem;
}

.social-login p {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.social-login ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
} 

.social-login li button {
  background: none;
  border: 2px solid;
  padding: 2px 4px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.social-login li button:hover {
  transform: scale(1.1);
}

.erro-msg {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>
