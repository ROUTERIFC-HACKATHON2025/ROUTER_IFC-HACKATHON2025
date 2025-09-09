<script setup>
import { computed } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useUserProfileStore } from '@/stores/userProfile'

const themeManager = useThemeManagerStore()
const userProfile = useUserProfileStore()

// Informações da empresa logada
const empresaLogada = computed(() => userProfile.usuarioLogado)

// Função de logout
function fazerLogout() {
  userProfile.fazerLogout()
}

// Função para mostrar informações específicas da empresa
function getInfoEmpresa() {
  if (empresaLogada.value?.empresa === 'IndyTour') {
    return {
      nome: 'IndyTour',
      descricao: 'Especializada em turismo executivo e corporativo',
      cor: '#4CAF50',
      logo: '/public/Logoindytour.png'
    }
  } else if (empresaLogada.value?.empresa === 'Sul Turismo') {
    return {
      nome: 'Sul Turismo',
      descricao: 'Focada em turismo regional e passeios',
      cor: '#2196F3',
      logo: '/public/logosul.png'
    }
  }
  return {
    nome: 'Empresa',
    descricao: 'Sistema de gerenciamento de transportes',
    cor: '#FF9800',
    logo: null
  }
}

const infoEmpresa = computed(() => getInfoEmpresa())
</script>

<template>
  <section :style="{ color: themeManager.text }">
    <header class="header-empresa" :style="{ backgroundColor: infoEmpresa.cor }">
      <div class="header-content">
        <div class="empresa-info">
          <img v-if="infoEmpresa.logo" :src="infoEmpresa.logo" :alt="infoEmpresa.nome" class="logo-empresa">
          <h1>{{ infoEmpresa.nome }}</h1>
          <p>{{ infoEmpresa.descricao }}</p>
        </div>
        <button @click="fazerLogout" class="btn-logout">
          <span class="mdi mdi-logout"></span>
          Sair
        </button>
      </div>
    </header>

    <div class="container-empresa">
      <div class="welcome-section">
        <h2>Bem-vindo, {{ empresaLogada?.nome }}!</h2>
        <p>Gerencie seus transportes e rotas de forma eficiente</p>
      </div>

      <div class="dashboard-empresa">
        <div class="card" :style="{ borderColor: infoEmpresa.cor }">
          <div class="card-header" :style="{ backgroundColor: infoEmpresa.cor }">
            <span class="mdi mdi-bus"></span>
            <h3>Frota de Vans</h3>
          </div>
          <div class="card-content">
            <p>Gerencie sua frota de vans, motoristas e passageiros</p>
            <button class="btn-action" :style="{ backgroundColor: infoEmpresa.cor }">
              Acessar Sistema
            </button>
          </div>
        </div>

        <div class="card" :style="{ borderColor: infoEmpresa.cor }">
          <div class="card-header" :style="{ backgroundColor: infoEmpresa.cor }">
            <span class="mdi mdi-route"></span>
            <h3>Rotas e Horários</h3>
          </div>
          <div class="card-content">
            <p>Configure rotas, horários e paradas</p>
            <button class="btn-action" :style="{ backgroundColor: infoEmpresa.cor }">
              Configurar Rotas
            </button>
          </div>
        </div>

        <div class="card" :style="{ borderColor: infoEmpresa.cor }">
          <div class="card-header" :style="{ backgroundColor: infoEmpresa.cor }">
            <span class="mdi mdi-chart-line"></span>
            <h3>Relatórios</h3>
          </div>
          <div class="card-content">
            <p>Acompanhe métricas e performance</p>
            <button class="btn-action" :style="{ backgroundColor: infoEmpresa.cor }">
              Ver Relatórios
            </button>
          </div>
        </div>

        <div class="card" :style="{ borderColor: infoEmpresa.cor }">
          <div class="card-header" :style="{ backgroundColor: infoEmpresa.cor }">
            <span class="mdi mdi-cog"></span>
            <h3>Configurações</h3>
          </div>
          <div class="card-content">
            <p>Personalize seu sistema</p>
            <button class="btn-action" :style="{ backgroundColor: infoEmpresa.cor }">
              Configurar
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.header-empresa {
  padding: 40px 20px;
  color: white;
  text-align: center;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.empresa-info {
  text-align: left;
}

.empresa-info h1 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  font-weight: bold;
}

.empresa-info p {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
}

.logo-empresa {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 15px;
}

.btn-logout {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.container-empresa {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 50px;
}

.welcome-section h2 {
  font-size: 2.5rem;
  margin: 0 0 15px 0;
  color: inherit;
}

.welcome-section p {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.8;
}

.dashboard-empresa {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.card {
  border: 2px solid;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
  color: #333;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
  gap: 15px;
}

.card-header .mdi {
  font-size: 2rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.card-content {
  padding: 25px;
  text-align: center;
}

.card-content p {
  margin: 0 0 20px 0;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #666;
}

.btn-action {
  background: #333;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 20px;
  }
  
  .empresa-info {
    text-align: center;
  }
  
  .dashboard-empresa {
    grid-template-columns: 1fr;
  }
}
</style>
