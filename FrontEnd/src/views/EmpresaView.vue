<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStateStore } from '@/stores/authState';
import { useThemeManagerStore } from '@/stores/theme/themeManager';
import { onMounted, nextTick } from 'vue';

const authState = useAuthStateStore();
const themeManager = useThemeManagerStore();

onMounted(async () => {
  themeManager.init();
  authState.restaurarStateEmpresa();
  await nextTick();

  const animateElements = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  }

  animateElements();

  window.addEventListener('scroll', () => {
    animateElements();
  });
})
</script>

<template>
  <main class="notebook" :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }">
    <section class="empresas animate-on-scroll">
      <h1 :style="{ color: themeManager.detalheAlternativo, borderColor: themeManager.detalhe }">EMPRESAS</h1>
      <div class="descricao animate-on-scroll" :style="{ borderColor: themeManager.detalhe }">
        <p>
          Nosso site busca fortalecer parcerias com empresas responsáveis e comprometidas. Mais do que estar presente na plataforma, ser parceira significa assumir o compromisso com segurança, confiança e transparência, garantindo benefícios para motoristas, passageiros e toda a comunidade. Juntos, construímos uma rede organizada, eficiente e que gera resultados melhores para todos.

        </p>
        <img src="/src-empresa/empresa.png" alt="Ilustração empresa" />
      </div>
    </section>

    <section class="parcerias animate-on-scroll">
      <h2 :style="{ color: themeManager.detalheAlternativo }">PARCERIAS ATUAIS</h2>
      <div class="cards animate-on-scroll" :style="{ backgroundColor: themeManager.detalhe }">
        <div class="card animate-on-scroll">
          <img class="logo" src="/src-home/logoindytour.png" alt="IndyTour" />
          <div class="info">
            <p><strong>IndyTour</strong></p>
            <p><a href="https://www.instagram.com/indy_tour" style="color: #fff;" target="_blank">@indy_tour</a></p>
            <p><span class="mdi mdi-phone" style="color: #fff;"></span> <a href="tel:+5547992214606" style="color: #fff;" target="_blank">+55 (47) 99221-4606</a></p>
            <RouterLink to="/IndySul" @click="authState.mudarStateEmpresa('Indy')">
              <button :style="{ backgroundColor: themeManager.detalheAlternativo}">Saiba mais</button>
            </RouterLink>
          </div>
        </div>

        <div class="line"></div>

        <div class="card animate-on-scroll">
          <img class="logo" src="/src-home/logosul.png" alt="Sul Turismo" />
          <div class="info">
            <p><strong>Sul Turismo</strong></p>
            <p><a href="https://www.instagram.com/sulturismotransportes" style="color: #fff;" target="_blank">@sulturismotransportes</a></p>
            <p><span class="mdi mdi-phone" style="color: #fff;"></span> <a href="tel:+5547996767651" style="color: #fff;" target="_blank">+55 (47) 99676-7651</a></p>
            <RouterLink to="/IndySul" @click="authState.mudarStateEmpresa('Sul')">
              <button :style="{ backgroundColor: themeManager.detalheAlternativo}">Saiba mais</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>

  <main class="celular" :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }">
    <section class="empresas animate-on-scroll">
      <h1 :style="{ color: themeManager.detalheAlternativo, borderColor: themeManager.detalhe }">EMPRESAS</h1>
      <div class="descricao animate-on-scroll" :style="{ borderColor: themeManager.detalhe }">
        <p>
          Nosso site busca fortalecer parcerias com empresas responsáveis e comprometidas. Mais do que estar presente na plataforma, ser parceira significa assumir o compromisso com segurança, confiança e transparência, garantindo benefícios para motoristas, passageiros e toda a comunidade. Juntos, construímos uma rede organizada, eficiente e que gera resultados melhores para todos.
        </p>
      </div>
    </section>

    <section class="parcerias animate-on-scroll">
      <h2 :style="{ color: themeManager.detalheAlternativo }">PARCERIAS ATUAIS</h2>
      <div class="cards animate-on-scroll" :style="{ backgroundColor: themeManager.detalhe }">
        <div class="card animate-on-scroll">
          <div class="info">
            <img class="logo" src="/src-home/logoindytour.png" alt="IndyTour" />
            <div class="redes">
              <a href="https://www.instagram.com/indy_tour" target="_blank" style="color: #fff;"><span class="mdi mdi-instagram"></span></a>
              <a href="tel:+5547992214606" style="color: #fff;"><span class="mdi mdi-phone"></span></a>
            </div>
          </div>
          <a href="/IndySul" rel="noopener" @click="authState.mudarStateEmpresa('Indy')">
            <button :style="{ backgroundColor: themeManager.detalheAlternativo }">Saiba mais</button>
          </a>
        </div>
        <div class="card animate-on-scroll">
          <div class="info">
            <img class="logo" src="/src-home/logosul.png" alt="Sul Turismo" />
            <div class="redes">
              <a href="https://www.instagram.com/sulturismotransportes" target="_blank" style="color: #fff;"><span class="mdi mdi-instagram"></span></a>
              <a href="tel:+5547996767651" style="color: #fff;"><span class="mdi mdi-phone"></span></a>
            </div>
          </div>
          <a href="/IndySul" rel="noopener" @click="authState.mudarStateEmpresa('Sul')">
            <button :style="{ backgroundColor: themeManager.detalheAlternativo }">Saiba mais</button>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.animate-on-scroll {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(.2, .65, .25, 1);
}

.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}

.notebook {
  padding: 190px 120px 80px 120px;
}

h1, h2 {
  text-align: center;
  margin-bottom: 60px;
}

h1 {
  border-bottom: 2px solid;
  padding-bottom: 60px;
}

.empresas .descricao {
  padding: 0 50px;
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

  h1, h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  h1 {
    border-bottom: 2px solid;
    padding-bottom: 20px;
    margin: 0 40px 30px 40px;
  }

  .empresas .descricao {
    padding: 0 15px 0 15px;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border-bottom: none;
    text-align: justify;
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
    align-items: center;
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
