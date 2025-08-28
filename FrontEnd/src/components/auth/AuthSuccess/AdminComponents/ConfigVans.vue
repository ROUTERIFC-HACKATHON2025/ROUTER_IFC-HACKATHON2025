<script setup>
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { useUserProfileStore } from '@/stores/userProfile'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const userProfile = useUserProfileStore()

const vanSelecionada = {
  modelo: 'Sprinter',
  placa: 'abc1234',
  acentos: 18,
  motorista: null 
}

const passageiros = [
  { id: 1, nome: 'Nome usuário' },
  { id: 2, nome: 'Nome usuário' },
  { id: 3, nome: 'Nome usuário' },
  { id: 4, nome: 'Nome usuário' },
  { id: 5, nome: 'Nome usuário' },
  { id: 6, nome: 'Nome usuário' },
  { id: 7, nome: 'Nome usuário' }
]

const rotaIda = [...passageiros]
const rotaVolta12 = [...passageiros.slice(0, 5)]
const rotaVolta17 = [...passageiros.slice(0, 5)]
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
      <button class="link" @click="authState.mudarAdminPage('vans')" :style="{ color: themeManager.detalhe }">
        &larr; Voltar
      </button>
    </p>

    <div class="gerenciar" :style="{ backgroundColor: themeManager.detalhe }">
      <div class="col-info">
        <p><strong>Modelo:</strong> {{ vanSelecionada.modelo }}</p>
        <p><strong>Placa:</strong> {{ vanSelecionada.placa }}</p>
        <p><strong>Acentos:</strong> {{ vanSelecionada.acentos }}</p>
        
        <div class="motorista-box">
            <p><strong>Motorista:</strong></p>
            <img src="/public/Ellipse.png" alt="">
          <button class="btn-add" :style="{ backgroundColor: themeManager.detalheAlternativo }" @click="authState.mudarAdminPage('motorista')">Adicionar Motorista</button>
        </div>
      </div>

      <div class="col-passageiros">
        <div class="header-pass" :style="{ backgroundColor: themeManager.detalheAlternativo }">
          <h3>PASSAGEIROS</h3>
          <span>{{ passageiros.length }}/{{ vanSelecionada.acentos }}</span>
        </div>
        <ul class="lista-passageiros">
          <li v-for="p in passageiros" :key="p.id">
            <span class="mdi mdi-account"></span> {{ p.nome }}
            <button class="remover">remover</button>
          </li>
        </ul>
        <button class="btn-add" :style="{ backgroundColor: themeManager.detalheAlternativo }" @click="authState.mudarAdminPage('passageiro')">Adicionar Passageiro</button>
      </div>

      <div class="col-rotas">
        <div class="rota">
          <h3 :style="{ backgroundColor: themeManager.detalheAlternativo }">Rota Ida</h3>
          <ul>
            <li v-for="(p,i) in rotaIda" :key="p.id">
              <span>{{ i+1 }}</span> {{ p.nome }}
            </li>
          </ul>
          <button class="btn-edit" :style="{ backgroundColor: themeManager.detalheAlternativo }">Editar Rota</button>
        </div>

        <div class="rota">
          <h3 :style="{ backgroundColor: themeManager.detalheAlternativo }">Volta 12:00</h3>
          <ul>
            <li v-for="(p,i) in rotaVolta12" :key="p.id">
              <span>{{ i+1 }}</span> {{ p.nome }}
            </li>
          </ul>
          <button class="btn-edit" :style="{ backgroundColor: themeManager.detalheAlternativo }">Editar Rota</button>
        </div>

        <div class="rota">
          <h3 :style="{ backgroundColor: themeManager.detalheAlternativo }">Volta 17:00</h3>
          <ul>
            <li v-for="(p,i) in rotaVolta17" :key="p.id">
              <span>{{ i+1 }}</span> {{ p.nome }}
            </li>
          </ul>
          <button class="btn-edit" :style="{ backgroundColor: themeManager.detalheAlternativo }">Editar Rota</button>
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
  grid-template-columns: 200px 350px 700px;
  gap: 20px;
  padding: 20px;
}

.col-info {
  border-right: 1px solid;
  padding: 100px 10px 100px 0;
  text-align: left;
  color: #fff;
}

.col-info p {
    margin-left: 30px;
    font-size: 1.1rem;
}

.motorista-box {
  text-align: center;
  margin-top: 10px;
}

.motorista-box p {
  margin: 0;
  border-top: 1px solid #fff;
  padding-top: 10px;
}

.motorista-box img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.btn-add, .btn-edit {
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #fff;
}

.col-passageiros {
  border-radius: 8px;
  padding: 10px;
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

.col-passageiros .btn-add {
  width: 100%;
  border-radius: 0;
  font-size: 1.7rem;
}

.remover {
  background: none;
  border: none;
  color: red;
  font-size: 0.8rem;
  cursor: pointer;
  text-align: right;
}

.col-rotas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.rota {
  padding: 10px;
  border-radius: 8px;
}

.rota h3 {
  text-align: center;
  font-weight: bold;
  color: #fff;
  padding: 10px 15px;
   font-size: 1.7rem;
    font-weight: 600;
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
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid;
  gap: 20px;
}

.btn-edit {
  width: 100%;
  border-radius: 0;
  font-size: 1.7rem;
}
</style>
