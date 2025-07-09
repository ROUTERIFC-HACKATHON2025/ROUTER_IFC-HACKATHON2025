<script setup>
import { useThemeManagerStore } from '@/stores/themeManager'

const themeManager = useThemeManagerStore()
</script>

<template>
  <section class="equipe-container" :style="{ backgroundColor: themeManager.fundo }">
    <div class="header" :style="{ borderBottom: '2px solid ' + themeManager.detalhe }">
      <img src="/public/equipe.png" alt="Ilustração equipe" class="illustration" />
      <div class="intro">
        <h1 :style="{ color: themeManager.text }">
          NOSSA <span :style="{color: themeManager.detalheAlternativo}">EQUIPE</span>
        </h1>
        <p class="subtext" :style="{ color: themeManager.text }">
          Conheça o time que <br>desenvolveu o RouterIFC!
        </p>
      </div>
    </div>
  </section>
  <section class="cards" :style="{ backgroundColor: themeManager.fundo }">
    <div class="card-left" :style="{ backgroundColor: themeManager.detalheAlternativo}">
      <img src="/public/GabrielaSenderski-foto.png" alt="Gabriela Senderski" class="profile-img" />
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
     <div class="card-right" :style="{ backgroundColor: themeManager.detalhe}">
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
      <img src="/public/HenriqueBorba-foto.png" alt="Henrique S. S. Borba" class="profile-img" />
    </div>
    <div class="card-left" :style="{ backgroundColor: themeManager.detalheAlternativo}">
      <img src="/public/HigorBraga-foto.png" alt="Higor T. A. Braga" class="profile-img" />
      <div class="info">
        <h2>Higor T. A. Braga</h2>
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
     <div class="card-right" :style="{ backgroundColor: themeManager.detalhe}">
      <div class="info">
        <h2>Maria E. G. Tavares</h2>
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
      <img src="/public/MariaTavares-foto.png" alt="Maria E. G. Tavares" class="profile-img" />
    </div>
    <div class="card-left" :style="{ backgroundColor: themeManager.detalheAlternativo}">
      <img src="/public/PauloPereira-foto.png" alt="Paulo A. Pereira" class="profile-img" />
      <div class="info">
        <h2>Paulo A. Pereira</h2>
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
  </section>
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
  min-width: 700px;
}

.intro {
  flex: 1;
  min-width: 400px;
  text-align: right;
  padding-right: 70px;
}

h1 {
  font-size: 3em;
  font-weight: bold;
  line-height: 1.2;
}
h1 span{
  font-weight: bold;
}

.subtext {
  font-size: 1.2rem;
  margin-top: 10px;
  font-weight: 500;
}

.cards {
  padding: 60px 200px;
}

.card-left {
  display: flex;
  gap: 30px;
  padding: 30px;
  max-width: 700px;
  border-radius: 16px;
  flex-wrap: wrap;
  color: #fff;
}

.card-right {
  display: flex;
  gap: 30px;
  padding: 30px;
  max-width: 700px;
  border-radius: 16px;
  flex-wrap: wrap;
  color: #fff;
  margin: 40px 0 40px auto;
}

.card-right .info{
  text-align: right;
}

.card-right .social-icons{
  justify-content: right;
}

.profile-img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 100%;
}

.info {
  flex: 1;
  min-width: 300px;
}

.info h2 {
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.info p {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 15px;
}

.social-icons {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 16px;
  font-size: 1.5rem;
}

.social-icons li {
  cursor: pointer;
  transition: transform 0.2s;
}

.social-icons li:hover {
  transform: scale(1.2);
}
</style>
