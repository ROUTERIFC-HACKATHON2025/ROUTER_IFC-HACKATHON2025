<script setup>
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'

const themeManager = useThemeManagerStore()
onMounted(themeManager.init)
</script>

<template>
  <footer class="notebook" :style="{ backgroundColor: themeManager.detalhe }">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <img :src="themeManager.logofooter" alt="Logo da Router">
          <p>Transporte escolar <br> para o IFC de forma <br> segura e fácil.</p>
        </div>
        <div class="footer-section">
          <h2>Serviços</h2>
          <ul>
            <li><RouterLink to="/login" :style="{ color: '#fff' }">Para Motoristas</RouterLink></li>
            <li><RouterLink to="/login" :style="{ color: '#fff' }">Para Estudantes</RouterLink></li>
            <li><RouterLink to="/empresas" :style="{ color: '#fff' }">Para Empresas</RouterLink></li>
          </ul>
        </div>
        <div class="footer-section">
          <h2>Empresa</h2>
          <ul>
            <li><RouterLink to="/SobreNos" :style="{ color: '#fff' }">Sobre nós</RouterLink></li>
            <li><RouterLink to="/equipe" :style="{ color: '#fff' }">Equipe</RouterLink></li>
            <li><RouterLink to="/Empresa" :style="{ color: '#fff' }">Empresa</RouterLink></li>
          </ul>
        </div>
        <div class="footer-section-icons">
          <h2>Redes Sociais</h2>
          <ul class="social-icons">
            <li><a href="https://www.instagram.com/routerifc" target="_blank"><span class="mdi mdi-instagram"></span></a></li>
            <li><a href="https://www.facebook.com/routerifc" target="_blank"><span class="mdi mdi-facebook"></span></a></li>
            <li><a href="https://www.twitter.com/routerifc" target="_blank"><span class="mdi mdi-twitter"></span></a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Router-IFC. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
  <footer class="celular" :style="{ backgroundColor: themeManager.detalhe }">
    <div class="container">
      <div class="footer-content">
        <div>
          <div class="footer-section" id="footer-section-space">
            <img :src="themeManager.logofooter" alt="Logo da Router">
            <p>Transporte escolar <br> para o IFC de forma <br> segura e fácil.</p>
          </div>
          <div class="footer-section">
            <h2>Serviços</h2>
            <ul>
              <li><RouterLink to="/login" :style="{ color: '#fff' }">Para Motoristas</RouterLink></li>
              <li><RouterLink to="/login" :style="{ color: '#fff' }">Para Estudantes</RouterLink></li>
              <li><RouterLink to="/empresas" :style="{ color: '#fff' }">Para Empresas</RouterLink></li>
            </ul>
          </div>
        </div>
        <div>
          <div class="footer-section-icons" id="footer-section-icons-space">
            <h2>Redes Sociais</h2>
            <ul class="social-icons">
              <li><a href="#"><span class="mdi mdi-instagram"></span></a></li>
              <li><a href="#"><span class="mdi mdi-facebook"></span></a></li>
              <li><a href="#"><span class="mdi mdi-twitter"></span></a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h2>Empresa</h2>
            <ul>
              <li><RouterLink to="/SobreNos" :style="{ color: '#fff' }">Sobre nós</RouterLink></li>
              <li><RouterLink to="/equipe" :style="{ color: '#fff' }">Equipe</RouterLink></li>
              <li><RouterLink to="/Empresa" :style="{ color: '#fff' }">Empresa</RouterLink></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Router-IFC. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  color: #e4e4e4;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 40px 20px 40px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
  padding-bottom: 30px;
  border-bottom: 2px solid #e4e4e4;
}

.footer-section img {
  width: 120px;
  margin-bottom: 10px;
}

.footer-section h2 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
}

.footer-section ul,
.footer-section-icons ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  cursor: pointer;
}

.footer-section ul li:hover {
  text-decoration: underline;
}

.footer-section p {
  font-size: 1rem;
  line-height: 1.6;
}

.social-icons {
  display: flex;
  gap: 15px;
  padding-left: 0;
}

.footer-content .footer-section-icons h2 {
  margin-bottom: 5px;
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
}

.social-icons li a {
  font-size: 2rem;
  color: #e4e4e4;
  transition: color 0.3s;
}

.social-icons li a:hover {
  color: #ffffff;
}

.footer-bottom {
  text-align: center;
  margin-top: 25px;
  font-size: 0.9rem;
  color: #cfcfcf;
}

@media (max-width: 768px) {
  #footer-section-space {
    margin-bottom: 20px;
  }

  #footer-section-icons-space {
    margin-bottom: 50px;
  }

  .footer-section img {
    width: 100px;
    margin-bottom: 0px;
  }

  .footer-section h2 {
    font-size: 1.5rem;
    text-align: left;
  }

  .footer-section ul li {
    font-size: 0.8rem;
  }


  .footer-section p {
    font-size: 0.8rem;
  }

  .social-icons {
    gap: 10px;
  }

  .footer-content .footer-section-icons h2 {
    font-size: 1.5rem;
  }

  .social-icons li a {
    font-size: 1.5rem;
  }
}
</style>