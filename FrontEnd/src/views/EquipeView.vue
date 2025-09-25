<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useThemeEquipeStore } from '@/stores/theme/themeEquipe'

const themeManager = useThemeManagerStore()
const themeEquipe = useThemeEquipeStore()

const slideIndex = ref(0)

const slides = ref([
  { src: '/src-equipe/equipe.png', alt: 'equipe' },
  { src: '/src-equipe/equipe1.png', alt: 'equipe1' },
  { src: '/src-equipe/equipe2.png', alt: 'equipe2' },
  { src: '/src-equipe/equipe3.png', alt: 'equipe3' },
  { src: '/src-equipe/equipe4.png', alt: 'equipe4' },

])

let intervalId = null

function nextSlide() {
  slideIndex.value = (slideIndex.value + 1) % slides.value.length
}
function prevSlide() {
  slideIndex.value =
    (slideIndex.value - 1 + slides.value.length) % slides.value.length
}

onMounted(() => {
  intervalId = setInterval(nextSlide, 6000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

onMounted(() => {
  const elements = document.querySelectorAll(
    '.animate-on-scroll, .animate-card-left, .animate-card-right'
  )

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  elements.forEach(el => observer.observe(el))
})
</script>

<template>
  <main class="notebook" :style="{ backgroundColor: themeManager.fundo }">
    <section class="sobre-nos animate-on-scroll">
      <div :style="{ borderBottom: '2px solid ' + themeManager.detalhe }">
        <h1 class="title" :style="{ color: themeManager.detalhe }">
          NOSSA EQUIPE
        </h1>
      </div>
    </section>

    <section class="tab-section animate-on-scroll">
      <div class="carousel-container">
        <div
          v-for="(slide, i) in slides"
          :key="i"
          class="carousel-slide"
          :class="{ active: slideIndex === i }"
        >
          <img :src="slide.src" :alt="slide.alt" />
        </div>
        <button class="prev" @click="prevSlide">&#10094;</button>
        <button class="next" @click="nextSlide">&#10095;</button>
      </div>
    </section>

    <section class="equipe-cards">
      <h2 :style="{ color: themeManager.detalhe }">
        CONHEÇA A EQUIPE QUE DESENVOLVEU<br />O ROUTE IFC!
      </h2>

      <div class="cards">
        <div
          class="card-left animate-card-left"
          :style="{ backgroundColor: themeManager.detalhe }"
        >
          <img
            src="/src-equipe/GabrielaS.jpeg"
            alt="Gabriela Senderski"
            class="profile-img"
          />
          <div class="info">
            <h2>Gabriela Senderski</h2>
            <span>BackEnd & Figma</span>
            <p>
              Desenvolveu o BackEnd do RouterIFC utilizando Django e auxiliou na
              prototipagem das telas no Figma.
            </p>
            <ul class="social-icons">
              <li>
                <a
                  href="https://www.instagram.com/_gabeski?igsh=emUyNmxiMmtlaXFh"
                  target="_blank"
                >
                  <span class="mdi mdi-instagram" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/GabrielaSenderski"
                  target="_blank"
                >
                  <span class="mdi mdi-github" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/gabriela-senderski-007681338/"
                  target="_blank"
                >
                  <span class="mdi mdi-linkedin" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a href="mailto:gabrielasenderski.ifc@gmail.com">
                  <span class="mdi mdi-email" style="color: #fff"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="card-right animate-card-right"
          :style="{ color: themeManager.detalhe }"
        >
          <div class="info">
            <h2>Henrique S. S. Borba</h2>
            <span>Modelagem & BackEnd</span>
            <p>
              Desenvolveu a modelagem do database com MySQL Workbench e
              contribuiu para o BackEnd com Django.
            </p>
            <ul class="social-icons">
              <li>
                <a
                  href="https://www.instagram.com/henri.ssb?igsh=MWc0M3Rwcm55bTVtMA=="
                  target="_blank"
                >
                  <span
                    class="mdi mdi-instagram"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
              <li>
                <a href="https://github.com/Henri0042007" target="_blank">
                  <span
                    class="mdi mdi-github"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/henrique-santiago-00b4962bb/"
                  target="_blank"
                >
                  <span
                    class="mdi mdi-linkedin"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
              <li>
                <a href="mailto:henrique.santiago.sb@gmail.com">
                  <span
                    class="mdi mdi-email"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
            </ul>
          </div>
          <img
            src="/src-equipe/HenriqueS.jpeg"
            alt="Henrique S. S. Borba"
            class="profile-img"
          />
        </div>

        <div
          class="card-left animate-card-left"
          :style="{ backgroundColor: themeManager.detalhe }"
        >
          <img
            src="/src-equipe/HigorB.jpeg"
            alt="Higor T. A. Braga"
            class="profile-img"
          />
          <div class="info">
            <h2>Higor T. A. Braga</h2>
            <span>Figma & APIGeolocation</span>
            <p>
              Trabalhou na prototipagem das telas com Figma e integração de
              APIGeolocation.
            </p>
            <ul class="social-icons">
              <li>
                <a
                  href="https://www.instagram.com/bragaxzh_?igsh=MWRzN2Z3YWI4Nzlubw=="
                  target="_blank"
                >
                  <span class="mdi mdi-instagram" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a href="https://github.com/higortab" target="_blank">
                  <span class="mdi mdi-github" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/higor-thiago-andresen-de-braga-592683385"
                  target="_blank"
                >
                  <span class="mdi mdi-linkedin" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a href="mailto:higor.tabraga@gmail.com">
                  <span class="mdi mdi-email" style="color: #fff"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="card-right animate-card-right"
          :style="{ color: themeManager.detalhe }"
        >
          <div class="info">
            <h2>Maria E. G. Tavares</h2>
            <span>Requisitos & APIGeolocation</span>
            <p>
              Projetou os requisitos de software e integração de
              APIGeolocation.
            </p>
            <ul class="social-icons">
              <li>
                <a
                  href="https://www.instagram.com/dudatavarezs?igsh=eDExNW51aHdpcHFj"
                  target="_blank"
                >
                  <span
                    class="mdi mdi-instagram"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
              <li>
                <a href="https://github.com/mariagtavres" target="_blank">
                  <span
                    class="mdi mdi-github"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/maria-eduarda-gonçalves-tavares-78a160381"
                  target="_blank"
                >
                  <span
                    class="mdi mdi-linkedin"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
              <li>
                <a href="mailto:mariagoncalves.ifc.araquari@gmail.com">
                  <span
                    class="mdi mdi-email"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
            </ul>
          </div>
          <img
            src="/src-equipe/MariaT.jpeg"
            alt="Maria E. G. Tavares"
            class="profile-img"
          />
        </div>

        <div
          class="card-left animate-card-left"
          :style="{ backgroundColor: themeManager.detalhe }"
        >
          <img
            src="/src-equipe/PauloA.jpeg"
            alt="Paulo A. Pereira"
            class="profile-img"
          />
          <div class="info">
            <h2>Paulo A. Pereira</h2>
            <span>FrontEnd & Responsividade</span>
            <p>
              Desenvolveu integralmente o FrontEnd e responsividade, utilizando
              Vue.js.
            </p>
            <ul class="social-icons">
              <li>
                <a
                  href="https://www.instagram.com/pauloartur_23?igsh=Z2JpYThhMGo1ZGNu"
                  target="_blank"
                >
                  <span class="mdi mdi-instagram" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a href="https://github.com/Pauloartur-23" target="_blank">
                  <span class="mdi mdi-github" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/paulo-artur-pereira-1748172b8/"
                  target="_blank"
                >
                  <span class="mdi mdi-linkedin" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a href="mailto:pauloartur.ifc@gmail.com">
                  <span class="mdi mdi-email" style="color: #fff"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>

  <main class="celular" :style="{ backgroundColor: themeManager.fundo }">
    <section class="sobre-nos animate-on-scroll">
      <div :style="{ borderBottom: '2px solid ' + themeManager.detalhe }">
        <h1 class="title" :style="{ color: themeManager.detalhe }">
          NOSSA EQUIPE
        </h1>
      </div>
    </section>

    <section class="tab-section animate-on-scroll">
      <div class="carousel-container">
        <div
          v-for="(slide, i) in slides"
          :key="i"
          class="carousel-slide"
          :class="{ active: slideIndex === i }"
        >
          <img :src="slide.src" :alt="slide.alt" />
        </div>
        <button class="prev" @click="prevSlide">&#10094;</button>
        <button class="next" @click="nextSlide">&#10095;</button>
      </div>
    </section>

    <section class="equipe-cards">
      <h2 :style="{ color: themeManager.detalhe }">
        CONHEÇA A EQUIPE QUE DESENVOLVEU<br />O ROUTE IFC!
      </h2>

      <div class="cards">
        <div
          class="card-left animate-on-scroll"
          :style="{ backgroundColor: themeManager.detalhe }"
        >
          <img
            src="/src-equipe/GabrielaS.jpeg"
            alt="Gabriela Senderski"
            class="profile-img"
          />
          <div class="info">
            <h2>Gabriela Senderski</h2>
            <span>BackEnd & Figma</span>
            <p>
              Desenvolveu o BackEnd do RouterIFC utilizando Django e auxiliou na
              prototipagem das telas no Figma.
            </p>
            <ul class="social-icons">
              <li>
                <a
                  href="https://www.instagram.com/_gabeski?igsh=emUyNmxiMmtlaXFh"
                  target="_blank"
                >
                  <span class="mdi mdi-instagram" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/GabrielaSenderski"
                  target="_blank"
                >
                  <span class="mdi mdi-github" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/gabriela-senderski-007681338/"
                  target="_blank"
                >
                  <span class="mdi mdi-linkedin" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a href="mailto:gabrielasenderski.ifc@gmail.com">
                  <span class="mdi mdi-email" style="color: #fff"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="card-right animate-on-scroll"
          :style="{ color: themeManager.detalhe }"
        >
          <div class="info">
            <h2>Henrique S. S. Borba</h2>
            <span>Modelagem & BackEnd</span>
            <p>
              Desenvolveu a modelagem do database com MySQL Workbench e
              contribuiu para o BackEnd com Django.
            </p>
            <ul class="social-icons">
              <li>
                <a
                  href="https://www.instagram.com/henri.ssb?igsh=MWc0M3Rwcm55bTVtMA=="
                  target="_blank"
                >
                  <span
                    class="mdi mdi-instagram"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
              <li>
                <a href="https://github.com/Henri0042007" target="_blank">
                  <span
                    class="mdi mdi-github"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/henrique-santiago-00b4962bb/"
                  target="_blank"
                >
                  <span
                    class="mdi mdi-linkedin"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
              <li>
                <a href="mailto:henrique.santiago.sb@gmail.com">
                  <span
                    class="mdi mdi-email"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
            </ul>
          </div>
          <img
            src="/src-equipe/HenriqueS.jpeg"
            alt="Henrique S. S. Borba"
            class="profile-img"
          />
        </div>

        <div
          class="card-left animate-on-scroll"
          :style="{ backgroundColor: themeManager.detalhe }"
        >
          <img
            src="/src-equipe/HigorB.jpeg"
            alt="Higor T. A. Braga"
            class="profile-img"
          />
          <div class="info">
            <h2>Higor T. A. Braga</h2>
            <span>Figma & APIGeolocation</span>
            <p>
              Trabalhou na prototipagem das telas com Figma e integração de
              APIGeolocation.
            </p>
            <ul class="social-icons">
              <li>
                <a
                  href="https://www.instagram.com/bragaxzh_?igsh=MWRzN2Z3YWI4Nzlubw=="
                  target="_blank"
                >
                  <span class="mdi mdi-instagram" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a href="https://github.com/higortab" target="_blank">
                  <span class="mdi mdi-github" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/higor-thiago-andresen-de-braga-592683385"
                  target="_blank"
                >
                  <span class="mdi mdi-linkedin" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a href="mailto:higor.tabraga@gmail.com">
                  <span class="mdi mdi-email" style="color: #fff"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="card-right animate-on-scroll"
          :style="{ color: themeManager.detalhe }"
        >
          <div class="info">
            <h2>Maria E. G. Tavares</h2>
            <span>Requisitos & APIGeolocation</span>
            <p>
              Projetou os requisitos de software e integração de
              APIGeolocation.
            </p>
            <ul class="social-icons">
              <li>
                <a
                  href="https://www.instagram.com/dudatavarezs?igsh=eDExNW51aHdpcHFj"
                  target="_blank"
                >
                  <span
                    class="mdi mdi-instagram"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
              <li>
                <a href="https://github.com/mariagtavres" target="_blank">
                  <span
                    class="mdi mdi-github"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/maria-eduarda-gonçalves-tavares-78a160381"
                  target="_blank"
                >
                  <span
                    class="mdi mdi-linkedin"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
              <li>
                <a href="mailto:mariagoncalves.ifc.araquari@gmail.com">
                  <span
                    class="mdi mdi-email"
                    :style="{ color: themeManager.detalhe }"
                  ></span>
                </a>
              </li>
            </ul>
          </div>
          <img
            src="/src-equipe/MariaT.jpeg"
            alt="Maria E. G. Tavares"
            class="profile-img"
          />
        </div>

        <div
          class="card-left animate-on-scroll"
          :style="{ backgroundColor: themeManager.detalhe }"
        >
          <img
            src="/src-equipe/PauloA.jpeg"
            alt="Paulo A. Pereira"
            class="profile-img"
          />
          <div class="info">
            <h2>Paulo A. Pereira</h2>
            <span>FrontEnd & Responsividade</span>
            <p>
              Desenvolveu integralmente o FrontEnd e responsividade, utilizando
              Vue.js.
            </p>
            <ul class="social-icons">
              <li>
                <a
                  href="https://www.instagram.com/pauloartur_23?igsh=Z2JpYThhMGo1ZGNu"
                  target="_blank"
                >
                  <span class="mdi mdi-instagram" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a href="https://github.com/Pauloartur-23" target="_blank">
                  <span class="mdi mdi-github" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/paulo-artur-pereira-1748172b8/"
                  target="_blank"
                >
                  <span class="mdi mdi-linkedin" style="color: #fff"></span>
                </a>
              </li>
              <li>
                <a href="mailto:pauloartur.ifc@gmail.com">
                  <span class="mdi mdi-email" style="color: #fff"></span>
                </a>
              </li>
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

.cards {
  padding: 80px 200px;
}

.equipe-cards h2 {
  text-align: center;
  margin-top: 80px;
  margin-bottom: 0px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.card-left,
.card-right {
  display: flex;
  gap: 30px;
  padding: 30px 50px;
  max-width: 700px;
  border-radius: 16px;
  color: #fff;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
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
  margin: 0;
}

.card-right .social-icons {
  justify-content: left;
}

.card-left h2 {
  text-align: left;
  margin: 0;
}

.card-left .social-icons {
  justify-content: right;
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
  text-shadow: none;
}

.info span {
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 10px;
  display: inline-block;
}

.info p {
  font-size: 1rem;
  margin-bottom: 15px;
}

.info .social-icons {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 16px;
  cursor: pointer;
}

.info .social-icons li span {
  font-size: 1.5rem;
  transition: transform 0.3s;
}

.info .social-icons li:hover {
  transform: scale(1.2);
}


.carousel-container {
  position: relative;
  margin: auto;
  overflow: hidden;
  border-radius: 15px;
  margin: 0 160px;
}

.carousel-slide {
  display: none;
  position: relative;
}

.carousel-slide img {
  width: 100%;
  height: 480px;
  border-radius: 15px;
}


.carousel-text h2 {
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 95%;
  color: white;
  border-radius: 30px;
  padding: 0 0 60px 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
}

.carousel-slide.active {
  display: block;
  animation: fade 1s ease-in-out;
}
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  padding: 2px 13px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 30px;
  border: none;
  background: rgba(0,0,0,0.3);
  border-radius: 50%;
  user-select: none;
  transition: background 0.3s;
}

.prev:hover, .next:hover {
  background: rgba(0,0,0,0.6);
}

.prev {
  left: 60px;
}

.next {
  right: 60px;
}

@keyframes fade {
  from {opacity: 0.4}
  to {opacity: 1}
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

  .carousel-container {
    margin: auto;
    overflow: hidden;
    border-radius: 15px;
    margin: 20px 0px;
  }
  .carousel-slide img {
    width: 100%;
    height: 200px;
    border-radius: 15px;
  }

  .carousel-text h2 {
    font-size: 1.2rem;
    padding: 0 0 40px 0;
  }

  .prev {
    left: 10px;
    padding: 2px 8px;
    font-size: 20px;
  }

  .next {
    right: 10px;
    padding: 2px 8px;
    font-size: 20px;
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
