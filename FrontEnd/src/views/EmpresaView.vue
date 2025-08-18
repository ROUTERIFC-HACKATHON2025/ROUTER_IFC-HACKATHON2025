<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStateStore } from '@/stores/authState';
import { useThemeManagerStore } from '@/stores/theme/themeManager';

const authState = useAuthStateStore();
const themeManager = useThemeManagerStore();

</script>

<template>
  <main class="notebook" :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }">
    <section class="empresas">
      <h1 :style="{ color: themeManager.detalheAlternativo, borderColor: themeManager.detalhe }">EMPRESAS</h1>
      <div class="descricao" :style="{ borderColor: themeManager.detalhe }">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget ipsum elit. Duis non elementum quam.
          Morbi id luctus elit, sed maximus nisl. Sed maximus enim at erat posuere, et pharetra elit luctus.
          Suspendisse potenti. In luctus tellus lorem, in pellentesque neque ullamcorper hendrerit. Proin
          porta et purus eu iaculis. Mauris dignissim, urna non venenatis rhoncus, urna massa vestibulum sapien,
          nec luctus ante sapien at amet justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Quisque non accumsan felis.
        </p>
        <img src="/public/src-empresa/empresa.png" alt="Ilustração empresa" />
      </div>
    </section>

    <section class="parcerias">
      <h2 :style="{ color: themeManager.detalheAlternativo }">PARCERIAS ATUAIS</h2>
      <div class="cards" :style="{ backgroundColor: themeManager.detalhe }">
        <div class="card">
          <img class="logo" src="/public/src-home/logoindytour.png" alt="IndyTour" />
          <div class="info">
            <p><strong>IndyTour</strong></p>
            <p>@indy_tour</p>
            <p><span class="mdi mdi-phone"></span> +55 (47) 99221-4606</p>
            <RouterLink to="/IndySul" @click="authState.mudarStateEmpresa('Indy')"><button
                :style="{ backgroundColor: themeManager.detalheAlternativo }">Saiba mais</button></RouterLink>

          </div>
        </div>
        <div class="line"></div>
        <div class="card">
          <img class="logo" src="/public/src-home/logosul.png" alt="Sul Turismo" />
          <div class="info">
            <p><strong>Sul Turismo</strong></p>
            <p>@sulturismotransportes</p>
            <p><span class="mdi mdi-phone"></span> +55 (47) 99676-7651</p>
            <RouterLink to="/IndySul" @click="authState.mudarStateEmpresa('Sul')"><button
                :style="{ backgroundColor: themeManager.detalheAlternativo }">Saiba mais</button></RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
  <main class="celular" :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }">
    <section class="empresas">
      <h1 :style="{ color: themeManager.detalheAlternativo, borderColor: themeManager.detalhe }">EMPRESAS</h1>
      <div class="descricao" :style="{ borderColor: themeManager.detalhe }">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget ipsum elit. Duis non elementum quam.
          Morbi id luctus elit, sed maximus nisl. Sed maximus enim at erat posuere, et pharetra elit luctus.
          Suspendisse potenti. In luctus tellus lorem, in pellentesque neque ullamcorper hendrerit. Proin
          porta et purus eu iaculis. Mauris dignissim, urna non venenatis rhoncus, urna massa vestibulum sapien,
          nec luctus ante sapien at amet justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Quisque non accumsan felis.
        </p>
      </div>
    </section>

    <section class="parcerias">
      <h2 :style="{ color: themeManager.detalheAlternativo }">PARCERIAS ATUAIS</h2>
      <div class="cards" :style="{ backgroundColor: themeManager.detalhe }">
        <div class="card">
          <div class="info">
            <img class="logo" src="/public/src-home/logoindytour.png" alt="IndyTour" />
            <div class="redes">
              <span class="mdi mdi-instagram"></span>
              <span class="mdi mdi-phone"></span>
            </div>
          </div>
          <RouterLink to="/IndySul" @click="authState.mudarStateEmpresa('Indy')"><button
              :style="{ backgroundColor: themeManager.detalheAlternativo }">Saiba mais</button></RouterLink>
        </div>
        <div class="card">
          <div class="info">
            <img class="logo" src="/public/src-home/logosul.png" alt="Sul Turismo" />

            <div class="redes">
              <span class="mdi mdi-instagram"></span>
              <span class="mdi mdi-phone"></span>
            </div>

          </div>
          <RouterLink to="/IndySul" @click="authState.mudarStateEmpresa('Sul')"><button
              :style="{ backgroundColor: themeManager.detalheAlternativo }">Saiba mais</button></RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.notebook {
  padding: 190px 120px 80px 120px;
}

h1,
h2 {
  text-align: center;
  margin-bottom: 60px;
}

h1 {
  border-bottom: 2px solid;
  padding-bottom: 60px;
}

.empresas .descricao {
  padding: 0 50px 0px 50px;
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 2px solid;
}

.empresas p {
  max-width: 600px;
}

.empresas img {
  width: 500px;
  height: 500px;
}

.parcerias .cards {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin: 0 auto;
  color: #fff;
  border-radius: 4px;
}

.card {
  display: flex;
  padding: 40px;
  border-radius: 12px;
  text-align: left;
}

.card .logo {
  width: 150px;
  height: 150px;
  margin-right: 40px;
}

.card .info p strong {
  font-size: 1.7rem;
}

.card .info p {
  font-size: 1rem;
}

.card button {
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  color: #fff;
  width: 100%;
}

.line {
  margin: 20px 0;
  border: 0.3px solid #fff;
}

@media (max-width: 768px) {
  .celular {
    padding: 230px 0 50px 0;
  }

  h1,
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  h1 {
    border-bottom: 2px solid;
    padding-bottom: 20px;
    margin: 0 40px 30px 40px;
  }

  .empresas .descricao {
    padding: 0 15px 0px 15px;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border-bottom: none;
    text-align: justify;
  }

  .empresas p {
    max-width: 600px;
  }

  .parcerias .cards {
    display: flex;
    justify-content: space-around;
    gap: 0px;
    margin: 0 10px;
    color: #fff;
    border-radius: 8px;
  }

  .card {
    display: block;
    padding: 20px;
    border-radius: 0px;
    text-align: left;
  }

  .info {
    display: flex;
  }

  .card .logo {
    width: 60px;
    height: 60px;
    margin-right: 10px;
    align-items: center;
  }

  .mdi {
    font-size: 2em;
  }

  .redes {
    display: flex;
    gap: 10px;
  }

  .card button {
    margin-top: 10px;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    color: #fff;
    width: 100%;
  }

}
</style>