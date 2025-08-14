<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useThemeHomeStore } from '@/stores/theme/themeHome'
import { useAuthStateStore } from '@/stores/authState'

const themeManager = useThemeManagerStore()
const themeHome = useThemeHomeStore()
const authStore = useAuthStateStore()

const abaSelecionada = ref('Passageiros')
const abas = ['Motoristas', 'Empresas', 'Passageiros']
</script>

<template>
  <main class="notebook" :style="{ backgroundColor: themeManager.fundo }">

    <section class="Home-header">
      <div class="header" :style="{
        background: 'url(' + themeHome.linhaHome + ') no-repeat left center',
        backgroundSize: 'auto 101%',
        borderBottom: '2px solid ' + themeManager.detalhe
      }">
        <img src="/public/src-home/onibus_inicial.png" alt="Ilustração Home" class="illustration" />
        <div class="intro">
          <h1 class="title" :style="{ color: themeManager.text }">
            BEM VINDO AO <span :style="{ color: themeManager.detalheAlternativo }">ROUTER IFC!</span>
          </h1>
          <p class="subtext" :style="{ color: themeManager.text }">
            A opção mais segura e confiável de administração de <br />transporte no Instituto Federal Catarinense
          </p>
        </div>
      </div>
    </section>

    <section class="empresa" :style="{ borderColor: themeManager.detalhe }">
      <div class="empresa-container " :style="{ backgroundColor: themeManager.detalhe }">

        <div class="empresa-titulo">
          <h2>EMPRESAS<br> PARCEIRAS:</h2>
        </div>
        <div class="empresas-lista">
          <div class="empresa-card">
            <img src="/public/src-home/logoindytour.png" alt="Logo Indy Tour" class="logo" />
            <h3>IndyTour</h3>
            <p> <span class="mdi mdi-instagram"></span> @indy_tour<br><span class="mdi mdi-phone"></span> +55 (47)
              99221-4606</p>
          </div>

          <div class="empresa-card">
            <img src="/public/src-home/logosul.png" alt="Logo Sul Turismo" class="logo" />
            <h3>Sul Turismo</h3>
            <p> <span class="mdi mdi-instagram"></span> @sulturismotransportes<br>
              <span class="mdi mdi-phone"></span> +55 (47) 99676-7651
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="tab-section">
      <h2 class="section-title" :style="{ color: themeManager.text }">NOSSOS
        <span :style="{ color: themeManager.detalheAlternativo }"> SERVIÇOS</span>
      </h2>

      <div class="tab-buttons">
        <button v-for="aba in abas" :key="aba" class="tab-button" :class="{ active: abaSelecionada === aba }"
          @click="abaSelecionada = aba" :style="{
            backgroundColor: abaSelecionada === aba ? themeManager.detalhe : themeManager.detalheAlternativo,
            color: '#f1f1f1'
          }">
          {{ aba }}
        </button>
      </div>

      <div class="tab-content" :style="{ border: '2px solid' + themeManager.detalheAlternativo }">
        <div v-if="abaSelecionada === 'Motoristas'">
          <div class="content-box">
            <div>
              <p :style="{ color: themeManager.text }">
                Nosso site oferece aos motoristas a oportunidade de se cadastrarem e acessarem rotas disponíveis
                conforme sua região. Eles têm um painel próprio onde podem gerenciar seus horários e receber
                notificações sobre alterações de rota ou imprevistos. Além disso, prezamos pela segurança, exigindo
                documentos atualizados e treinamento básico sobre atendimento e primeiros socorros.
              </p>
              <RouterLink to="/register" @click="authStore.mudarStateAuth('Motorista')">
                <button :style="{ backgroundColor: themeManager.detalhe }">Cadastre-se como Motorista</button>
              </RouterLink>
            </div>
            <img src="/src-home/onibus.png" alt="Motoristas" />
          </div>
        </div>

        <div v-else-if="abaSelecionada === 'Empresas'">
          <div class="content-box">
            <div>
              <p :style="{ color: themeManager.text }">
                As empresas de transporte escolar que se cadastram no nosso site ganham visibilidade e organização. A
                plataforma permite o gerenciamento das rotas, dos motoristas e dos veículos em tempo real. Com isso,
                garantimos mais eficiência no serviço prestado e mais confiança por parte das famílias.
              </p>
            </div>
            <img src="/src-home/empresa.png" alt="Empresas" />
          </div>
        </div>

        <div v-else-if="abaSelecionada === 'Passageiros'">
          <div class="content-box">
            <div>
              <p :style="{ color: themeManager.text }">
                Para os passageiros, nosso site oferece praticidade e acompanhamento em tempo real. Os alunos contam com
                um transporte confiável e organizado, tornando o trajeto escolar mais seguro e tranquilo todos os dias.
              </p>
              <RouterLink to="/register" @click="authStore.mudarStateAuth('Passageiro')">
                <button :style="{ backgroundColor: themeManager.detalhe }">Cadastre-se como Passageiro</button>
              </RouterLink>
            </div>
            <img src="/src-home/estudantes.png" alt="Passageiros" />
          </div>
        </div>
      </div>
    </section>
  </main>
  <main class="celular" :style="{ backgroundColor: themeManager.fundo }">

    <section class="Home-header">
      <div class="header" :style="{
      }">
        <div class="intro">
          <h1 class="title"
            :style="{ color: themeManager.text, borderBottom: '2px solid ' + themeManager.detalheAlternativo }">
            BEM VINDO AO <br> <span :style="{ color: themeManager.detalheAlternativo }">ROUTER IFC!</span>
          </h1>
          <p class="subtext" :style="{ color: themeManager.text }">
            A opção mais segura e confiável de administração de transporte no Instituto Federal Catarinense
          </p>
        </div>
      </div>
    </section>
    <section class="empresa">
      <div class="empresa-container " :style="{ backgroundColor: themeManager.detalhe }">

        <div class="empresa-titulo">
          <h2>EMPRESAS PARCEIRAS:</h2>
        </div>
        <div class="empresas-lista">
          <div class="empresa-card">
            <img src="/public/src-home/logoindytour.png" alt="Logo Indy Tour" class="logo" />
            <div class="redes">
              <span class="mdi mdi-instagram"></span>
              <span class="mdi mdi-phone"></span>
            </div>
          </div>

          <div class="empresa-card">
            <img src="/public/src-home/logosul.png" alt="Logo Sul Turismo" class="logo" />
            <div class="redes">
              <span class="mdi mdi-instagram"></span>
              <span class="mdi mdi-phone"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="tab-section">
      <h2 class="section-title" :style="{ color: themeManager.text }">NOSSOS
        <span :style="{ color: themeManager.detalheAlternativo }"> SERVIÇOS</span>
      </h2>

      <div class="tab-buttons">
        <button v-for="aba in abas" :key="aba" class="tab-button" :class="{ active: abaSelecionada === aba }"
          @click="abaSelecionada = aba" :style="{
            backgroundColor: abaSelecionada === aba ? themeManager.detalhe : themeManager.detalheAlternativo,
            color: '#f1f1f1'
          }">
          {{ aba }}
        </button>
      </div>

      <div class="tab-content" :style="{ border: '2px solid' + themeManager.detalheAlternativo }">
        <div v-if="abaSelecionada === 'Motoristas'">
          <div class="content-box">
            <div>
              <p :style="{ color: themeManager.text }">
                Nosso site oferece aos motoristas a oportunidade de se cadastrarem e acessarem rotas disponíveis
                conforme sua região. Eles têm um painel próprio onde podem gerenciar seus horários e receber
                notificações sobre alterações de rota ou imprevistos. Além disso, prezamos pela segurança, exigindo
                documentos atualizados e treinamento básico sobre atendimento e primeiros socorros.
              </p>
              <RouterLink to="/register" @click="authStore.mudarStateAuth('Motorista')">
                <button :style="{ backgroundColor: themeManager.detalhe }">Cadastre-se como Motorista</button>
              </RouterLink>
            </div>
          </div>
        </div>

        <div v-else-if="abaSelecionada === 'Empresas'">
          <div class="content-box">
            <div>
              <p :style="{ color: themeManager.text }">
                As empresas de transporte escolar que se cadastram no nosso site ganham visibilidade e organização. A
                plataforma permite o gerenciamento das rotas, dos motoristas e dos veículos em tempo real. Com isso,
                garantimos mais eficiência no serviço prestado e mais confiança por parte das famílias.
              </p>
            </div>
          </div>
        </div>

        <div v-else-if="abaSelecionada === 'Passageiros'">
          <div class="content-box">
            <div>
              <p :style="{ color: themeManager.text }">
                Para os passageiros, nosso site oferece praticidade e acompanhamento em tempo real. Os alunos contam com
                um transporte confiável e organizado, tornando o trajeto escolar mais seguro e tranquilo todos os dias.
              </p>
              <RouterLink to="/register" @click="authStore.mudarStateAuth('Passageiro')">
                <button :style="{ backgroundColor: themeManager.detalhe }">Cadastre-se como Passageiro</button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.celular {
  display: none
}

