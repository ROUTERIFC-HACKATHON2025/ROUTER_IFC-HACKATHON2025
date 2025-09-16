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
    <h1 class="titulo">
      PÁGINA DE
      <span class="azul" :style="{ color: themeManager.detalheAlternativo }">
        GERENCIAMENTO
      </span>
    </h1>

    <p class="footer">
      <button class="link" @click="voltarParaConfigVans" :style="{ color: themeManager.detalhe }">
        &larr; Voltar
      </button>
    </p>

    <div class="gerenciar" :style="{ backgroundColor: themeManager.detalhe, color: '#000' }">

      <div class="col-passageiros">
        <div class="header-pass" :style="{ backgroundColor: themeManager.detalheAlternativo }">
          <h3>PASSAGEIROS DA VAN</h3>
          <span>{{ vanPassengers.length }}/{{ vanSelecionada.acentos }}</span>
        </div>
        <ul class="lista-passageiros">
          <li v-for="p in vanPassengers" :key="p.id">
            <img src="/src-auth/passageiro.png" alt="" class="avatarP">
            <div class="info-passageiro">
                <span>{{ p.nome }}</span><br></br> <span class="endereco">({{ p.endereco }})</span>
            </div>
            <div class="botao-container">
              <button
                class="btn-add"
                :style="{ backgroundColor: passageiroEmOutraRota(p).corBotao }"
                @click="adicionarPassageiro(p)"
                :disabled="!passageiroEmOutraRota(p).podeAdicionar"
                :title="passageiroEmOutraRota(p).mensagem"
                :key="`btn-${p.id}-${passageirosAdicionados.length}`"
              >
                {{ passageiroEmOutraRota(p).mensagem }}
              </button>
            </div>
          </li>
        </ul>
      </div>

      <div class="col-rotas">
        <div class="rota">
          <h3 :style="{ backgroundColor: themeManager.detalheAlternativo }">Ordem da {{ tituloRota }}</h3>
          <ul>
            <li v-for="(p,i) in passageirosAdicionados" :key="p.id">
                <span class="num">{{ i+1 }}</span>
              <div>
                <span>{{ p.nome }}</span> <br></br> <span class="endereco">({{ p.endereco }})</span>
              </div>
              <div class="setas">
                <button @click="moverCima(i)" :disabled="i === 0"><span class="mdi mdi-arrow-up"></span></button>
                <button @click="moverBaixo(i)" :disabled="i === passageirosAdicionados.length - 1"><span class="mdi mdi-arrow-down"></span></button>
                <button @click="removerPassageiro(i)" class="btn-remover">❌</button>
              </div>
            </li>
            <li v-if="passageirosAdicionados.length === 0" class="lista-vazia">
              <span>Nenhum passageiro adicionado</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
section{
    padding: 0px 100px 100px 100px;
}

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
  border-radius: 8px;
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
  border-radius: 8px 8px 0 0;
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
  border-radius: 0 0 8px 8px;
}

.lista-passageiros li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid;
}

.avatarP {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.endereco{
    font-size: 0.6rem;
}
.info-passageiro{
    text-align: left;
    font-size: 0.9rem;
    line-height: 1;
}

.btn-add {
  width: 100%;
  border-radius: 8px;
  padding: 10px;
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
  transition: all 0.3s ease;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  border-radius: 8px 8px 0 0;
}

.rota ul {
  list-style: none;
  padding: 10px;
  margin: 0;
  height: 400px;
  background-color: #fff;
  overflow-y: auto;
  border-radius: 0 0 8px 8px;
}

.rota li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid #ddd;
}

.num {
  font-weight: bold;
  margin-right: 20px;
}

.setas button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 2px;
}

.setas button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-remover {
  color: #ff4444;
  font-size: 0.8rem;
}

.lista-vazia {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 20px;
}

.botao-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.btn-add:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #666 !important;
}

.btn-add.ja-adicionado {
  background-color: #666 !important;
  color: #fff;
  cursor: not-allowed;
}

.btn-add.maximo-atingido {
  background-color: #999 !important;
  color: #fff;
  cursor: not-allowed;
}

.rota-atual {
  font-size: 0.7rem;
  color: #ff9800;
  font-weight: bold;
  text-align: center;
}


@media (max-width: 768px) {
  section{
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
</style>

