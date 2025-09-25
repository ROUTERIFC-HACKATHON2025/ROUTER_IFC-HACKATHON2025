<script setup>
import { ref, computed } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'
import { useAdminStore } from '@/stores/admin'
import { Check } from 'lucide-vue-next'

const themeManager = useThemeManagerStore()
const authState = useAuthStateStore()
const admin = useAdminStore()

// Aba ativa
const activeTab = ref('transportes')

// Dados mockados do veículo
const van = {
  placa: 'ABC-1234',
  modelo: 'Sprinter',
  cor: 'Branca',
  capacidade: 20,
  ocupacao: 4,
  status: 'Ativo',
  caracteristicas: [
    { nome: 'Ar Condicionado', ativo: true },
    { nome: 'Wi-Fi', ativo: true },
    { nome: 'USB', ativo: true }
  ],
  motorista: null
}

// Rotas editáveis
const rotas = computed(() => [
  {
    titulo: 'Ida - 06:00h',
    passageiros: admin.getRotaEditada('ida') || []
  },
  {
    titulo: 'Volta - 12:00h',
    passageiros: admin.getRotaEditada('volta12') || []
  },
  {
    titulo: 'Volta - 17:00h',
    passageiros: admin.getRotaEditada('volta17') || []
  }
])

function editarRota(index) {
  const tipoRota = index === 0 ? 'ida' : index === 1 ? 'volta12' : 'volta17'
  admin.setRotaEmEdicao({ tipo: tipoRota, index })
  authState.mudarAdminPage('editarRota')
}
</script>

<template>
  <section class="config-van" :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }">
    <div class="tabs" :style="{ backgroundColor: themeManager.detalhe }">
      <div class="tabs-button">
        <button :class="{ active: admin.page === 'transportes' }"
          @click="authState.mudarAdminPage('configVans')"
          :style="{ backgroundColor: '#fff', color: themeManager.detalhe }">
          Transportes
        </button>
        <button :class="{ active: admin.page === 'passageiros' }"
          @click="authState.mudarAdminPage('passageiro')"
          :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">
          Passageiros
        </button>
        <button :class="{ active: admin.page === 'motoristas' }"
          @click="authState.mudarAdminPage('motorista')"
          :style="{ backgroundColor: themeManager.detalhe, color: '#fff' }">
          Motoristas
        </button>
      </div>
      <div class="tabs-sair">
        <button @click="authState.mudarAdminPage('vans')"
          :style="{ backgroundColor: '#fff', color: themeManager.detalhe }">
          Sair da Van
        </button>
      </div>
    </div>

    <div class="page">

      <!-- Conteúdo Transportes -->
      <div v-if="activeTab === 'transportes'" class="content">
        <div class="top-grid">
          <!-- Informações -->
          <div class="card" style="color: #fff">
            <h2 :style="{ color: themeManager.detalhe }">Informações do Veículo:</h2>
            <p style="color: #fff"><strong >Placa:</strong> {{ van.placa }}</p>
            <p style="color: #fff"><strong>Modelo:</strong> {{ van.modelo }}</p>
            <p style="color: #fff"><strong>Cor:</strong> {{ van.cor }}</p>
            <p style="color: #fff"><strong>Capacidade:</strong> {{ van.capacidade }}</p>

            <div class="status">
              <button class="ativo" :style="{ background: themeManager.detalhe, color: '#fff' }">
                Veículo Ativo
              </button>
            </div>
          </div>

          <!-- Características -->
          <div class="card">
            <h2 :style="{ color: themeManager.detalhe }">Características do Veículo:</h2>
            <ul>
              <li v-for="c in van.caracteristicas" :key="c.nome">
                {{ c.nome }}
                <Check v-if="c.ativo" class="icon" :style="{ background: themeManager.detalhe }" />
              </li>
            </ul>
          </div>

          <!-- Ocupação -->
          <div class="card-ocupacao">
            <h2 :style="{ color: themeManager.detalhe }">Ocupação:</h2>
            <div class="progress">
              <div class="progress-bar"
                :style="{ width: ((admin.vanPassengers.length || 0) / (admin.selectedVan?.acentos || 1)) * 100 + '%',
                          background: themeManager.detalhe }">
              </div>
            </div>
            <p>{{ admin.vanPassengers.length || 0 }}/{{ admin.selectedVan?.acentos || 0 }}</p>
            <button class="secundario"
              :style="{ background: themeManager.detalhe, color: '#fff' }"
              @click="authState.mudarAdminPage('passageiro')">
              Ver Passageiros
            </button>
          </div>
        </div>

        <div class="rotas-grid">
          <div v-for="(rota, index) in rotas" :key="rota.titulo"
            class="rota-card"
            :style="{ backgroundColor: themeManager.detalhe }">
            <div class="rota-header">
              <h3 :style="{ color: '#fff' }">{{ rota.titulo }}</h3>
              <span class="mdi mdi-pencil"
                :style="{ color: '#fff' }"
                @click="editarRota(index)">
              </span>
            </div>
            <div v-for="p in rota.passageiros" :key="p.id" class="passageiro-card" >
              <img src="/src-auth/passageiro.png" class="avatar" alt="">
              <div>
                <p :style="{color: themeManager.detalhe}" class="nome">{{ p.nome }}</p>
              </div>
            </div>
            <div v-if="rota.passageiros.length === 0"
              class="passageiro-card" style="opacity:.8" :style="{color: themeManager.detalhe}">
              Nenhum passageiro nesta rota
            </div>
          </div>
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
  padding: 20px 20px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
  border-radius: 10px 10px 0 0;
}

