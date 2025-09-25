<script setup>
import { computed, ref, nextTick } from 'vue'
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

const vanPassengers = computed(() => admin.vanPassengers)

const passageirosAdicionados = ref([])

const tipoRota = computed(() => admin.rotaEmEdicao?.tipo || 'ida')

const carregarRotasSalvas = () => {
  if (admin.rotaEmEdicao?.tipo) {
    const rotasSalvas = admin.getRotaEditada(admin.rotaEmEdicao.tipo)
    if (rotasSalvas.length > 0) {
      passageirosAdicionados.value = [...rotasSalvas]
    }
  }
}

carregarRotasSalvas()

function moverCima(index) {
  if (index > 0) {
    const passageiros = [...passageirosAdicionados.value]
    const temp = passageiros[index]
    passageiros[index] = passageiros[index - 1]
    passageiros[index - 1] = temp
    passageirosAdicionados.value = passageiros
  }
}

function moverBaixo(index) {
  if (index < passageirosAdicionados.value.length - 1) {
    const passageiros = [...passageirosAdicionados.value]
    const temp = passageiros[index]
    passageiros[index] = passageiros[index + 1]
    passageiros[index + 1] = temp
    passageirosAdicionados.value = passageiros
  }
}

function adicionarPassageiro(passageiro) {
  if (passageirosAdicionados.value.find(p => p.id === passageiro.id)) {
    return
  }

  const rotasOutras = ['ida', 'volta12', 'volta17'].filter(tipo => tipo !== admin.rotaEmEdicao?.tipo)
  let rotasOcupadas = 0

  for (const tipoRota of rotasOutras) {
    const passageirosOutraRota = admin.getRotaEditada(tipoRota)
    if (passageirosOutraRota.find(p => p.id === passageiro.id)) {
      rotasOcupadas++
    }
  }

  if (rotasOcupadas >= 2) {
    const rotasAtuais = []
    for (const tipoRota of rotasOutras) {
      const passageirosOutraRota = admin.getRotaEditada(tipoRota)
      if (passageirosOutraRota.find(p => p.id === passageiro.id)) {
        rotasAtuais.push(tipoRota === 'ida' ? 'Ida' : tipoRota === 'volta12' ? 'Volta 12:00' : 'Volta 17:00')
      }
    }
    alert(`Este passageiro já está em duas rotas: ${rotasAtuais.join(' e ')}. Máximo permitido: 2 rotas.`)
    return
  }

  passageirosAdicionados.value.push(passageiro)

  nextTick(() => {
    passageirosAdicionados.value = [...passageirosAdicionados.value]
  })
}

function passageiroEmOutraRota(passageiro) {
  const rotasOutras = ['ida', 'volta12', 'volta17'].filter(tipo => tipo !== admin.rotaEmEdicao?.tipo)
  let rotasOcupadas = 0
  let rotasAtuais = []

  const jaNaRotaAtual = passageirosAdicionados.value.find(p => p.id === passageiro.id)

  for (const tipoRota of rotasOutras) {
    const passageirosOutraRota = admin.getRotaEditada(tipoRota)
    if (passageirosOutraRota.find(p => p.id === passageiro.id)) {
      rotasOcupadas++
      rotasAtuais.push(tipoRota)
    }
  }

  return {
    rotasOcupadas,
    rotasAtuais,
    podeAdicionar: rotasOcupadas < 2 && !jaNaRotaAtual,
    mensagem: jaNaRotaAtual ? 'Já adicionado' : (rotasOcupadas < 2 ? 'Adicionar' : 'Máximo atingido'),
    jaNaRotaAtual,
    corBotao: jaNaRotaAtual ? '#666' : (rotasOcupadas < 2 ? themeManager.detalheAlternativo : '#999')
  }
}

function removerPassageiro(index) {
  passageirosAdicionados.value.splice(index, 1)

  nextTick(() => {
    passageirosAdicionados.value = [...passageirosAdicionados.value]
  })
}

const tituloRota = computed(() => {
  switch (tipoRota.value) {
    case 'ida': return 'Rota Ida'
    case 'volta12': return 'Volta 12:00'
    case 'volta17': return 'Volta 17:00'
    default: return 'Rota'
  }
})