.Home-header {
  padding: 110px 120px 0;
}

.header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  min-height: 80vh;
}

.illustration {
  flex: 1;
  min-width: 400px;
  border-radius: 12px;
}

.intro {
  flex: 1;
  min-width: 400px;
  text-align: right;
  padding-right: 70px;
}

.subtext {
  margin-top: 10px;
}

.empresa {
  color: white;
  border-bottom: 2px solid;
  margin: 0 120px;
}

.empresa h2 {
  text-align: center;
}

.empresa-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  margin: 80px 0;
  padding: 40px 160px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.empresas-lista {
  display: flex;
  justify-content: space-between;
  border-left: 2px solid;
  padding-left: 120px;
}

.empresa-card {
  align-items: center;
  padding-left: 80px;
}

.logo {
  width: 120px;
  height: 120px;
}

.empresa-card h3 {
  font-size: 1.5em;
}

.empresa-card p {
  font-size: 12px;
}

.icon {
  margin-right: 4px;
}

.tab-section {
  padding: 80px 120px;
}

.tab-section h2 {
  margin-bottom: 60px;
}

.tab-buttons {
  display: flex;
  justify-content: space-between;
}

.tab-button {
  padding: 20px 10px;
  font-weight: bold;
  font-size: 1.7em;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  width: 33%;
}

