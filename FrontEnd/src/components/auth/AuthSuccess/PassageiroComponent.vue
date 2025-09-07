<script setup>
import { ref, onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { useUserProfileStore } from '@/stores/userProfile'
import { useRouter } from 'vue-router'
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const userProfile = useUserProfileStore()
const router = useRouter()

const modoEdicao = ref(false)
const verSenha = ref(false)


const abrirPerfil = ref(true)
 const abrirTransportes = ref(false)

const nome = ref('')
const telefone = ref('')
const email = ref('')
const senha = ref('')
const nascimento = ref('')
const endereco = ref('Rua Principal, 100')
const descricao = ref('')

const ira = ref('')
const voltara = ref('')
const horario = ref('')

onMounted(() => {
  themeManager.init()
  authState.restaurarState()

  if (userProfile.usuarioAtual) {
    const p = userProfile.usuarioAtual
    nome.value = p.nome
    telefone.value = p.telefone
    email.value = p.email
    senha.value = p.senha
    nascimento.value = p.nascimento
    endereco.value = p.endereco
    descricao.value = p.descricao
  }

  const map = L.map("mapa").setView([-23.5505, -46.6333], 13)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map)

  L.marker([-23.5505, -46.6333])
    .addTo(map)
    .bindPopup("Aqui é São Paulo!")
    .openPopup()
})

function toggleEdicao() {
  if (modoEdicao.value && userProfile.usuarioAtual) {
    userProfile.atualizarPerfil({
      nome: nome.value,
      telefone: telefone.value,
      email: email.value,
      senha: senha.value,
      nascimento: nascimento.value,
      endereco: endereco.value,
      descricao: descricao.value
    })
  }
  modoEdicao.value = !modoEdicao.value
}

function sairDaConta() {
  authState.reset()
  router.push('/')
}
</script>

