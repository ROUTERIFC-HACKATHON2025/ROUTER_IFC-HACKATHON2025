<script setup>
</script>

<template>
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <img src="/public/Logo-ROUTER-footer.png" alt="Logo da Router">
                    <p>Transporte escolar <br> para o IFC de forma <br> segura e fácil.</p>
                </div>
                <div class="footer-section">
                    <h2>Serviços</h2>
                    <ul>
                        <li>Para Motoristas</li>
                        <li>Para Estudantes</li>
                        <li>Para Empresas</li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h2>Empresa</h2>
                    <ul>
                        <li>Sobre nós</li>
                        <li>Equipe</li>
                        <li>Contato</li>
                    </ul>
                </div>
                <div class="footer-section-icons">
                    <h2>Redes Sociais</h2>
                    <ul class="social-icons">
                        <li><a href="#"><span class="mdi mdi-instagram"></span></a></li>
                        <li><a href="#"><span class="mdi mdi-facebook"></span></a></li>
                        <li><a href="#"><span class="mdi mdi-twitter"></span></a></li>
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
    background-color: #1863A2;
    color: #e4e4e4;
    font-family: 'Segoe UI', sans-serif;
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
    padding-bottom: 30px;
    border-bottom: 2px solid #e4e4e4;
}

.footer-section img {
    width: 120px;
    margin-bottom: 10px;
}

.footer-section h2 {
    font-size: 1.8em;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
}

.footer-section ul, .footer-section-icons ul {
    list-style: none;
    padding: 0;
}

.footer-section ul li, .footer-section-icons ul {
    cursor: pointer;
}

.footer-section ul li:hover {
    text-decoration: underline;
}

.footer-section p {
    font-size: 1em;
    line-height: 1.6;
}

.social-icons {
    display: flex;
    gap: 15px;
    padding-left: 0;
}

.footer-content .footer-section-icons h2 {
    margin-bottom: 5px;
}

.social-icons li a {
    font-size: 2em;
    color: #e4e4e4;
}

.footer-bottom {
    text-align: center;
    margin-top: 25px;
    font-size: 0.9em;
    color: #cfcfcf;
}
</style>
