<script setup>
import { ref } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'

const themeManager = useThemeManagerStore()


const aluno = ref({
  nome: '',
  email: '',
  cpf: '',
  telefone: '',
  nascimento: '',
  senha: '',
  confirmarSenha: ''
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
</script>

<template>
  <section class="form-container" :style="{color: themeManager.text}">
    <h1>CADASTRO <span :style="{color: themeManager.detalheAlternativo}">PASSAGEIRO</span></h1>
    <form @submit.prevent="cadastrar" :style="{borderColor: themeManager.detalheAlternativo}">

      <div class="space" :style="{borderColor: themeManager.detalheAlternativo}">
        <h2><span class="mdi mdi-account" :style="{color: themeManager.detalheAlternativo}"></span> Informações Pessoais</h2>
        <div class="grid">
          <input v-model="aluno.nome" placeholder="Nome Completo *" required :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
          <input v-model="aluno.email" type="email" placeholder="E-mail *" required :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
          <input v-model="aluno.cpf" placeholder="CPF do Aluno *" required :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
          <input v-model="aluno.telefone" placeholder="Telefone *" required :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
          <input v-model="aluno.nascimento" type="date" placeholder="Data de nascimento *" required :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
          <input v-model="aluno.senha" type="password" placeholder="Crie uma senha *" required :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
          <input v-model="aluno.confirmarSenha" type="password" placeholder="Confirme sua senha *" required :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
        </div>
      </div>

      <div class="space" :style="{borderColor: themeManager.detalheAlternativo}">
        <h2><span class="mdi mdi-human-male-male-child" :style="{color: themeManager.detalheAlternativo}"></span> Informações dos Responsáveis</h2>
        <p class="sub">Apenas se for menor de 18 anos</p>
        <div class="grid">
          <input v-model="responsavel.nome" placeholder="Nome Completo do Responsável *" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
          <input v-model="responsavel.parentesco" placeholder="Parentesco *" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
          <input v-model="responsavel.cpf" placeholder="CPF do Responsável *":style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}" />
          <input v-model="responsavel.telefone" placeholder="Telefone *" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
        </div>
      </div>

      <div class="space" :style="{borderColor: themeManager.detalheAlternativo}">
        <h2><span class="mdi mdi-map-marker" :style="{color: themeManager.detalheAlternativo}"></span> Endereço Residencial</h2>
        <div class="grid">
          <input v-model="endereco.cep" placeholder="CEP *" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
          <input v-model="endereco.rua" placeholder="Rua *" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
          <input v-model="endereco.numero" placeholder="Número *" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
          <input v-model="endereco.cidade" placeholder="Cidade *" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
          <input v-model="endereco.bairro" placeholder="Bairro *" :style="{borderColor: themeManager.detalheAlternativo, backgroundColor: themeManager.fundo, color: themeManager.text}"/>
        </div>
      </div>

      <button type="submit" class="submit" :style="{backgroundColor: themeManager.detalhe}">Cadastrar-se</button>
    </form>
  </section>
</template>

<style scoped>
.form-container {
  margin: 0 300px;
  padding: 50px 0 200px 0;
  border-radius: 8px;
  font-family: sans-serif;
  align-items: center;
}

form{
  border: 2px solid;
  padding: 20px 100px 160px 100px;
  border-radius: 10px;
}

h1 {
  text-align: center;
  font-weight: bold;
  font-size: 2.4em;
  margin: 40px 0;
}

h1 span {
    font-weight: bold;
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
  align-items: center;
}

h2 span{
    font-size: 1.7em;
    align-items: center;
}

.sub {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

input {
  padding: 0.7rem;
  border: 1px solid;
  border-radius: 15px;
  width: 100%;
  align-items: center;
}

button.submit {
  display: block;
  margin: auto;
  padding: 0.8rem 2rem;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

</style>
