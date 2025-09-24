<script setup lang="ts">
import { ref } from 'vue'
import Timeline from 'primevue/timeline'
import Card from 'primevue/card'

const events = ref([
  {
    status: 'Project Start',
    step: 'Understanding Vue',
    icon: 'pi pi-code',
    color: '#34d399',
    description: [
      'Learn the basics of Vue.js and Composition API',
      'Compare Vue with React and Next.js',
      'Sketch UI/UX workflow and initial design',
      'Research PrimeVue as the component library',
    ],
  },
  {
    status: 'API Integration',
    step: 'Connecting to CoinGecko',
    icon: 'pi pi-link',
    color: '#3b82f6',
    img: '/CoinGecko.png',
    description: [
      'Apply for CoinGecko API key',
      'Store the key in a secure .env file',
      'Fetch live Bitcoin price data',
      'Add error handling for failed API calls and caching',
    ],
  },
  {
    status: 'Responsive Design',
    step: 'Responsive Design & Components',
    icon: 'pi pi-mobile',
    color: '#8b5cf6',
    description: [
      'Implement a mobile-first design',
      'Build reusable components (Hero, Calculator, etc.)',
      'Use Vue reactivity (ref, computed, watch)',
      'Add dynamic backgrounds for better UX',
    ],
  },
  {
    status: 'Deployment',
    step: 'Deployment & QA',
    icon: 'pi pi-check',
    color: '#f59e0b',
    description: [
      'Do null checks and input validation',
      'Deploy to Vercel with caching',
      'QA test across devices',
      'Verify responsiveness in production',
    ],
  },
])
</script>

<template>
  <div class="timeline-container">
    <Timeline :value="events" align="alternate" class="customized-timeline">
      <template #marker="slotProps">
        <span class="timeline-marker" :style="{ backgroundColor: slotProps.item.color }">
          <i :class="slotProps.item.icon"></i>
        </span>
      </template>
      <template #content="slotProps">
        <Card class="timeline-card">
          <template #title>
            {{ slotProps.item.status }}
          </template>
          <template #subtitle>
            {{ slotProps.item.step }}
          </template>
          <template #content>
            <img
              v-if="slotProps.item.img"
              :src="`${slotProps.item.img}`"
              :alt="slotProps.item.name"
              width="200"
              class="shadow-sm"
            />
            <ul>
              <li v-for="(point, index) in slotProps.item.description" :key="index">
                {{ point }}
              </li>
            </ul>
          </template>
        </Card>
      </template>
    </Timeline>
  </div>
</template>

<style scoped>
.timeline-container {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.timeline-marker {
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.timeline-card {
  margin-top: 1rem;
}

.timeline-card ul {
  margin: 0.5rem 0;
  padding-left: 1.2rem;
  list-style-type: disc;
}

.timeline-card li {
  margin-bottom: 0.3rem;
  line-height: 1.4;
}

@media screen and (max-width: 960px) {
  :deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row;
    }

    .p-timeline-event:nth-child(even) .p-timeline-event-content {
      text-align: left;
    }

    .p-timeline-event-opposite {
      flex: 0;
    }
  }
}
</style>