.tabs-button {
  margin-right: 280px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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

.page {
  border-radius: 0 0 10px 10px;
  padding: 20px 30px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
}

/* Grid principal */
.top-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.card, .card-ocupacao {
  text-align: left;
  padding: 2rem 3rem;
  border-radius: 8px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
}

.card h2, .card-ocupacao h2 {
  font-size: 1.8rem;
  margin-bottom: 0.8rem;
}

.card p, .card-ocupacao p {
  margin: 0.4rem 0;
  color: #555;
  font-size: 1rem;
}

.card-ocupacao {
  grid-column: span 2;
  text-align: center;
}

.card-ocupacao h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.card-ocupacao button {
  font-size: 1.3rem;
  padding: 10px 20px;
}

.status {
  margin-top: 0.8rem;
  display: flex;
  gap: 0.5rem;
}

.ativo {
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 30px;
}

/* Lista características */
.card ul {
  list-style: none;
  padding: 0;
}

.card li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

.icon {
  color: white;
  padding: 4px;
  border-radius: 50%;
  margin-left: 8px;
  width: 20px;
  height: 20px;
}

/* Ocupação */
.progress {
  background: #ddd;
  border-radius: 6px;
  overflow: hidden;
  height: 10px;
  margin-bottom: 0.5rem;
}

.progress-bar {
  height: 100%;
}

.secundario {
  font-size: 1.1rem;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 0.5rem;
}

/* Rotas */
.rotas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}

.rota-card {
  background: white;
  height: 600px;
  overflow-y: auto;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
}

.rota-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  padding: 0 0.5rem;
  border-bottom: 1px solid #fff;
}

.rota-header h3 {
  font-size: 2rem;
}

.rota-header .mdi-pencil {
  cursor: pointer;
}

.passageiro-card {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: #fff;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 0.6rem;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #bbb;
}

.nome {
  font-weight: bold;
}

/* ===================== RESPONSIVIDADE ===================== */
@media (max-width: 768px) {
  section {
    padding: 80px 10px;
  }

  .tabs {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 15px;
  }

  .tabs-button {
    margin-right: 0;
    justify-content: center;
  }

  .tabs button {
    width: 100%;
    font-size: 1rem;
    padding: 8px 15px;
  }

  .page {
    padding: 15px;
  }

  .top-grid {
    display: block;
  grid-template-columns: 1fr;
    flex-wrap: wrap;
  }

  .card, .card-ocupacao {
    padding: 1.5rem 1.5rem;
    margin: 10px 0;
    width: 330px;
  }

  .card h2, .card-ocupacao h2 {
    font-size: 1.5rem;
  }

  .card p {
    font-size: 0.95rem;
  }

  .rotas-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .rota-card {
    height: auto;
    max-height: 400px;
  }

  .rota-header h3 {
    font-size: 1.6rem;
  }
}
</style>