.tab-content {
  padding: 10px 80px;
  text-align: center;
}

.content-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.content-box p {
  line-height: 1.6;
  text-align: justify;
}

.content-box img {
  margin-left: 100px;
  height: 450px;
  width: 600px;
}

.content-box button {
  padding: 15px 5px;
  font-weight: bold;
  font-size: 1.2em;
  border: none;
  cursor: pointer;
  width: 33%;
  color: #fff;
  border-radius: 4px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .notebook {
    display: none;
  }

  .celular {
    display: block;
  }

  .Home-header {
    padding: 0;
  }

  .header {
    gap: 0px;
    min-height: 40vh;
  }

  h1 {
    padding-bottom: 20px;
  }

  .intro {
    text-align: center;
    padding-right: 0px;
  }

  .subtext {
    margin-top: 5px;
    max-width: 40vh;
    text-align: center;
    margin: 20px;
  }

  .empresa {
    border-bottom: none;
    align-items: center;
    margin: 0px;
  }

  .empresa h2 {
    text-align: center;
    margin: 0 10px 10px;
  }

  .empresa-container {
    display: block;
    align-items: center;
    border-radius: 8px;
    margin: 0 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  .empresas-lista {
    border-left: none;
    padding-left: 0px;
  }

  .empresa-card {
    padding-left: 0px;
    align-items: center;
    display: flex;
  }

  .logo {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }

  .mdi {
    font-size: 2em;
  }

  .redes {
    display: flex;
    gap: 10px;
  }

  .tab-section {
    padding: 100px 10px;
  }

  .tab-section h2 {
    margin-bottom: 10px;
  }

  .tab-buttons {
    display: flex;
    justify-content: space-between;
  }

  .tab-button {
    padding: 6px 0px;
    font-weight: bold;
    font-size: 1em;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    width: 33%;
  }

  .tab-content {
    padding: 0px 0px;
    text-align: center;
  }

  .content-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }

  .content-box p {
    line-height: 1.6;
    text-align: justify;
  }

  .content-box button {
    padding: 4px;
    font-weight: bold;
    font-size: 0.8rem;
    border: none;
    cursor: pointer;
    width: 50%;
    color: #fff;
    border-radius: 4px;
    margin-top: 0px;
  }
}
</style>
