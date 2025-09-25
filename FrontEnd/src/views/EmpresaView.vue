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
    <section class="sobre-nos animate-on-scroll">
      <div :style="{ borderBottom: '2px solid ' + themeManager.detalhe }">
        <h1 class="title" :style="{ color: themeManager.detalhe }">
          EMPRESAS PARCEIRAS
        </h1>
      </div>
    </section>

    <section>
      <div class="quem-somos animate-on-scroll">
        <div class="texto animate-on-scroll fade-in-left">
          <h2 class="subtitulo" :style="{ color: themeManager.detalhe }">O QUE BUSCAMOS?</h2>
          <p class="descricao" :style="{ color: themeManager.text }">
            Nosso site busca fortalecer parcerias com empresas responsáveis e comprometidas. Mais do que estar presente na plataforma, ser parceira significa assumir o compromisso com segurança, confiança e transparência, garantindo benefícios para motoristas, passageiros e toda a comunidade. Juntos, construímos uma rede organizada, eficiente e que gera resultados melhores para todos.
          </p>
          <RouterLink to="/SobreNos"><button class="equipe-button" :style="{ backgroundColor: themeManager.detalhe }">SAIBA MAIS SOBRE NÓS</button></RouterLink>
        </div>
        <div class="imagem animate-on-scroll fade-in-right">
          <div style="
  background: linear-gradient(to bottom, rgba(0,0,0,0),rgba(0,0,0,0),  #051624),
              url('/src-empresa/empresa.png') center/cover no-repeat;
  width: 400px;
  height: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border-radius: 30px;

">
          </div>
        </div>
      </div>
    </section>

    <section class="parcerias animate-on-scroll">
      <h2 :style="{ color: themeManager.detalhe }">PARCERIAS ATUAIS</h2>
      <div class="cards" :style="{ backgroundColor: themeManager.detalhe, borderRadius: '30px' }">
        <div class="card">
          <img class="logo" src="/src-home/logoindytour.png" alt="IndyTour" />
          <div class="info">
            <p><strong>IndyTour</strong></p>
            <p><a href="https://www.instagram.com/indy_tour" style="color: #fff;" target="_blank">@indy_tour</a></p>
            <p><span class="mdi mdi-phone" style="color: #fff;"></span> <a href="tel:+5547992214606"
                style="color: #fff;" target="_blank">+55 (47) 99221-4606</a></p>
            <RouterLink to="/IndySul" @click="authState.mudarStateEmpresa('Indy')">
              <button :style="{ backgroundColor: '#fff', color: themeManager.detalhe }">SAIBA MAIS</button>
            </RouterLink>
          </div>
        </div>

        <div class="line"></div>

        <div class="card">
          <img class="logo" src="/src-home/logosul.png" alt="Sul Turismo" />
          <div class="info">
            <p><strong>Sul Turismo</strong></p>
            <p><a href="https://www.instagram.com/sulturismotransportes" style="color: #fff;"
                target="_blank">@sulturismotransportes</a></p>
            <p><span class="mdi mdi-phone" style="color: #fff;"></span> <a href="tel:+5547996767651"
                style="color: #fff;" target="_blank">+55 (47) 99676-7651</a></p>
            <RouterLink to="/IndySul" @click="authState.mudarStateEmpresa('Sul')">
              <button :style="{ backgroundColor: '#fff', color: themeManager.detalhe }">SAIBA MAIS</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>

  <main class="celular" :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }">
    <section class="sobre-nos animate-on-scroll">
      <div :style="{ borderBottom: '2px solid ' + themeManager.detalhe }">
        <h1 class="title" :style="{ color: themeManager.detalhe }">
          EMPRESAS PARCEIRAS
        </h1>
      </div>
    </section>

    <section>
      <div class="quem-somos animate-on-scroll">
        <div class="texto animate-on-scroll">
          <h2 class="subtitulo" :style="{ color: themeManager.detalhe }">O QUE BUSCAMOS?</h2>
          <p class="descricao" :style="{ color: themeManager.text }">
            Nosso site busca fortalecer parcerias com empresas responsáveis e comprometidas. Mais do que estar presente na plataforma, ser parceira significa assumir o compromisso com segurança, confiança e transparência, garantindo benefícios para motoristas, passageiros e toda a comunidade. Juntos, construímos uma rede organizada, eficiente e que gera resultados melhores para todos.
          </p>
          <button class="equipe-button" :style="{ backgroundColor: themeManager.detalhe }">SAIBA MAIS SOBRE NÓS</button>
        </div>
      </div>
    </section>

    <section class="parcerias animate-on-scroll">
      <h2 :style="{ color: themeManager.detalhe }">PARCERIAS ATUAIS</h2>
      <div class="cards" :style="{ backgroundColor: themeManager.detalhe, borderRadius: '30px' }">
        <div class="card">
          <img class="logo" src="/src-home/logoindytour.png" alt="IndyTour" />
          <div class="info">
            <p><strong>IndyTour</strong></p>
            <p><a href="https://www.instagram.com/indy_tour" style="color: #fff;" target="_blank">@indy_tour</a></p>
            <p><span class="mdi mdi-phone" style="color: #fff;"></span> <a href="tel:+5547992214606"
                style="color: #fff;" target="_blank">+55 (47) 99221-4606</a></p>
            <RouterLink to="/IndySul" @click="authState.mudarStateEmpresa('Indy')">
              <button :style="{ backgroundColor: '#fff', color: themeManager.detalhe }">SAIBA MAIS</button>
            </RouterLink>
          </div>
        </div>

        <div class="line"></div>

        <div class="card">
          <img class="logo" src="/src-home/logosul.png" alt="Sul Turismo" />
          <div class="info">
            <p><strong>Sul Turismo</strong></p>
            <p><a href="https://www.instagram.com/sulturismotransportes" style="color: #fff;"
                target="_blank">@sulturismotransportes</a></p>
            <p><span class="mdi mdi-phone" style="color: #fff;"></span> <a href="tel:+5547996767651"
                style="color: #fff;" target="_blank">+55 (47) 99676-7651</a></p>
            <RouterLink to="/IndySul" @click="authState.mudarStateEmpresa('Sul')">
              <button :style="{ backgroundColor: '#fff', color: themeManager.detalhe }">SAIBA MAIS</button>
            </RouterLink>
          </div>
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

