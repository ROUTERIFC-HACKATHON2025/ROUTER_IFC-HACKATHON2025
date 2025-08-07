<script setup>
import { ref } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useThemeHomeStore } from '@/stores/theme/themeHome'

const themeManager = useThemeManagerStore()
const themeHome = useThemeHomeStore()

const abaSelecionada = ref('Passageiros')
const abas = ['Motoristas', 'Empresas', 'Passageiros']
</script>

<template>
  <main :style="{ backgroundColor: themeManager.fundo }">

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
    <div class="empresa-container " :style="{ backgroundColor: themeManager.detalhe}">
      
      <div class="empresa-titulo">
        <h2>EMPRESAS<br> PARCEIRAS:</h2>
      </div>
      <div class="empresas-lista">
        <div class="empresa-card">
          <img src="/public/src-home/logoindytour.png" alt="Logo Indy Tour" class="logo" />
          <h3>IndyTour</h3>
          <p> <span class="mdi mdi-instagram"></span> @indy_tour<br><span class="mdi mdi-phone"></span> +55 (47) 99221-4606</p>
        </div>

        <div class="empresa-card">
          <img src="/public/src-home/logosul.png" alt="Logo Sul Turismo" class="logo" />
          <h3>Sul Turismo</h3>
          <p> <span class="mdi mdi-instagram"></span> @sulturismotransportes<br>
          <span class="mdi mdi-phone"></span> +55 (47) 99676-7651</p>
        </div>
      </div>
    </div>
  </section>

    <section class="tab-section" >
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
                Nosso site oferece aos motoristas a oportunidade de se cadastrarem e acessarem rotas disponíveis conforme sua região. Eles têm um painel próprio onde podem gerenciar seus horários e receber notificações sobre alterações de rota ou imprevistos. Além disso, prezamos pela segurança, exigindo documentos atualizados e treinamento básico sobre atendimento e primeiros socorros.
              </p>
              <button :style="{ backgroundColor: themeManager.detalhe }">Cadastre-se como Motorista</button>
            </div>
            <img src="/src-home/onibus.png" alt="Motoristas" />
          </div>
        </div>

        <div v-else-if="abaSelecionada === 'Empresas'">
          <div class="content-box">
            <div>
              <p :style="{ color: themeManager.text }">
                As empresas de transporte escolar que se cadastram no nosso site ganham visibilidade e organização. A plataforma permite o gerenciamento das rotas, dos motoristas e dos veículos em tempo real. Com isso, garantimos mais eficiência no serviço prestado e mais confiança por parte das famílias.
              </p>
              <button :style="{ backgroundColor: themeManager.detalhe }">Cadastre sua Empresa</button>
            </div>
            <img src="/src-home/empresa.png" alt="Empresas" />
          </div>
        </div>

        <div v-else-if="abaSelecionada === 'Passageiros'">
          <div class="content-box">
            <div>
              <p :style="{ color: themeManager.text }">
                Para os passageiros, nosso site oferece praticidade e acompanhamento em tempo real. Os alunos contam com um transporte confiável e organizado, tornando o trajeto escolar mais seguro e tranquilo todos os dias.
              </p>
              <button :style="{ backgroundColor: themeManager.detalhe }"> Cadastre-se como Passageiro</button>
            </div>
            <img src="/src-home/estudantes.png" alt="Passageiros" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.header {
  margin: 0 120px 0px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 60px 0;
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

h1 {
  font-weight: bold;
  line-height: 1.2;
}

h1 span {
  font-weight: bold;
}

.subtext {
  font-size: 1.2rem;
  margin-top: 10px;
  font-weight: 500;
}

.section-title {
  text-align: center;
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 30px;
}

.section-title span {
  font-weight: bold;
}

.empresa {
  color: white;
  border-bottom: 2px solid;
  margin: 0 120px;
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

.empresa-titulo h2 {
  font-weight: bold;
  text-align: left;
  line-height: 1.1;
}

.empresas-lista {
  display: flex;
  justify-content: space-between;
  border-left: 2px #fff solid;
  padding-left: 120px;
}

.empresa-card {
  align-items: center;
  text-align: left;
  padding-left: 80px;
}

.logo {
  width: 120px;
  height: 120px;
}

.empresa-card h3 {
  font-size: 1.5em;
  text-align: left;
}

.empresa-card p {
  font-size: 14px;
  text-align: left;
}

.icon {
  margin-right: 4px;
}

.tab-section {
  padding: 80px 120px;
}

.tab-buttons {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.tab-button {
  padding: 20px 10px;
  font-weight: bold;
  font-size: 1.5em;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  width: 33%;
}

.tab-content {
  padding: 60px;
  text-align: center;
}

.content-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.content-box p {
  flex: 1;
  line-height: 1.6;
  text-align: justify;
}

.content-box img {
  flex: 1;
  margin-left: 100px;
  min-width: 400px;
  border-radius: 12px;
}

.content-box button {
  padding: 15px 5px;
  font-weight: bold;
  font-size: 1.2em;
  border: none;
  cursor: pointer;
  width: 33%;
  color: #f1f1f1;
  border-radius: 4px;
  margin-top: 20px;
}
</style>
