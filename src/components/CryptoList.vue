<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import { getPrice } from '@/services/coingecko'
import ProfitCalculator from '@/components/ProfitCalculator.vue'

interface Crypto {
  id: string
  name: string
  price: number
}

const cryptoList = ref<Crypto[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const price = await getPrice()
    console.log(price)

    cryptoList.value = Object.entries(price).map(([id, data]) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      price: data.usd,
    }))
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch crypto data'
    console.error('Error fetching crypto data:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="crypto-list">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="cryptoList.length === 0">No crypto data available</div>

    <div v-else class="">
      <div class="crypto-grid">
        <div v-for="crypto in cryptoList" :key="crypto.id" class="crypto-card">
          <div class="crypto-title-container">
            <div class="crypto-title">
              <div class="crypto-name">{{ crypto.name.toUpperCase() }}:</div>
              <div class="crypto-price">${{ crypto.price.toLocaleString() }}</div>
            </div>
            <p>Data from CoinGecko</p>
          </div>

          <ProfitCalculator :currentPrice="crypto.price" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.crypto-list {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.crypto-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.crypto-title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
}

.crypto-title-container p {
  font-size: 1rem;
  font-weight: 400;
  color: #34d399;
}

.crypto-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.crypto-name {
  font-size: 2rem;
  font-weight: 600;
  color: white;
}

.crypto-price {
  font-size: 2rem;
  font-weight: 600;
  color: white;
}

@media (min-width: 768px) {
  .crypto-title-container {
    margin-bottom: 2rem;
  }
}
</style>
