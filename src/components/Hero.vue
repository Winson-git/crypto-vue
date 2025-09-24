<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface HeroProps {
  backgroundImage: string
  title: string
  subtitle: string
}

defineProps<HeroProps>()

const isLoaded = ref(false)

onMounted(() => {
  // Trigger animations after component mounts
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<template>
  <section class="hero">
    <img
      :src="backgroundImage"
      :alt="title"
      class="hero-background"
      :class="{ loaded: isLoaded }"
    />
    <div class="hero-content" :class="{ loaded: isLoaded }">
      <h1 class="hero-title" :class="{ loaded: isLoaded }">{{ title }}</h1>
      <p class="hero-subtitle" :class="{ loaded: isLoaded }">{{ subtitle }}</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0;
  transform: scale(1.1);
  transition: all 1.2s ease-out;
}

.hero-background.loaded {
  opacity: 1;
  transform: scale(1);
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  padding: 1rem;
  width: 100%;
  opacity: 0;
  transition: opacity 0.8s ease-out 0.3s;
}

.hero-content.loaded {
  opacity: 1;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.8s ease-out 0.5s;
}

.hero-title.loaded {
  transform: translateY(0);
  opacity: 1;
}

.hero-subtitle {
  font-size: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.8s ease-out 0.7s;
}

.hero-subtitle.loaded {
  transform: translateY(0);
  opacity: 1;
}

@media (prefers-reduced-motion: no-preference) {
  .hero-background {
    transition:
      all 1.2s ease-out,
      transform 0.1s linear;
  }
}
</style>