<template>
  <section class="notebook" :style="{ backgroundColor: themeManager.fundo }">
    <div class="perfil" :style="{ backgroundColor: themeManager.detalhe }">
      <h2>MEU PERFIL</h2>
      <div class="perfil-topo">
        <img src="/public/src-auth/passageiro.png" class="avatar" alt="">
        <div class="enderecos">
          <p>MEUS ENDEREÇOS <span class="mdi mdi-plus-circle-outline"></span></p>
          <ul>
            <li v-if="endereco">
              <span class="mdi mdi-map-marker"></span>
              <p>{{ endereco }}</p>
              <span class="mdi mdi-pencil"></span>
            </li>
          </ul>
        </div>
      </div>

      <div class="inputs">
        <p class="info-label">Nome completo:</p>
        <div class="input-group">
          <span class="mdi mdi-account"></span>
          <input v-model="nome" :readonly="!modoEdicao" class="input-text" type="text" />
        </div>

        <p class="info-label">Telefone:</p>
        <div class="input-group">
          <span class="mdi mdi-phone"></span>
          <input v-model="telefone" :readonly="!modoEdicao" class="input-text" type="tel" />
        </div>

        <p class="info-label">Email:</p>
        <div class="input-group">
          <span class="mdi mdi-email"></span>
          <input v-model="email" :readonly="!modoEdicao" class="input-text" type="email" />
        </div>

        <p class="info-label">Senha:</p>
        <div class="input-group senha-campo">
          <span class="mdi mdi-lock"></span>
          <input :type="verSenha ? 'text' : 'password'" v-model="senha" :readonly="!modoEdicao" class="input-text" />
          <span class="mdi" :class="verSenha ? 'mdi-eye-off' : 'mdi-eye'" @click="verSenha = !verSenha"></span>
        </div>

        <p class="info-label">Data de nascimento:</p>
        <div class="input-group data-campo">
          <span class="mdi mdi-calendar-month-outline"></span>
          <input type="date" v-model="nascimento" :readonly="!modoEdicao" class="input-text" />
        </div>
      </div>

      <div class="editar">
        <span @click="toggleEdicao">{{ modoEdicao ? 'Salvar' : 'Editar' }}</span> | Ver informação completa
      </div>

      <div class="sair" @click="sairDaConta">SAIR DA CONTA</div>
    </div>

    <div>
      <div class="row right-side">
        <div class="transporte" :style="{ backgroundColor: themeManager.detalhe }">
          <h2>MEUS TRANSPORTES</h2>
          <p><strong>Motorista:</strong></p>
          <div class="card">
            <img src="/public/src-auth/motorista.png" class="avatar" alt="">
            <div class="card-text">
              <p>{{ userProfile.usuarioAtual?.motorista?.nome || 'Pedro' }}</p>
              <p>{{ userProfile.usuarioAtual?.motorista?.telefone || '(47) 99999-9999' }}</p>
            </div>
          </div>

          <p><strong>Veículo:</strong></p>
          <div class="card">
            <div class="card-separacao-text"></div>
            <p>{{ userProfile.usuarioAtual?.van?.nome || 'Van Executiva Premium' }}</p>
          </div>
        </div>

      <div id="mapa" class="mapa"></div>

      </div>

      <div class="ida-volta" :style="{ backgroundColor: themeManager.fundoAlternativo, color: themeManager.text }">
        <h2>MINHA IDA E VOLTA</h2>
        <div class="ida-grid">
          <div class="ida-card" :style="{ backgroundColor: themeManager.fundo }">
            <p>IREI COM O TRANSPORTE DIA 02/07?</p>
            <label><input type="radio" v-model="ira" value="sim" /> SIM</label>
            <label><input type="radio" v-model="ira" value="nao" /> NÃO</label>
          </div>
          <div class="ida-card" :style="{ backgroundColor: themeManager.fundo }">
            <p>VOLTAREI COM O TRANSPORTE DIA 02/07?</p>
            <label><input type="radio" v-model="voltara" value="sim" /> SIM</label>
            <label><input type="radio" v-model="voltara" value="nao" /> NÃO</label>
          </div>
          <div class="ida-card" :style="{ backgroundColor: themeManager.fundo }">
            <p>VOLTAREI EM QUE HORÁRIO?</p>
            <label>
              <input type="radio" v-model="horario" value="12" :disabled="voltara !== 'sim'" /> 12:00H
            </label>
            <label>
              <input type="radio" v-model="horario" value="17" :disabled="voltara !== 'sim'" /> 17:00H
            </label>
          </div>
        </div>
        <button class="confirmar" :style="{ backgroundColor: themeManager.detalhe }">CONFIRMAR</button>
      </div>
    </div>
  </section>
  <section class="celular" :style="{ backgroundColor: themeManager.fundo }">
     <div class="barra-retratil" :style="{ backgroundColor: themeManager.detalhe }">
      <div class="barra-titulo" @click="abrirPerfil = !abrirPerfil">
        <h2>MEU PERFIL</h2>
        <span class="mdi" :class="abrirPerfil ? 'mdi-chevron-up' : 'mdi-chevron-down'"></span>
      </div>

        <div v-show="abrirPerfil" class="conteudo-retratil">
          <div class="perfil-topo">
            <img src="/public/src-auth/passageiro.png" class="avatar" alt="">
            <div class="enderecos">
              <p>MEUS ENDEREÇOS <span class="mdi mdi-plus-circle-outline"></span></p>
              <ul>
                <li v-if="endereco">
                  <span class="mdi mdi-map-marker"></span>
                  <p>{{ endereco }}</p>
                  <span class="mdi mdi-pencil"></span>
                </li>
              </ul>
            </div>
          </div>

          <div class="inputs">
        <p class="info-label">Nome completo:</p>
        <div class="input-group">
          <span class="mdi mdi-account"></span>
          <input v-model="nome" :readonly="!modoEdicao" class="input-text" type="text" />
        </div>

        <p class="info-label">Telefone:</p>
        <div class="input-group">
          <span class="mdi mdi-phone"></span>
          <input v-model="telefone" :readonly="!modoEdicao" class="input-text" type="tel" />
        </div>

        <p class="info-label">Email:</p>
        <div class="input-group">
          <span class="mdi mdi-email"></span>
          <input v-model="email" :readonly="!modoEdicao" class="input-text" type="email" />
        </div>

        <p class="info-label">Senha:</p>
        <div class="input-group senha-campo">
          <span class="mdi mdi-lock"></span>
          <input :type="verSenha ? 'text' : 'password'" v-model="senha" :readonly="!modoEdicao" class="input-text" />
          <span class="mdi" :class="verSenha ? 'mdi-eye-off' : 'mdi-eye'" @click="verSenha = !verSenha"></span>
        </div>

        <p class="info-label">Data de nascimento:</p>
        <div class="input-group data-campo">
          <span class="mdi mdi-calendar-month-outline"></span>
          <input type="date" v-model="nascimento" :readonly="!modoEdicao" class="input-text" />
        </div>
      </div>

          <div class="editar">
            <span @click="toggleEdicao">{{ modoEdicao ? 'Salvar' : 'Editar' }}</span> | Ver informação completa
          </div>

          <div class="sair" @click="sairDaConta">SAIR DA CONTA</div>
        </div>
    </div>

    <div class="barra-retratil" :style="{ backgroundColor: themeManager.detalhe }">
      <div class="barra-titulo" @click="abrirTransportes = !abrirTransportes">
        <h2>MEUS TRANSPORTES</h2>
        <span class="mdi" :class="abrirTransportes ? 'mdi-chevron-up' : 'mdi-chevron-down'"></span>
      </div>

        <div v-show="abrirTransportes" class="conteudo-retratil">
          <p><strong>Motorista:</strong></p>
          <div class="card">
            <img src="/public/src-auth/motorista.png" class="avatar" alt="">
            <div class="card-text">
              <p>{{ userProfile.usuarioAtual?.motorista?.nome || 'Pedro' }}</p>
              <p>{{ userProfile.usuarioAtual?.motorista?.telefone || '(47) 99999-9999' }}</p>
            </div>
          </div>

          <p><strong>Veículo:</strong></p>
          <div class="card">
            <div class="card-separacao-text"></div>
            <p>{{ userProfile.usuarioAtual?.van?.nome || 'Van Executiva Premium' }}</p>
          </div>
        </div>

        <div id="mapa" class="mapa"></div>
      </div>

      <div class="ida-volta" :style="{ backgroundColor: themeManager.fundoAlternativo, color: themeManager.text }">
        <h2>MINHA IDA E VOLTA</h2>
        <div class="ida-grid">
          <div class="ida-card" :style="{ backgroundColor: themeManager.fundo }">
            <p>IREI COM O TRANSPORTE DIA 02/07?</p>
            <label><input type="radio" v-model="ira" value="sim" /> SIM</label>
            <label><input type="radio" v-model="ira" value="nao" /> NÃO</label>
          </div>
          <div class="ida-card" :style="{ backgroundColor: themeManager.fundo }">
            <p>VOLTAREI COM O TRANSPORTE DIA 02/07?</p>
            <label><input type="radio" v-model="voltara" value="sim" /> SIM</label>
            <label><input type="radio" v-model="voltara" value="nao" /> NÃO</label>
          </div>
          <div class="ida-card" :style="{ backgroundColor: themeManager.fundo }">
            <p>VOLTAREI EM QUE HORÁRIO?</p>
            <label>
              <input type="radio" v-model="horario" value="12" :disabled="voltara !== 'sim'" /> 12:00H
            </label>
            <label>
              <input type="radio" v-model="horario" value="17" :disabled="voltara !== 'sim'" /> 17:00H
            </label>
          </div>
        </div>
        <button class="confirmar" :style="{ backgroundColor: themeManager.detalhe }">CONFIRMAR</button>
      </div>
  </section>
