<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useThemeManagerStore } from '@/stores/theme/themeManager'
import { useAuthStateStore } from '@/stores/authState'

const themeManager = useThemeManagerStore()
const authStore = useAuthStateStore()

const slideIndex = ref(0)
let intervalId = null

const slides = ref([
  {
    img: '/src-home/Passageiros.png',
    title: 'PASSAGEIROS',
    text: `Para os passageiros, nosso site oferece praticidade e acompanhamento em tempo real.
           Os alunos contam com um transporte confiável e organizado, tornando o trajeto escolar
           mais seguro e tranquilo todos os dias.`
  },
  {
    img: '/src-home/motorista.png',
    title: 'MOTORISTAS',
    text: `Nosso site oferece aos motoristas a oportunidade de se cadastrarem e acessarem rotas disponíveis conforme
           sua região. Eles têm um painel próprio onde podem gerenciar seus horários e receber notificações sobre
           alterações de rota ou imprevistos. Além disso, prezamos pela segurança, exigindo documentos atualizados
           e treinamento básico sobre atendimento e primeiros socorros.`
  },
  {
    img: '/src-home/empresa.png',
    title: 'EMPRESAS',
    text: `As empresas de transporte escolar que se cadastram no nosso site ganham visibilidade e organização.
           A plataforma permite o gerenciamento das rotas, dos motoristas e dos veículos em tempo real. Com isso,
           garantimos mais eficiência no serviço prestado e mais confiança por parte das famílias.`
  }
])

function showSlide(n) {
  slideIndex.value = (n + slides.value.length) % slides.value.length
}

function nextSlide() {
  showSlide(slideIndex.value + 1)
}

function prevSlide() {
  showSlide(slideIndex.value - 1)
}

