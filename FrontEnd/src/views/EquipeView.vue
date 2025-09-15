<script setup>
import { onMounted, nextTick } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useThemeEquipeStore } from '@/stores/theme/themeEquipe'

const themeManager = useThemeManagerStore()
const themeEquipe = useThemeEquipeStore()

onMounted(async () => {
  await nextTick()

  const elements = document.querySelectorAll(
    '.animate-on-scroll, .animate-card-left, .animate-card-right'
  )

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
        obs.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  elements.forEach(el => observer.observe(el))
})
</script>

<template>
  <main class="notebook" :style="{ backgroundColor: themeManager.fundo }">
    <section class="equipe-header animate-on-scroll">
      <div class="header" :style="{
        background: 'url(' + themeEquipe.linhaEquipe + ') no-repeat center center',
        backgroundSize: 'auto 101%',
        borderBottom: '2px solid ' + themeManager.detalhe
      }">
        <img src="/public/src-equipe/equipe.png" alt="Ilustração equipe" class="illustration animate-on-scroll" />
        <div class="intro animate-on-scroll">
          <h1 class="title" :style="{ color: themeManager.text }">
            NOSSA <span :style="{ color: themeManager.detalheAlternativo }">EQUIPE</span>
          </h1>
          <p class="subtext" :style="{ color: themeManager.text }">
            Conheça o time que <br />desenvolveu o RouterIFC!
          </p>
        </div>
      </div>
    </section>

    <section class="equipe-cards">
      <div class="cards">
        <div class="card-left animate-card-left" :style="{ backgroundColor: themeManager.detalheAlternativo }">
          <img src="/public/src-equipe/GabrielaS.jpeg" alt="Gabriela Senderski" class="profile-img" />
          <div class="info">
            <h2>Gabriela Senderski</h2>
            <p>
              Desenvolveu o BackEnd do RouterIFC utilizando Django e auxiliou na prototipagem das telas no Figma.
            </p>
            <ul class="social-icons">
              <li><span class="mdi mdi-instagram"  target="_blank"></span></li>
              <li><span class="mdi mdi-github"  target="_blank"></span></li>
              <li><span class="mdi mdi-linkedin"  target="_blank"></span></li>
              <li><span class="mdi mdi-email"  target="_blank"></span></li>
            </ul>
          </div>
        </div>

        <div class="card-right animate-card-right" :style="{ backgroundColor: themeManager.detalhe }">
          <div class="info">
            <h2>Henrique S. S. Borba</h2>
            <p>
              Desenvolveu a modelagem do database com MySQL workbench e contribuiu para o BackEnd com Django.
            </p>
            <ul class="social-icons">
              <li><span class="mdi mdi-instagram"  target="_blank"></span></li>
              <li><span class="mdi mdi-github"  target="_blank"></span></li>
              <li><span class="mdi mdi-linkedin"  target="_blank"></span></li>
              <li><span class="mdi mdi-email"  target="_blank"></span></li>
            </ul>
          </div>
          <img src="/public/src-equipe/HenriqueS.jpeg" alt="Henrique S. S. Borba" class="profile-img" />
        </div>
        <div class="card-left animate-card-left" :style="{ backgroundColor: themeManager.detalheAlternativo }"> <img
            src="/public/src-equipe/HigorB.jpeg" alt="Higor T. A. Braga" class="profile-img" />
          <div class="info">
            <h2>Higor T. A. de Braga</h2>
            <p>Trabalhou na prototipagem das telas com Figma e integração de APIGeolocation </p>
            <ul class="social-icons">
              <li><span class="mdi mdi-instagram"  target="_blank"></span></li>
              <li><span class="mdi mdi-github"  target="_blank"></span></li>
              <li><span class="mdi mdi-linkedin"  target="_blank"></span></li>
              <li><span class="mdi mdi-email"  target="_blank"></span></li>
            </ul>
          </div>
        </div>
        <div class="card-right animate-card-right" :style="{ backgroundColor: themeManager.detalhe }">
          <div class="info">
            <h2>Maria E. G. Tavares</h2>
            <p>Projetou os requisitos de software e integração de APIGeolocation.</p>
            <ul class="social-icons">
              <li><span class="mdi mdi-instagram"  target="_blank"></span></li>
              <li><span class="mdi mdi-github"  target="_blank"></span></li>
              <li><span class="mdi mdi-linkedin"  target="_blank"></span></li>
              <li><span class="mdi mdi-email"  target="_blank"></span></li>
            </ul>
          </div> <img src="/public/src-equipe/MariaT.jpeg" alt="Maria E. G. Tavares" class="profile-img" />
        </div>
        <div class="card-left animate-card-left" :style="{ backgroundColor: themeManager.detalheAlternativo }"> <img
            src="/public/src-equipe/PauloA.jpeg" alt="Paulo A. Pereira" class="profile-img" />
          <div class="info">
            <h2>Paulo A. Pereira</h2>
            <p>Desenvolveu integralmente o FrontEnd e responsividade, utilizando Vue.js.</p>
            <ul class="social-icons">
              <li><span class="mdi mdi-instagram"  target="_blank"></span></li>
              <li><span class="mdi mdi-github"  target="_blank"></span></li>
              <li><span class="mdi mdi-linkedin"  target="_blank"></span></li>
              <li><span class="mdi mdi-email"  target="_blank"></span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>

  <main class="celular" :style="{ backgroundColor: themeManager.fundo }">
    <section class="equipe-header animate-on-scroll">
      <div class="header">
        <h1 class="title"
          :style="{ color: themeManager.text, borderBottom: '2px solid ' + themeManager.detalheAlternativo }">
          NOSSA <span :style="{ color: themeManager.detalheAlternativo }">EQUIPE</span>
        </h1>
        <p class="subtext" :style="{ color: themeManager.text }">
          Conheça o time que desenvolveu o RouterIFC!
        </p>
        <img src="/public/src-equipe/equipe.png" alt="Ilustração equipe" class="illustration animate-on-scroll" />
      </div>
    </section>

    <section class="equipe-cards">
      <div class="cards">
        <div class="card-left animate-on-scroll" :style="{ backgroundColor: themeManager.detalheAlternativo }">
          <img src="/public/src-equipe/GabrielaS.jpeg" alt="Gabriela Senderski" class="profile-img" />
          <div class="info">
            <h2>Gabriela Senderski</h2>
            <p>
              Tenho 17 anos e trabalhei no desenvolvimento do RouterIFC principalmente na prototipagem das telas e no
              backend de Django, auxiliando também em partes do frontend com Vue.js.
            </p>
            <ul class="social-icons">
              <li><span class="mdi mdi-instagram"></span></li>
              <li><span class="mdi mdi-github"></span></li>
              <li><span class="mdi mdi-linkedin"></span></li>
              <li><span class="mdi mdi-email"></span></li>
            </ul>
          </div>
        </div>

        <div class="card-right animate-on-scroll" :style="{ backgroundColor: themeManager.detalhe }">
          <div class="info">
            <h2>Henrique S. S. Borba</h2>
            <p>
              Tenho 17 anos e trabalhei no desenvolvimento do RouterIFC principalmente na prototipagem das telas e no
              backend de Django, auxiliando também em partes do frontend com Vue.js.
            </p>
            <ul class="social-icons">
              <li><span class="mdi mdi-instagram"></span></li>
              <li><span class="mdi mdi-github"></span></li>
              <li><span class="mdi mdi-linkedin"></span></li>
              <li><span class="mdi mdi-email"></span></li>
            </ul>
          </div>
          <img src="/public/src-equipe/HenriqueS.jpeg" alt="Henrique S. S. Borba" class="profile-img" />
        </div>
        <div class="card-left animate-on-scroll" :style="{ backgroundColor: themeManager.detalheAlternativo }"> <img
            src="/public/src-equipe/HigorB.jpeg" alt="Higor T. A. Braga" class="profile-img" />
          <div class="info">
            <h2>Higor T. A. Braga</h2>
            <p> Tenho 16 anos e trabalhei no desenvolvimento do RouterIFC principalmente na prototipagem das telas e no
              backend de Django, auxiliando também em partes do frontend com Vue.js. </p>
            <ul class="social-icons">
              <li><span class="mdi mdi-instagram"></span></li>
              <li><span class="mdi mdi-github"></span></li>
              <li><span class="mdi mdi-linkedin"></span></li>
              <li><span class="mdi mdi-email"></span></li>
            </ul>
          </div>
        </div>
        <div class="card-right animate-on-scroll" :style="{ backgroundColor: themeManager.detalhe }">
          <div class="info">
            <h2>Maria E. G. Tavares</h2>
            <p> Tenho 17 anos e trabalhei no desenvolvimento do RouterIFC principalmente na prototipagem das telas e no
              backend de Django, auxiliando também em partes do frontend com Vue.js. </p>
            <ul class="social-icons">
              <li><span class="mdi mdi-instagram"></span></li>
              <li><span class="mdi mdi-github"></span></li>
              <li><span class="mdi mdi-linkedin"></span></li>
              <li><span class="mdi mdi-email"></span></li>
            </ul>
          </div> <img src="/public/src-equipe/MariaT.jpeg" alt="Maria E. G. Tavares" class="profile-img" />
        </div>
        <div class="card-left animate-on-scroll" :style="{ backgroundColor: themeManager.detalheAlternativo }"> <img
            src="/public/src-equipe/PauloA.jpeg" alt="Paulo A. Pereira" class="profile-img" />
          <div class="info">
            <h2>Paulo A. Pereira</h2>
            <p> Tenho 17 anos e trabalhei no desenvolvimento do RouterIFC principalmente na prototipagem das telas e no
              backend de Django, auxiliando também em partes do frontend com Vue.js. </p>
            <ul class="social-icons">
              <li><span class="mdi mdi-instagram"></span></li>
              <li><span class="mdi mdi-github"></span></li>
              <li><span class="mdi mdi-linkedin"></span></li>
              <li><span class="mdi mdi-email"></span></li>
            </ul>
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
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}