function voltarParaConfigVans() {
  if (admin.rotaEmEdicao?.tipo) {
    admin.salvarRotaEditada(admin.rotaEmEdicao.tipo, passageirosAdicionados.value)
  }
  authState.mudarAdminPage('configVans')
}
</script>

<template>
  <section :style="{ color: themeManager.text }">
    <div class="tabs" :style="{ backgroundColor: themeManager.detalhe }">
      <div class="tabs-button">
        <button :class="{ active: admin.page === 'transportes' }" @click="authState.mudarAdminPage('configVans')"
          :style="{ backgroundColor: '#fff', color: themeManager.detalhe }">Transportes</button>
        <button :class="{ active: admin.page === 'passageiros' }" @click="authState.mudarAdminPage('passageiro')"
          :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">Passageiros</button>
        <button :class="{ active: admin.page === 'motoristas' }" @click="authState.mudarAdminPage('motorista')"
          :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">Motoristas</button>
      </div>
      <div class="tabs-sair">
        <button @click="authState.mudarAdminPage('vans')"
          :style="{ backgroundColor: '#fff', color: themeManager.detalhe }">Sair da Van</button>
      </div>
    </div>

    <div class="gerenciar" :style="{ backgroundColor: themeManager.fundo }">
      <div class="header-actions">
        <div class="buttons">
          <button class="btn-cadastrar" @click="authState.mudarAdminPage('configVans')"
            :style="{ backgroundColor: themeManager.detalhe }">
            Sair
          </button>
          <button class="btn-cadastrar" @click="voltarParaConfigVans()"
            :style="{ border: '2px solid' + themeManager.detalhe, color: themeManager.detalhe, backgroundColor: themeManager.fundo }">
            Salvar
          </button>
        </div>

        <div class="search">
          <input type="text" placeholder="Pesquisar..." v-model="busca"
            :style="{ borderColor: themeManager.detalhe, color: themeManager.text, backgroundColor: themeManager.fundo }" />
          <span class="mdi mdi-magnify" aria-hidden="true" :style="{ color: themeManager.detalhe }"></span>
        </div>
      </div>
      <div class="add-container">
        <div class="col-esquerda" :style="{ backgroundColor: themeManager.detalhe }">
          <header class="header-esquerda">
            <h3 style=" color: #fff;">Passageiros:</h3>
            <div class="search">
              <input type="text" placeholder="Pesquisar..." v-model="busca" />
              <span class="mdi mdi-magnify"></span>
            </div>
          </header>

          <ul class="lista">
            <li v-for="p in vanPassengers" :key="p.id">
              <img src="/src-auth/passageiro.png" alt="" class="avatarP" />
              <div class="info">
                <span class="nome">{{ p.nome }}</span>
                <span class="endereco">{{ p.endereco }}</span>
              </div>
              <button class="btn-add" :style="{ backgroundColor: themeManager.detalhe }"
                :disabled="!passageiroEmOutraRota(p).podeAdicionar" @click="adicionarPassageiro(p)">
                {{ passageiroEmOutraRota(p).mensagem }}
              </button>
            </li>
          </ul>
        </div>

        <!-- COLUNA DIREITA -->
        <div class="col-direita">
          <header class="header-direita">
            <h3>{{ tituloRota }} - 06:00</h3>
            <span class="contador">{{ passageirosAdicionados.length }}/{{ vanSelecionada.acentos }}</span>
          </header>

          <ul class="lista">
            <li v-for="(p, i) in passageirosAdicionados" :key="p.id"
              :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">
              <img src="/src-auth/passageiro.png" alt="" class="avatarP" />
              <div class="info">
                <span class="nome" :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">{{ p.nome }}</span>
                <span class="endereco" :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">{{ p.endereco
                  }}</span>
              </div>
              <div class="acoes" :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">
                <button @click="moverCima(i)" :disabled="i === 0"
                  :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">▲</button>
                <button @click="moverBaixo(i)" :disabled="i === passageirosAdicionados.length - 1"
                  :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">▼</button>
                <button @click="removerPassageiro(i)" class="remover">✖</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 60px 100px 100px 100px;
}

