<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="footer-content">
      <p>© {{ currentYear }} Crypto Vue App</p>
      <div class="powered-by">
        <span>Powered by</span>
        <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer">
          <img src="/CoinGecko.png" alt="CoinGecko Logo" class="coingecko-logo" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  background: #1a1a1a;
  padding: 1rem;
  color: #fff;
  border-top: 1px solid #333;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

p {
  font-size: 0.9rem;
  margin: 0;
}

.powered-by {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.coingecko-logo {
  height: 30px;
  width: auto;
  transition: opacity 0.2s ease;
  display: block;
}

.coingecko-logo:hover {
  opacity: 0.8;
}

@media (max-width: 600px) {
  .footer-content {
    justify-content: center;
    text-align: center;
  }
}
</style>