</template>

<style scoped>

.notebook, .celular {
  padding: 20px 130px 60px 130px;
  min-height: 80vh;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.celular{
  display: none;
}

.row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.perfil {
  color: #fff;
  border-radius: 8px;
  padding: 25px;
  width: 100%;
  max-width: 400px;
  height: 580px;
}

.perfil h2 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 12px;
}

.perfil-topo {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.avatar {
  width: 120px;
  height: 120px;
  background: #fff;
  border-radius: 50%;
}

.enderecos p {
  font-size: 20px;
  border-bottom: 1px solid #dadadab4;
  margin-bottom: 4px;
  color: #fff;
}

.enderecos p span {
  margin-left: 8px;
  color: #fff;
}

.enderecos ul {
  list-style: none;
  padding: 0;
  font-size: 11px;
  color: #fff;
}

.enderecos ul li {
  border-bottom: 1px solid #dadadab4;
  margin-bottom: 4px;
  padding-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.enderecos ul li p{
  font-size: 15px;
  border: none;
  align-items: center;
  margin-top: 5px;
}

.inputs p {
  font-size: 12px;
  margin-bottom: 3px;
  color: #fff;
}

.info-label {
  font-size: 14px;
  margin: 6px 0 1px;
}

.input-group {
  background: #fff;
  border-radius: 5px;
  color: #383838;
  font-size: 16px;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.input-group input {
  border: none;
  background: transparent;
  font-size: 14px;
  width: 100%;
  outline: none;
  color: #383838;
}

.input-group input[readonly] {
  cursor: default;
}

.senha-campo span,
.data-campo span {
  cursor: pointer;
  font-size: 18px;
}

.data-campo {
  max-width: 50%;
}

.editar {
  margin-top: 8px;
  font-size: 10px;
  cursor: pointer;
  user-select: none;
  color: #ffffff;
}

.sair {
  margin-top: 12px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.sair:hover {
  color: rgb(255, 97, 97);
  transform: scale(1.05);
}

.right-side {
  display: flex;
  justify-content: center;
}

.transporte {
  padding: 20px;
  border-radius: 12px;
  flex: 1 1 300px;
  height: 280px;
  box-shadow: 0 6px 15px rgba(26, 86, 156, 0.3);
  color: #ffffff;
}

.transporte h2 {
  text-align: center;
  margin-bottom: 16px;
  font-size: 20px;
}

.transporte p {
  margin: 0 0 4px;
  font-weight: 600;
  font-size: 14px;
}

.card {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 14px;
  font-size: 15px;
  box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.2);
  display: flex;
  gap: 12px;
  align-items: center;
}

.card .avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.card .card-text p {
  margin: 0;
}

.mapa {
  flex: 1 1 300px;
  height: 280px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.ida-volta {
  padding: 15px;
  border-radius: 12px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ida-volta h2 {
  text-align: center;
  font-size: 22px;
  margin-bottom: 12px;
}

.ida-grid {
  display: flex;
  gap: 16px;
}

.ida-card {
  padding: 16px;
  border-radius: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ida-card p {
  margin: 0 0 8px;
  font-weight: 600;
  font-size: 14px;
}

.ida-card label {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.confirmar {
  color: #ffffff;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  align-self: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirmar:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .notebook {
    display: none;
  }
  .celular{
    display: block;
  }
  .celular {
    padding: 60px 20px 60px 20px;
    min-height: 80vh;
    display: flex;
    gap: 16px;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
  }

  .perfil {
    color: #fff;
    border-radius: 8px;
    padding: 25px;
    width: 100%;
    max-width: none;
  }

  .perfil h2 {
    text-align: center;
    font-size: 28px;
    margin-bottom: 12px;
  }

  .perfil-topo {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
    flex-direction: column;
    align-items: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    background: #fff;
    border-radius: 50%;
  }

  .enderecos p {
    font-size: 20px;
    border-bottom: 1px solid #dadadab4;
    margin-bottom: 4px;
    text-align: center;
  }

  .enderecos p span {
    margin-left: 8px;
  }

  .enderecos ul {
    list-style: none;
    padding: 0;
    font-size: 11px;
  }

  .enderecos ul li {
    border-bottom: 1px solid #dadadab4;
    margin-bottom: 4px;
    padding-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .enderecos ul li p{
    font-size: 15px;
    border: none;
    align-items: center;
    margin-top: 5px;
  }

  .inputs p {
    font-size: 16px;
    margin-bottom: 6px;
  }

  .info-label {
    font-size: 14px;
    margin: 6px 0 1px;
  }

  .barra-retratil {
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  width: 100%;
}

.barra-titulo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 14px 20px;
  font-size: 20px;
  width: 100%;
  font-weight: bold;
  color: #fff;
  background: rgba(0,0,0,0.15);
}

.conteudo-retratil {
  padding: 16px;
}


.ida-volta {
  padding: 20px 10px;
  border-radius: 8px;
  width: 100%;
}

.ida-volta h2 {
  font-size: 1rem;
  margin-bottom: 0px;
}

.ida-card {
  padding: 10px;
  margin-top: 10px;
}

.ida-grid {
  display: block;
}

.confirmar {
  padding: 10px 18px;
  width: 100%;
  border-radius: 8px;
  font-size: 20px;
}

}
</style>
