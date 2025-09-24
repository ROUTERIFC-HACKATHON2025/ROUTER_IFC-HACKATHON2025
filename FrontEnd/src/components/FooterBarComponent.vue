<script setup>
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { useThemeManagerStore } from '@/stores/theme/themeManager'

const themeManager = useThemeManagerStore()
onMounted(themeManager.init)
</script>

<template>
  <footer class="notebook" :style="{ backgroundColor: themeManager.detalhe }">
    <div class="footer-top">
      <img src="/src-logos/logo-footer.png" alt="">
      <button class="login">Entrar</button>
    </div>
    <div class="container">
      <div class="footer-content">
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
        <div class="footer-section">
          <h2>Contato</h2>
          <ul>
            <li>routerifc@gmail.com</li>
            <li>(47) 99125-5265</li>
            <li>@routerifc</li>
          </ul>
        </div>
        <div class="footer-section-icons">
          <h2>Redes Sociais</h2>
          <ul class="social-icons">
            <li><a href="https://www.instagram.com/routerifc" target="_blank"><span class="mdi mdi-instagram"></span></a></li>
            <li><a href="https://www.facebook.com/people/Router-Ifc/pfbid02KpkKuZ7J8CJAtjzN1ZfBAWa8nDZXJBhJYyaehTLEJ5Wm6KLJ6cxik9zB8UU4Mp5Ql/" target="_blank"><span class="mdi mdi-facebook"></span></a></li>
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
    <div class="footer-top">
      <img src="/src-logos/logo-footer.png" alt="">
      <button class="login">Entrar</button>
    </div>
    <div class="container">
      <div class="footer-content">
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
        
        <div class="footer-section">
          <h2>Contato</h2>
          <ul>
            <li>routerifc@gmail.com</li>
            <li>(47) 99125-5265</li>
            <li>@routerifc</li>
          </ul>
        </div>
        <div class="footer-section-icons">
          <h2>Redes Sociais</h2>
          <ul class="social-icons">
            <li><a href="https://www.instagram.com/routerifc" target="_blank"><span class="mdi mdi-instagram"></span></a></li>
            <li><a href="https://www.facebook.com/people/Router-Ifc/pfbid02KpkKuZ7J8CJAtjzN1ZfBAWa8nDZXJBhJYyaehTLEJ5Wm6KLJ6cxik9zB8UU4Mp5Ql/" target="_blank"><span class="mdi mdi-facebook"></span></a></li>
            <li><a href="https://www.twitter.com/routerifc" target="_blank"><span class="mdi mdi-twitter"></span></a></li>
          </ul>
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

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 100px;
  border-bottom: 2px solid #e4e4e4;
}

.footer-top img {
  width: 150px;
}

.footer-top button {
  padding: 10px 20px;
  background-color: #ffffff;
  color: #08253c;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
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
  text-align: left;
}

.footer-section ul,
.footer-section-icons ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  cursor: pointer;
  font-weight: 500;
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

  .footer-top {
    padding: 10px 20px;
  }

  .footer-top img {
    width: 120px;
  }

  .footer-top button {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  .footer-content {
    display: block;
    padding-bottom: 0;
  }

  .footer-content .footer-section {
    margin-bottom: 30px;
    text-align: center;
  }

  .footer-section img {
    width: 100px;
    margin-bottom: 0px;
  }

  .footer-section h2 {
    font-size: 1.7rem;
    text-align: center;
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

  .footer-section-icons {
    margin-bottom: 50px;
  }

  .footer-section-icons ul{
    justify-content: center;
  }

  .social-icons li a {
    font-size: 1.5rem;
  }

  .footer-bottom {
    font-size: 0.8rem;
  }
}
</style>