.animate-card-left {
  opacity: 0;
  transform: translateX(500px);
  transition: opacity 20s ease, transform 200s ease;
}

.animate-card-left.in-view {
  opacity: 1;
  transform: translateX(0);
}

.animate-card-right {
  opacity: 0;
  transform: translateX(-500px);
  transition: opacity 20s ease, transform 200s ease;
}

.animate-card-right.in-view {
  opacity: 1;
  transform: translateX(0);
}

.equipe-header {
  padding: 110px 120px 0px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  min-height: 80vh;
}

.illustration {
  flex: 1;
  min-width: 700px;
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

.cards {
  padding: 80px 200px;
}

.card-left,
.card-right {
  display: flex;
  gap: 30px;
  padding: 30px;
  max-width: 700px;
  border-radius: 16px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease;
}

.card-left {
  background-color: var(--detalhe-alternativo);
}

.card-right {
  background-color: var(--detalhe);
  margin: 40px 0 40px auto;
}

.card-left:hover,
.card-right:hover {
  transform: translateY(-8px);
}

.card-right .info {
  text-align: right;
}

.card-right h2 {
  text-align: right;
}

.card-right .social-icons {
  justify-content: right;
}

.card-left h2 {
  text-align: left;
}

.profile-img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.info {
  flex: 1;
  min-width: 300px;
}

.info h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.info p {
  font-size: 1rem;
  margin-bottom: 15px;
}

.social-icons {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 16px;
  font-size: 1.5rem;
  cursor: pointer;
}

.social-icons li:hover {
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .equipe-header {
    padding: 230px 0 0 0;
  }

  .header {
    display: block;
    justify-content: center;
    text-align: center;
    gap: 20px;
    min-height: 30vh;
  }

  .illustration {
    min-width: 10px;
    width: 400px;
    height: auto;
  }

  h1 {
    padding-bottom: 20px;
    margin: 0 40px;
  }

  .intro {
    text-align: center;
    padding-right: 0px;
  }

  .subtext {
    font-size: 0.964rem;
    max-width: 100vh;
    text-align: center;
    margin: 20px;
  }

  .cards {
    padding: 50px 10px;
  }

  .card-left,
  .card-right {
    align-items: center;
    display: flex;
    gap: 30px;
    padding: 15px;
    max-width: 700px;
    border-radius: 8px;
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease;
  }

  .card-left {
    background-color: var(--detalhe-alternativo);
  }

  .card-right {
    background-color: var(--detalhe);
    margin: 40px 0 40px auto;
  }

  .card-left:hover,
  .card-right:hover {
    transform: translateY(-8px);
  }

  .card-right .info {
    text-align: right;
  }

  .card-right h2 {
    text-align: right;
  }

  .card-right .social-icons {
    justify-content: right;
  }

  .card-left h2 {
    text-align: left;
  }

  .profile-img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .info {
    flex: 1;
    min-width: 10px;
  }

  .info h2 {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }

  .info p {
    font-size: 0.7rem;
    margin-bottom: 5px;
  }

  .social-icons {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 16px;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .social-icons li:hover {
    transform: scale(1.2);
  }


}
</style>
