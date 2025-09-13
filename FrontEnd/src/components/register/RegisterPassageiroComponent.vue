<script setup>
import { ref, onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()

const aluno = ref({
  nome: '',
  email: '',
  cpf: '',
  telefone: '',
  nascimento: '',
  senha: '',
  confirmarSenha: '',
  informacoesAdicionais: ''
})

const responsavel = ref({
  nome: '',
  parentesco: '',
  cpf: '',
  telefone: ''
})

const endereco = ref({
  cep: '',
  rua: '',
  numero: '',
  cidade: '',
  bairro: '',
})

function cadastrar() {
  alert('Cadastro enviado! (a lógica real deve ser implementada)')
}

onMounted(() => {
  themeManager.init()
  authState.restaurarStateEmpresa()

  // animação ao scroll
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
  <section class="form-container animate-on-scroll" :style="{color: themeManager.text}">
    <h1>CADASTRO <span :style="{color: themeManager.detalheAlternativo}">PASSAGEIRO</span></h1>

    <form @submit.prevent="cadastrar" :style="{borderColor: themeManager.detalheAlternativo}">

      <!-- Informações Pessoais -->
      <div class="space " :style="{borderColor: themeManager.detalheAlternativo}">
        <h2>
          <span class="mdi mdi-account" :style="{color: themeManager.detalheAlternativo}"></span>
          Informações Pessoais
        </h2>

        <div class="grid">
          <div>
            <p>Nome Completo: *</p>
            <input v-model="aluno.nome" required
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>

          <div>
            <p>E-mail: *</p>
            <input v-model="aluno.email" type="email" required
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>

          <div>
            <p>CPF do Aluno: *</p>
            <input v-model="aluno.cpf" placeholder="000.000.000-00" required
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>

          <div>
            <p>Telefone: *</p>
            <input v-model="aluno.telefone" class="input-field-mid" required
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>

          <div>
            <p>Data de Nascimento: *</p>
            <input v-model="aluno.nascimento" type="date" class="input-field-mid" required
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>

          <div>
            <p>Senha: *</p>
            <input v-model="aluno.senha" type="password" required
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>

          <div>
            <p>Confirme sua Senha: *</p>
            <input v-model="aluno.confirmarSenha" type="password" required
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>

          <div>
            <p>Informações adicionais:</p>
            <input v-model="aluno.informacoesAdicionais" type="text" class="input-field-add"
              :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
        </div>
      </div>

      <!-- Informações dos Responsáveis -->
      <div class="space " :style="{borderColor: themeManager.detalheAlternativo}">
        <h2 class="responsaveis">
          <span class="mdi mdi-human-male-male-child" :style="{color: themeManager.detalheAlternativo}"></span>
          Informações dos Responsáveis
        </h2>
        <p class="sub">(Apenas se for menor de 18 anos)</p>

        <div class="grid">
          <div>
            <p>Nome Completo do Responsável: *</p>
            <input v-model="responsavel.nome" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>Parentesco: *</p>
            <input v-model="responsavel.parentesco" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>CPF do Responsável: *</p>
            <input v-model="responsavel.cpf" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>Telefone: *</p>
            <input v-model="responsavel.telefone" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
        </div>
      </div>

      <!-- Endereço -->
      <div class="space " :style="{borderColor: themeManager.detalheAlternativo}">
        <h2>
          <span class="mdi mdi-map-marker" :style="{color: themeManager.detalheAlternativo}"></span>
          Endereço Residencial
        </h2>

        <div class="grid">
          <div>
            <p>CEP: *</p>
            <input v-model="endereco.cep" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>Rua: *</p>
            <input v-model="endereco.rua" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>Número: *</p>
            <input v-model="endereco.numero" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>Cidade: *</p>
            <input v-model="endereco.cidade" class="input-field-mid" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
          <div>
            <p>Bairro: *</p>
            <input v-model="endereco.bairro" class="input-field-mid" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          </div>
        </div>
      </div>

      <button type="submit" class="submit" :style="{backgroundColor: themeManager.detalhe}">Cadastrar-se</button>
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
  align-items: center;
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
  margin-bottom: 20px;
  text-align: center;
}

.sub {
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 20px;
}

.grid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.grid div {
  margin-bottom: 10px;
}

.grid div p{
  font-size: 0.8rem;
}

input {
  padding: 0.7rem;
  border: 1px solid;
  border-radius: 10px;
  min-width: 350px;
}

.input-field-mid {
  min-width: 170px;
}

.input-field-add {
  min-width: 720px;
  height: 100px;
}

button.submit {
  margin-top: 20px;
  width: 50%;
  padding: 14px;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s ease;
  margin-left: 25%;
}

button.submit:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .form-container {
    margin: 0 10px;
    padding: 20px 0 100px 0;
  }

  form {
    padding: 40px 20px 100px 20px;
  }

  .input-field-add {
    min-width: 350px;
    height: 100px;
  }
}
</style>
