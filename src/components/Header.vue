<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const headerRef = ref<HTMLElement>()
const isScrolled = ref(false)

const handleScroll = () => {
  const scrollY = window.scrollY
  isScrolled.value = scrollY > 50

  if (headerRef.value) {
    if (scrollY > 50) {
      headerRef.value.style.backdropFilter = 'blur(10px)'
      headerRef.value.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
    } else {
      headerRef.value.style.backdropFilter = 'none'
      headerRef.value.style.backgroundColor = 'rgba(255, 255, 255, 0)'
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header ref="headerRef" :class="{ scrolled: isScrolled }">
    <RouterLink to="/" class="title">Crypto Vue App</RouterLink>
    <div class="routes">
      <RouterLink to="/" active-class="active-route">Home</RouterLink>
      <RouterLink to="/about" active-class="active-route">About</RouterLink>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

header .title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #34d399;
  text-decoration: none;
}

header .routes {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 1rem;
  margin-right: 1rem;
}

header div a {
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s ease;
}

header .routes a:hover {
  font-weight: bold;
}

header .routes a.active-route {
  color: #34d399 !important;
  font-weight: bold;
}
</style>