onMounted(() => {
  intervalId = setInterval(nextSlide, 6000)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        } else {
          entry.target.classList.remove('in-view')
        }
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <main class="notebook">
    <section class="Home-header"
      :style="{ backgroundColor: themeManager.fundo, backgroundImage: 'url(/src-home/banner.png)', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', color: themeManager.text }">
      <div class="header animate-on-scroll" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #051624)">
        <h2>BEM VINDO AO</h2>
        <h1>ROUTER IFC!</h1>
        <p>A opção mais segura e confiável de administração<br> de transporte no Instituto Federal Catarinense</p>
        <div class="beneficios animate-on-scroll">
          <p><span class="mdi mdi-clock-outline"></span>Entrega Rápida</p>
          <p><span class="mdi mdi-lock-outline"></span>100% Seguro</p>
          <p><span class="mdi mdi-map-outline"></span>Joinville Inteira</p>
        </div>
      </div>
    </section>

    <section class="empresa animate-on-scroll">
      <h2 class="section-title" :style="{ color: themeManager.detalhe }">EMPRESAS PARCEIRAS:</h2>
      <div class="empresas-lista">
        <div class="empresa-card animate-on-scroll fade-in-left" >
          <img src="/src-home/logoindytour.png" alt="Logo Indy Tour" class="logoindy" />
          <div class="empresa-info">
            <h3 :style="{ color: themeManager.detalhe }">Indy Tour</h3>
            <p :style="{ color: themeManager.text }">
              A IndyTour, criada em 2020, é uma empresa de transporte por vans que atende os estudantes do IFC com segurança e conforto...
              <RouterLink to="/IndyTour" :style="{ color: themeManager.detalheAlternativo }" @click="authStore.mudarStateEmpresa('Indy')">saiba mais</RouterLink>
            </p>
            <div class="empresa-redes-sociais">
              <a href="https://www.instagram.com/indytour.oficial" target="_blank" :style="{ color: themeManager.detalhe }"><span class="mdi mdi-instagram"></span></a>
              <a href="tel:+5547999677777" target="_blank" :style="{ color: themeManager.detalhe }"><span class="mdi mdi-phone"></span></a>
            </div>
          </div>
        </div>

        <div class="empresa-card animate-on-scroll fade-in-right">
          <img src="/src-home/logosul.png" alt="Logo Sul Turismo" class="logo" />
          <div class="empresa-info">
            <h3 :style="{ color: themeManager.detalhe }">Sul Turismo</h3>
            <p :style="{ color: themeManager.text }">
              A Sul Turismo, criada em 2015, atua no transporte de estudantes com foco em eficiência e qualidade...
              <RouterLink to="/IndySul" :style="{ color: themeManager.detalheAlternativo }" @click="authStore.mudarStateEmpresa('Sul')">saiba mais</RouterLink>
            </p>
            <div class="empresa-redes-sociais">
              <a href="https://www.instagram.com/sul.turismo.jlle" target="_blank" :style="{ color: themeManager.detalhe }"><span class="mdi mdi-instagram"></span></a>
              <a href="tel:+5547999677777" target="_blank" :style="{ color: themeManager.detalhe }"><span class="mdi mdi-phone"></span></a>
            </div>
          </div>
        </div>
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
          <img :src="slide.img" :alt="slide.title" />
          <div class="carousel-text" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #051624 75%)">
            <h2>{{ slide.title }}</h2>
            <p v-html="slide.text"></p>
          </div>
        </div>

        <button class="prev" @click="prevSlide">&#10094;</button>
        <button class="next" @click="nextSlide">&#10095;</button>
      </div>
    </section>

    <section class="start-section animate-on-scroll">
      <h2 :style="{ color: themeManager.detalhe }">PRONTO PARA COMEÇAR SUA JORNADA?</h2>
      <p :style="{ color: themeManager.text }">Cadastre-se já para garantir seu lugar na melhor opção de transporte para o IFC-Araquari</p>
      <button :style="{ backgroundColor: themeManager.detalhe }" class="cadastre-se">CADASTRE-SE</button>
      <button :style="{ borderColor: themeManager.detalhe, color: themeManager.detalhe }" class="login">FAÇA LOGIN</button>
    </section>
  </main>

  <main class="celular">
    <section class="Home-header"
      :style="{ backgroundColor: themeManager.fundo, color: themeManager.text }">
      <div class="header animate-on-scroll">
        <h2 :style="{ color: themeManager.text }">BEM VINDO AO</h2>
        <h1 :style="{ color: themeManager.detalhe, borderColor: themeManager.text }">ROUTER IFC!</h1>
        <p :style="{ color: themeManager.text }">A opção mais segura e confiável de administração<br> de transporte no Instituto Federal Catarinense</p>
        <div class="beneficios animate-on-scroll">
          <p :style="{ color: themeManager.text }"><span class="mdi mdi-clock-outline"></span>Entrega Rápida</p>
          <p :style="{ color: themeManager.text }"><span class="mdi mdi-lock-outline"></span>100% Seguro</p>
          <p :style="{ color: themeManager.text }"><span class="mdi mdi-map-outline"></span>Joinville Inteira</p>
        </div>
      </div>
    </section>

    <section class="empresa animate-on-scroll">
      <h2 class="section-title" :style="{ color: themeManager.detalhe }">EMPRESAS PARCEIRAS:</h2>
      <div class="empresas-lista">
        <div class="empresa-card animate-on-scroll">
          <img src="/src-home/logoindytour.png" alt="Logo Indy Tour" class="logoindy" />
          <div class="empresa-info">
            <h3 :style="{ color: themeManager.detalhe }">Indy Tour</h3>
            <p :style="{ color: themeManager.text }">
              A IndyTour, criada em 2020, é uma empresa de transporte por vans que atende os estudantes do IFC com segurança e conforto...
              <RouterLink to="/IndyTour" :style="{ color: themeManager.detalheAlternativo }" @click="authStore.mudarStateEmpresa('Indy')">saiba mais</RouterLink>
            </p>
            <div class="empresa-redes-sociais">
              <a href="https://www.instagram.com/indytour.oficial" target="_blank" :style="{ color: themeManager.detalhe }"><span class="mdi mdi-instagram"></span></a>
              <a href="tel:+5547999677777" target="_blank" :style="{ color: themeManager.detalhe }"><span class="mdi mdi-phone"></span></a>
            </div>
          </div>
        </div>

        <div class="empresa-card animate-on-scroll">
          <img src="/src-home/logosul.png" alt="Logo Sul Turismo" class="logo" />
          <div class="empresa-info">
            <h3 :style="{ color: themeManager.detalhe }">Sul Turismo</h3>
            <p :style="{ color: themeManager.text }">
              A Sul Turismo, criada em 2015, atua no transporte de estudantes com foco em eficiência e qualidade...
              <RouterLink to="/IndySul" :style="{ color: themeManager.detalheAlternativo }" @click="authStore.mudarStateEmpresa('Sul')">saiba mais</RouterLink>
            </p>
            <div class="empresa-redes-sociais">
              <a href="https://www.instagram.com/sul.turismo.jlle" target="_blank" :style="{ color: themeManager.detalhe }"><span class="mdi mdi-instagram"></span></a>
              <a href="tel:+5547999677777" target="_blank" :style="{ color: themeManager.detalhe }"><span class="mdi mdi-phone"></span></a>
            </div>
          </div>
        </div>
      </div>
    </section>

     <section class="tab-section animate-on-scroll">
    <div
      class="carousel-container"
      :style="{ backgroundColor: themeManager.detalhe }"
    >
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="carousel-slide"
        :class="{ active: slideIndex === i }"
      >
        <div class="carousel-text">
          <h2>{{ slide.title }}</h2>
          <p v-html="slide.text"></p>
        </div>
      </div>

      <button class="prev" @click="prevSlide">&#10094;</button>
      <button class="next" @click="nextSlide">&#10095;</button>
    </div>
  </section>

    <section class="start-section animate-on-scroll">
      <h2 :style="{ color: themeManager.detalhe }">PRONTO PARA COMEÇAR SUA JORNADA?</h2>
      <p :style="{ color: themeManager.text }">Cadastre-se já para garantir seu lugar na melhor opção de transporte para o IFC-Araquari</p>
      <button :style="{ backgroundColor: themeManager.detalhe }" class="cadastre-se">CADASTRE-SE</button>
      <button :style="{ borderColor: themeManager.detalhe, color: themeManager.detalhe }" class="login">FAÇA LOGIN</button>
    </section>
  </main>
</template>


<style scoped>
.animate-on-scroll {
  opacity: 0;
  transform: translateY(50px) scale(0.95);
  transition: all 0.7s cubic-bezier(.2, .65, .25, 1);
}

.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0) scale(1);
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