.fade-in-left {
  transform: translateX(-50px);
}

.fade-in-left.in-view {
  transform: translateX(0);
}

.fade-in-right {
  transform: translateX(50px);
}

.fade-in-right.in-view {
  transform: translateX(0);
}

h1{
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.sobre-nos {
  padding: 20px 120px 0;
  align-items: center;
  text-align: center;
}

.sobre-nos div {
  padding-top: 10%;
  min-height: 33vh;
}

.parcerias .cards {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin: 0 auto;
  color: #fff;
  border-radius: 4px;
}


.quem-somos {
  padding: 50px 180px 100px 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quem-somos h2 {
  text-align: left;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.quem-somos .texto {
  flex: 1;
}

.equipe-button {
  margin-top: 20px;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: transform 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.equipe-button:hover {
  transform: scale(1.05);
}


.quem-somos .imagem {
  flex: 1;
  text-align: center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  display: flex;
  justify-content: right;
  align-items: center;
}

.quem-somos .imagem img {
  min-width: 500px;
  height: auto;
}

.parcerias {
  padding: 50px 120px 100px 120px;
}

.parcerias h2 {
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.cards{
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
  border-radius: 30px;
}

.card {
  display: flex;
  padding: 50px;
  border-radius: 30px;
  text-align: left;
}

.card .logo {
  width: 180px;
  height: 180px;
  margin-right: 40px;
}

.card .info p strong {
  font-size: 2rem;
}

.card .info p {
  font-size: 1rem;
}

.card button {
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 30px;
  cursor: pointer;
  border: none;
  color: #fff;
  width: 100%;
  font-size: 1.2rem;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.card button:hover {
  transform: scale(1.05);
}

.line {
  margin: 20px 0;
  border: 0.3px solid #fff;
}

@media (max-width: 768px) {
  .sobre-nos {
    padding: 160px 20px 0 20px;
    align-items: center;
    text-align: center;
  }

  .sobre-nos div {
    display: block;
    justify-content: center;
    text-align: center;
    gap: 0px;
    min-height: 10vh;
    padding-top: 0;
  }

  img {
    min-width: 10px;
    width: 400px;
    height: auto;
  }

  h1 {
    padding-bottom: 20px;
    margin: 20px 0px;
  }

  .quem-somos {
    padding: 20px 20px 50px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .quem-somos h2 {
    text-align: center;
    font-size: 2rem;
  }

  .quem-somos .texto {
    flex: 1;
    text-align: justify;
    padding: 0;
  }

  .subtitulo {
    margin-bottom: 20px;
  }

  .objetivo {
    margin: 0 10px;
    padding: 15px;
    border-radius: 15px;
    color: white;
    text-align: justify;
  }

  .parcerias {
    padding: 50px 20px 100px 20px;
  }

  .cards {
    flex-direction: column;
    padding: 20px;
  }

  .card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }

  .card .logo {
    margin: 0 0 20px 0;
  }
}
</style>