.tabs {
  display: flex;
  justify-content: right;
  gap: 20px;
  margin: 0px;
  padding: 20px 20px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
  border-radius: 10px 10px 0 0;
}

.tabs button {
  border: none;
  padding: 10px 25px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tabs-button {
  margin-right: 280px;
}

.gerenciar {
  border-radius: 0 0 10px 10px;
  padding: 20px 30px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.buttons .btn-cadastrar {
  margin-right: 10px;
}

.btn-cadastrar {
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search {
  position: relative;
}

.search input {
  padding: 8px 38px 8px 15px;
  border-radius: 25px;
  width: 400px;
  font-size: 1rem;
  border: 2px solid;
}

.search input:focus {
  outline: none;
}

.search .mdi {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.3em;
}

.add-container {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.col-esquerda,
.col-direita {
  flex: 1;
  border-radius: 8px;
  display: flex;
  padding: 20px;
  flex-direction: column;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
}

.header-esquerda,
.header-direita {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-weight: bold;
  border-bottom: 2px solid #ccc;
}

.header-esquerda h3,
.header-direita h3 {
  font-size: 2rem;
}

.search {
  position: relative;
}

.search input {
  padding: 6px 30px 6px 10px;
  border: 1px solid #aaa;
  border-radius: 20px;
  width: 300px;
}

.search .mdi {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.lista {
  list-style: none;
  margin: 0;
  padding: 10px;
  overflow-y: auto;
  max-height: 400px;
}

.lista li {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 6px;
}

.avatarP {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.info {
  flex: 1;
  margin: 0 10px;
  text-align: left;
}

.nome {
  display: block;
  font-weight: bold;
}

.endereco {
  font-size: 0.8rem;
  color: #666;
}

.btn-add {
  background: #003366;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-add:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.acoes button {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 0 3px;
}

.acoes .remover {
  color: red;
}



@media (max-width: 768px) {
  section {
    padding: 0px 0px 50px 0px;
  }

  .titulo {
    margin: 20px 0 0px;
  }

  .gerenciar {
    display: block;
    gap: 0px;
    padding: 25px;
    border-radius: 0;
  }

  .col-passageiros {
    border-right: none;
    padding: 0;
    margin: 0 0 10px 0;
  }

  .col-rotas {
    display: grid;
    grid-template-columns: none;

  }

  .rota {
    width: 360px;
    padding: 0;
    text-align: left;
  }

}

/* 📱 Responsividade para telas menores que 768px */
@media (max-width: 768px) {
  section {
    padding: 80px 10px;
  }

  /* ====== TABS ====== */
  .tabs {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 12px;
  }

  .tabs-button {
    margin-right: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .tabs button {
    width: 100%;
    font-size: 1rem;
    padding: 10px;
    border-radius: 20px;
  }

  .tabs-sair button {
    width: 35%;
    font-size: 1rem;
    padding: 8px 15px;
  }

  /* ====== ÁREA GERENCIAR ====== */
  .gerenciar {
    padding: 15px;
    border-radius: 0;
  }

  .header-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    margin-bottom: 20px;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  .btn-cadastrar {
    flex: 1;
    padding: 12px;
    font-size: 0.95rem;
  }

  .search input {
    width: 100%;
    min-width: auto;
    font-size: 0.95rem;
    padding: 10px 35px 10px 12px;
  }

  /* ====== CONTAINER PRINCIPAL ====== */
  .add-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0;
  }

  /* ====== COLUNAS ====== */
  .col-esquerda,
  .col-direita {
    width: 100%;
    padding: 15px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }

  .header-esquerda h3,
  .header-direita h3 {
    font-size: 1.4rem;
  }

  .contador {
    font-size: 1rem;
  }

  /* ====== LISTA ====== */
  .lista {
    max-height: 320px;
    padding: 5px;
  }

  .lista li {
    padding: 10px;
    flex-wrap: wrap;
  }

  .info {
    margin: 0 8px;
    font-size: 0.95rem;
  }

  .btn-add {
    margin-top: 8px;
    width: 100%;
    padding: 10px;
    font-size: 0.9rem;
  }

  /* Botões de ação da direita */
  .acoes button {
    font-size: 1rem;
    margin: 0 4px;
  }
}

</style>
