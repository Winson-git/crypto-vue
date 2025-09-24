<script setup lang="ts">
import Hero from '@/components/Hero.vue'
import CryptoList from '../components/CryptoList.vue'
</script>

<template>
  <main>
    <Hero
      backgroundImage="/background.png"
      title="Bitcoin Calculator"
      subtitle="Calculate your crypto portfolio value and see how your investments are performing."
    />
    <CryptoList />
  </main>
</template>

<style scoped></style>