.header {
  color: white;
  text-align: center;
  padding: 60vh 20px 50px 20px;
}

.header h2 {
  font-size: 2.5rem;
  font-weight: 100;
  color: #ffffff98;
  margin: 0;
}

.header h1 {
  font-size: 7rem;
  font-weight: 700;
  margin: 0;
  color: #2292ee84;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.449);
}

.header p {
  font-size: 0.9rem;
  margin: 0 0 20px 0;
  color: #ffffff92;
}

.header .beneficios p {
  font-size: 1.2rem;
  margin: 0;
  color: #ffffff92;

}

.beneficios {
  display: flex;
  justify-content: center;
  gap: 250px;
  font-weight: 600;
  margin: 0;
}

.beneficios span {
  font-size: 1.5rem;
  vertical-align: middle;
  margin-right: 8px;
}

.empresa {
  padding: 100px 50px;
  text-align: center;
}

.empresa .section-title {
  margin-bottom: 40px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.empresa .empresas-lista {
  display: flex;
  justify-content: center;
  gap: 50px;
}

.empresa .empresa-card {
  display: flex;
  border-radius: 30px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.142);
  padding: 20px;
  width: 800px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.empresa .empresa-card:hover {
  transform: scale(1.05);
}

.empresa .empresa-card .logo {
  width: 180px;
  height: 180px;
  margin-bottom: 15px;
  margin-right: 20px;
}


.empresa .empresa-card .logoindy {
  width: 180px;
  height: 180px;
  margin-bottom: 15px;
  margin-right: 20px;
  border-radius: 100%;
  border: 2px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.empresa .empresa-card .empresa-info {
  text-align: left;
}

.empresa .empresa-card .empresa-info h3 {
  margin: 0;
  margin-bottom: 5px;
  font-size: 2rem;
}

.empresa .empresa-card .empresa-info p {
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.empresa .empresa-card .empresa-info a {
  text-decoration: none;
  font-size: 1rem;
  margin: 0 10px;
}

.empresa .empresa-card .empresa-info a span {
  font-size: 1.5rem;
  vertical-align: middle;
  margin-right: 8px;
}

.empresa .empresa-card .empresa-redes-sociais {
  display: flex;
  justify-content: end;
  margin-top: 10px;
}

.empresa .empresa-card .empresa-redes-sociais a {
  text-decoration: none;
  margin-right: 10px;
  font-size: 1.5rem;
}

.empresa .empresa-card .empresa-redes-sociais a:last-child {
  margin-right: 0;
}

.start-section {
  text-align: center;
  padding: 100px 20px;
}

.start-section h2 {
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.start-section p {
  font-size: 1rem;
  margin-bottom: 20px;
  color: #666;
}

.start-section button {
  display: inline-block;
  padding: 10px 20px;
  margin: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.start-section .cadastre-se {
  border-radius: 30px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

}

.start-section .login {
  border: 2px solid;
  border-radius: 30px;
  background-color: transparent;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: 0.3s ease;
}

.start-section .cadastre-se:hover,
.start-section .login:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.carousel-container {
  position: relative;
  margin: auto;
  overflow: hidden;
  border-radius: 15px;
  margin: 0 60px;
}

.carousel-slide {
  display: none;
  position: relative;
}

.carousel-slide img {
  width: 100%;
  border-radius: 15px;
}

.carousel-slide.active {
  display: block;
  animation: fade 1s ease-in-out;
}

.carousel-text {
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

.carousel-text h2 {
  margin: 0;
  font-weight: bold;
}

.carousel-text p {
  font-size: 0.9rem;
  margin-top: 8px;
  margin: 8px 200px 0 200px;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  padding: 2px 13px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 30px;
  border: none;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  user-select: none;
  transition: background 0.3s;
}

.prev:hover,
.next:hover {
  background: rgba(0, 0, 0, 0.6);
}

.prev {
  left: 60px;
}

.next {
  right: 60px;
}

@keyframes fade {
  from {
    opacity: 0.4
  }

  to {
    opacity: 1
  }
}

@media (max-width: 768px) {

  .header {
    padding: 30vh 20px 20px 20px;
  }

  .header h1 {
    font-size: 3rem;
    color: #2292ee;
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.392);
      border-bottom: 2px solid #000;
      padding: 5px 0 25px 0;
      margin-bottom: 20px;
  }

  .header h2 {
    font-size: 2rem;
  }

  .header p {
    font-size: 0.9rem;
  }

  .beneficios {
    gap: 20px;
    flex-direction: column;
    font-size: 0.5rem;
  }

  .empresa .empresas-lista {
    flex-direction: column;
    gap: 30px;
  }

  .empresa .empresa-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: auto;
  }

  .empresa .empresa-card .logo,
  .empresa .empresa-card .logoindy {
    margin-right: 0;
    margin-bottom: 15px;
  }

 .carousel-container {
  position: relative;
  overflow: hidden;
  height: 300px;
  margin: 0px 20px;
}

.carousel-slide {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 0.6s ease;
  opacity: 0;
}

.carousel-slide.active {
  display: block;
  opacity: 1;
}

.carousel-text {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-align: center;
  padding: 0 0 15px 0;
}

button.prev,
button.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
}

button.prev {
  left: 10px;
}
button.next {
  right: 10px;
}
}
</style>
