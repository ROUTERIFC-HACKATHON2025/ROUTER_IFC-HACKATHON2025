<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useMotoristaStore } from '@/stores/motorista'
import { useAuthStateStore } from '@/stores/authState'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const motoristaStore = useMotoristaStore()
const router = useRouter()

// Modelo padrão do motorista
const defaultMotorista = {
  idMotorista: 0,
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  dataNascimento: '',
  codigoCnh: '',
  senha: '',
  confirmarSenha: '',
  empresa: ''
}

const motorista = reactive({ ...defaultMotorista })
const isEditing = ref(false)

const empresas = ['SulTurismo', 'IndyTour']
const aberto = ref(false)

// Dropdown empresa
function toggleSelect() {
  aberto.value = !aberto.value
}

function selecionarEmpresa(nome) {
  motorista.empresa = nome // 🔥 corrigido para reactive
  authState.mudarStateEmpresa(nome) // atualiza no store
  aberto.value = false
}

// Reset do formulário
function resetForm() {
  Object.assign(motorista, { ...defaultMotorista })
  authState.mudarState('inicio')
  router.push('/login')
}

// Cadastro ou edição
async function cadastrar() {
  if (isEditing.value) {
    await motoristaStore.updateMotorista({ ...motorista })
  } else {
    if (motorista.senha !== motorista.confirmarSenha) {
      alert('As senhas não coincidem!')
      return
    }
    const { confirmarSenha, ...motoristaSemConfirma } = motorista
    await motoristaStore.addMotorista({ ...motoristaSemConfirma })
  }
  resetForm()
}

// Animação scroll
onMounted(() => {
  themeManager.init()
  authState.restaurarStateEmpresa()

  const elements = document.querySelectorAll('.animate-on-scroll')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
      } else {
        entry.target.classList.remove('in-view')
      }
    })
  }, { threshold: 0.1 })

  elements.forEach(el => observer.observe(el))
})
</script>

<template>
  <section class="form-container animate-on-scroll" :style="{ color: themeManager.text }">
    <h1>CADASTRO <span :style="{ color: themeManager.detalheAlternativo }">MOTORISTA</span></h1>

    <form @submit.prevent="cadastrar" :style="{ borderColor: themeManager.detalheAlternativo }">
      <div class="space animate-on-scroll" :style="{ borderColor: themeManager.detalheAlternativo }">
        <h2>
          <span class="mdi mdi-account" :style="{ color: themeManager.detalheAlternativo }"></span>
          Informações Pessoais
        </h2>

        <div class="grid">
          <div>
            <p>Nome Completo: *</p>
            <input v-model="motorista.nome" required placeholder="Nome Sobrenome"
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>E-mail: *</p>
            <input v-model="motorista.email" type="email" required placeholder="exemplo@dominio.com"
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>CPF: *</p>
            <input v-model="motorista.cpf" placeholder="000.000.000-00" required
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>Data de Nascimento: *</p>
            <input class="input-field" v-model="motorista.dataNascimento" type="date" required 
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>
          <div>
            <p>Telefone: *</p>
            <input v-model="motorista.telefone" class="input-field" required placeholder="(00) 00000-0000"
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>Crie uma senha: *</p>
            <input v-model="motorista.senha" type="password" required placeholder="Mínimo 8 caracteres"
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>Confirme sua Senha: *</p>
            <input v-model="motorista.confirmarSenha" type="password" required placeholder="Repita a senha" 
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>Selecione a empresa: *</p>
            <div
              class="select-custom input-field"
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.detalhe, color: '#fff' }"
              @click="toggleSelect"
            >
              {{ motorista.empresa || 'Selecione a empresa' }}
              <span class="seta">
                <span :class="aberto ? 'mdi mdi-arrow-up' : 'mdi mdi-arrow-down'"></span>
              </span>
            </div>

            <div
              v-show="aberto"
              class="opcoes"
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo }"
            >
              <div
                v-for="empresa in empresas"
                :key="empresa"
                class="opcao input-field"
                @click.stop="selecionarEmpresa(empresa)"
                :class="{ selecionada: motorista.empresa === empresa }"
                :style="{
                  backgroundColor: motorista.empresa === empresa ? themeManager.detalhe : themeManager.fundo,
                  color: motorista.empresa === empresa ? '#fff' : themeManager.text
                }"
              >
                {{ empresa }}
              </div>
            </div>
          </div>

          <div>
            <p>CNH(nº registro): *</p>
            <input v-model="motorista.codigoCnh" required placeholder="00000000000"
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
        </div>
      </div>

      <div class="buttons">
        <button type="submit" class="submit" :style="{ backgroundColor: themeManager.detalhe }">Cadastrar-se</button>
        <button type="button" @click="resetForm" :style="{ backgroundColor: themeManager.detalheAlternativo }">Cancelar</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.animate-on-scroll {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(.2, .65, .25, 1);
}
.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}

.form-container {
  margin: 0 300px;
  padding: 0 0 200px 0;
  border-radius: 8px;
  font-family: sans-serif;
  position: relative;
}

form {
  border: 2px solid;
  padding: 40px 100px 160px 100px;
  border-radius: 10px;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  padding: 100px 0 60px 0;
}

.space {
  margin-bottom: 15px;
  padding-bottom: 40px;
  border-bottom: 2px solid;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 30px;
  text-align: center;
}

.grid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.grid p {
  font-size: 15px;
}

input, .input-field {
  padding: 0.7rem;
  border: 1px solid;
  border-radius: 10px;
  width: 345px;
}

textarea.input-field-add {
  width: 717px;
  min-height: 80px;
  resize: vertical;
}

.input-field {
  width: 160px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

button {
  margin-top: 20px;
  width: 30%;
  padding: 14px;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}

.select-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  padding: 0.4rem 1rem;
  width: 345px;
  border: 1px solid;
}

.opcoes {
  margin-top: 5px;
  border-radius: 10px;
  border: 1px solid;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
  position: absolute;
  width: 345px;
}

.opcao {
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;
}

@media (max-width: 768px) {
  .form-container {
    margin: 0 10px;
    padding: 20px 0 100px 0;
  }
  form {
    padding: 20px;
  }
  input, .input-field {
    min-width: 100%;
  }
  button {
    width: 100%;
  }
  .opcoes {
    width: 100%;
  }
}
</style>
