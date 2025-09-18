<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { usePassageiroStore } from '@/stores/passageiros'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const passageirosStore = usePassageiroStore()
const router = useRouter()

const defaultPassageiro = {
  idPassageiros: 0,
  nome: '',
  telefone: '',
  email: '',
  cpf: '',
  dataNascimento: '',
  nomeResponsavel: '',
  cpfResponsavel: '',
  telefoneResponsavel: '',
  senha: '',
  confirmarSenha: '',
  informacoesAdicionais: ''
}

const passageiro = reactive({ ...defaultPassageiro })
const isEditing = ref(false)

function resetForm() {
  Object.assign(passageiro, { ...defaultPassageiro })
  authState.mudarState('inicio') 
  router.push('/login') // corrigido
}

async function cadastrar() {
  if (!passageiro.nome || !passageiro.email || !passageiro.cpf) {
    alert('Preencha todos os campos obrigatórios!')
    return
  }

  if (passageiro.senha !== passageiro.confirmarSenha) {
    alert('As senhas não coincidem!')
    return
  }

  if (isEditing.value) {
    await passageirosStore.updatePassageiro({ ...passageiro })
  } else {
    await passageirosStore.addPassageiro({ ...passageiro })
  }

  resetForm()
}

onMounted(() => {
  themeManager.init()
  authState.restaurarStateEmpresa()

  const elements = document.querySelectorAll('.animate-on-scroll')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
      }
    })
  }, { threshold: 0.1 })

  elements.forEach(el => observer.observe(el))
})
</script>

<template>
  <section class="form-container animate-on-scroll" :style="{ color: themeManager.text }">
    <h1>
      CADASTRO <span :style="{ color: themeManager.detalheAlternativo }">PASSAGEIRO</span>
    </h1>

    <form @submit.prevent="cadastrar" :style="{ borderColor: themeManager.detalheAlternativo }">

      <div class="space animate-on-scroll" :style="{ borderColor: themeManager.detalheAlternativo }">
        <h2>
          <span class="mdi mdi-account" :style="{ color: themeManager.detalheAlternativo }"></span>
          Informações Pessoais
        </h2>
        <div class="grid">
          <div>
            <p>Nome Completo: *</p>
            <input v-model="passageiro.nome" required placeholder="Nome Sobrenome"
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>E-mail: *</p>
            <input v-model="passageiro.email" type="email" required placeholder="exemplo@dominio.com"
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>CPF do Aluno: *</p>
            <input v-model="passageiro.cpf" placeholder="000.000.000-00" required
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>Telefone: *</p>
            <input class="input-field" v-model="passageiro.telefone" required placeholder="(00) 00000-0000"
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>Data de Nascimento: *</p>
            <input class="input-field" v-model="passageiro.dataNascimento" type="date" required
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>Senha: *</p>
            <input v-model="passageiro.senha" type="password" required placeholder="Mínimo 8 caracteres"
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>Confirme sua Senha: *</p>
            <input v-model="passageiro.confirmarSenha" type="password" required placeholder="Repita a senha"
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>

          <div>
            <p>Informações adicionais:</p>
            <textarea v-model="passageiro.informacoesAdicionais" class="input-field-add" placeholder="Ex: Alergias, necessidades especiais, etc."
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }">
            </textarea>
          </div>
        </div>
      </div>

      <div class="space animate-on-scroll" :style="{ borderColor: themeManager.detalheAlternativo }">
        <h2 class="responsaveis">
          <span class="mdi mdi-human-male-male-child" :style="{ color: themeManager.detalheAlternativo }"></span>
          Informações dos Responsáveis
        </h2>
        <div class="grid">
          <div>
            <p>Nome Completo do Responsável: *</p>
            <input v-model="passageiro.nomeResponsavel" placeholder="Nome Sobrenome"
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>
          <div>
            <p>CPF do Responsável: *</p>
            <input class="input-field" v-model="passageiro.cpfResponsavel" placeholder="000.000.000-00"
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>
          <div>
            <p>Telefone: *</p>
            <input class="input-field" v-model="passageiro.telefoneResponsavel" placeholder="(00) 00000-0000"
              :style="{ borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text }" />
          </div>
        </div>
      </div>

      <div class="buttons">
        <button type="submit" class="submit" :style="{ backgroundColor: themeManager.detalhe }">Cadastrar-se</button>
        <button type="button" @click="resetForm" :style="{ backgroundColor: themeManager.detalheAlternativo }">Voltar</button>
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
  margin-bottom: 30px;
  text-align: center;
}

.grid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.grid p{
  font-size: 15px;
}

input, textarea {
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

@media (max-width: 768px) {
  .form-container {
    margin: 0 10px;
    padding: 20px 0 100px 0;
  }
  form {
    padding: 20px;
  }
  input, textarea {
    min-width: 100%;
  }

  textarea {
    max-width: 343px;
  }
  button {
    width: 100%;
  }
}
</style>
