<script setup>
import { computed, ref } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { useUserProfileStore } from '@/stores/userProfile'
import { useAdminStore } from '@/stores/admin'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const userProfile = useUserProfileStore()
const admin = useAdminStore()

const vanSelecionada = computed(() => admin.selectedVan || { 
  nome: '-', 
  modelo: '-', 
  marca: '-',
  placa: '-', 
  acentos: 0, 
  ano: '-',
  cor: '-',
  caracteristicas: [],
  status: '-',
  motorista: null 
})

function moverCima(index) {
  if (index > 0) {
    const passageiros = [...admin.vanPassengers]
    const temp = passageiros[index]
    passageiros[index] = passageiros[index - 1]
    passageiros[index - 1] = temp
    admin.setPassengers(passageiros)
  }
}


const rotaIda = computed(() => admin.vanPassengers)
</script>

<template>
  <section :style="{ color: themeManager.text }">
    <h1 class="titulo">
      PÁGINA DE 
      <span class="azul" :style="{ color: themeManager.detalheAlternativo }">
        GERENCIAMENTO <br> (NOME DA EMPRESA)
      </span>
    </h1>

    <p class="footer">
      <button class="link" @click="authState.mudarAdminPage('configVans')" :style="{ color: themeManager.detalhe }">
        &larr; Voltar
      </button>
    </p>

    <div class="gerenciar" :style="{ backgroundColor: themeManager.detalhe }">
      
      <div class="col-passageiros">
        <div class="header-pass" :style="{ backgroundColor: themeManager.detalheAlternativo }">
          <h3>PASSAGEIROS DA IDA</h3>
          <span>{{ admin.vanPassengers.length }}/{{ vanSelecionada.acentos }}</span>
        </div>
        <ul class="lista-passageiros">
          <li v-for="p in admin.vanPassengers" :key="p.id">
            <img src="/public/Ellipse.png" alt="">
            <div class="info-passageiro">
                <span>{{ p.nome }}</span><br></br> <span class="endereco">({{ p.endereco }})</span>
            </div>
            <button class="btn-add" :style="{ backgroundColor: themeManager.detalhe }">Adicionar</button>
          </li>
        </ul>
      </div>

      <div class="col-rotas">
        <div class="rota">
          <h3 :style="{ backgroundColor: themeManager.detalheAlternativo }">Ordem</h3>
          <ul>
            <li v-for="(p,i) in rotaIda" :key="p.id">
              <span>{{ i+1 }}</span> 
              <span class="mdi mdi-account"></span> {{ p.nome }}
              <div class="setas">
                <button @click="moverCima(i)">⬆️</button>
                <button @click="moverBaixo(i)">⬇️</button>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.titulo {
  font-size: 2.5rem;
  margin: 30px 0 10px;
  text-align: center;
}

.link {
  background: none;
  border: none;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 30px;
}

.gerenciar {
  display: grid;
  grid-template-columns: 550px 1fr;
  justify-content: space-between;
  gap: 20px;
  padding:20px 80px;
}

.col-passageiros {
    border-right: 2px solid #fff;
  padding: 10px 80px 10px 10px;
  margin-right: 50px;
}

.header-pass {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #fff;
  padding: 10px 15px;
}

.header-pass h3 {
    font-size: 1.7rem;
    font-weight: 600;
    margin: 0;
}

.lista-passageiros {
  list-style: none;
  padding: 10px;
  margin: 0;
  height: 400px;
  background-color: #fff;
  overflow-y: auto;
}

.lista-passageiros li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid;
}

.endereco{
    font-size: 0.5rem;
}
.info-passageiro{
    text-align: left;
    font-size: 0.9rem;
    line-height: 1;
}


.btn-add {
  width: 30%;
  border-radius: 8px;
  padding: 10px;
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
}

.col-rotas {
  flex: 1;
}

.rota {
  padding: 10px;
  border-radius: 8px;
  width: 600px;
}

.rota h3 {
  text-align: center;
  font-weight: bold;
  color: #fff;
  padding: 10px 15px;
  font-size: 1.3rem;
}

.rota ul {
  list-style: none;
  padding: 10px;
  margin: 0;
  height: 400px;
  background-color: #fff;
  overflow-y: auto;
}

.rota li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid #ddd;
}

.setas button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
}
</style>
