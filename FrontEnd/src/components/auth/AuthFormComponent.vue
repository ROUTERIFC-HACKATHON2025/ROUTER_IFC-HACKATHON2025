<script setup>
import { ref, onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/themeManager'
import { useAuthStateStore } from '@/stores/authState'

const themeManager  = useThemeManagerStore()
const authState  = useAuthStateStore()

const email        = ref('')
const senha        = ref('')
const erro         = ref('')
const showPassword = ref(false)

onMounted(themeManager.init)

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}

function handleLogin() {
  const emailVal = email.value.trim().toLowerCase()
  const senhaVal = senha.value.trim()

  console.log('[DEBUG] login:', emailVal, senhaVal)

  if (emailVal === 'adm@gmail.com' && senhaVal === 'adm') {
    erro.value = ''
    authState.mudarState('finalizado')   
  } else {
    erro.value = 'E‑mail ou senha incorretos.'
  }
}
</script>

<template>
  <section class="login-container" :style="{ backgroundColor: themeManager.fundo }">
    <div class="left-panel" :style="{ backgroundColor: themeManager.detalhe }">
      <img src="/auth-form-illustration.png" alt="Login Illustration" />
    </div>

    <div class="right-panel" :style="{ backgroundColor: themeManager.fundo }">
      <div class="form-box">
        <h1 class="title" :style="{ color: themeManager.text }">Bem‑vindo de volta</h1>
        <p class="subtitle" :style="{ color: themeManager.text }">
          Acesse sua conta para continuar
        </p>

        <form @submit.prevent="handleLogin" class="form">
          <p v-if="erro" class="erro-msg">{{ erro }}</p>

          <div class="input-group">
            <span class="mdi mdi-email icon" :style="{ color: themeManager.text }"></span>
            <input v-model="email" type="email" placeholder="E‑mail" autocomplete="email"
                   class="input" :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div class="input-group">
            <span class="mdi mdi-lock icon" :style="{ color: themeManager.text }"></span>
            <input v-model="senha" :type="showPassword ? 'text' : 'password'" placeholder="Senha"
                   autocomplete="current-password" class="input"
                   :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }" />
            <span class="mdi toggle-eye" :class="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click="toggleShowPassword" :style="{ color: themeManager.text }"></span>
          </div>

          <button type="submit" class="submit-btn" :style="{ backgroundColor: themeManager.detalhe }">
            Entrar
          </button>
        </form>

        <p class="footer" :style="{ color: themeManager.text }">
          <button type="button" class="link" @click="authState.mudarState('inicio')"
                  :style="{ color: themeManager.detalhe }">
            &larr; Voltar
          </button>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.login-container {
    display: flex;
    height: 100vh;
    overflow: hidden;
    font-family: 'Segoe UI', sans-serif;
}

.left-panel {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 40px;
}

.left-panel img {
    max-width: 80%;
    height: auto;
}

.right-panel {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
}

.form-box {
    width: 100%;
    max-width: 400px;
    text-align: center;
}

.title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
}

.subtitle {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    font-weight: 400;
    opacity: 0.9;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.input-group {
    position: relative;
}

.input {
    width: 100%;
    padding: 14px 45px 14px 40px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    outline: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    transition: border-color 0.3s, box-shadow 0.3s;
    box-sizing: border-box;
}

.input:focus {
    border-color: #59a3e2;
    box-shadow: 0 0 5px rgba(89, 163, 226, 0.4);
}

.icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.3rem;
}

.toggle-eye {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.3rem;
    cursor: pointer;
    color: #777;
    transition: color 0.2s;
}

.toggle-eye:hover {
    color: #59a3e2;
}

.submit-btn {
    padding: 14px;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s;
    color: #fff;
}

.footer {
    margin-top: 1.5rem;
    font-size: 0.95rem;
}

.link {
    background: none;
    border: none;
    text-decoration: underline;
    font-weight: 500;
    cursor: pointer;
}

.erro-msg {
    color: red;
    font-size: 0.9rem;
    margin-bottom: -0.5rem;
}

@media (max-width: 900px) {
    .login-container {
        flex-direction: column;
    }

    .left-panel {
        display: none;
    }

    .right-panel {
        flex: none;
        width: 100%;
        padding: 40px 20px;
    }

    .form-box {
        max-width: 100%;
    }
}
</style> 