<script setup lang="ts">
import { ref } from 'vue'
import { Form } from '@primevue/forms'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const props = defineProps<{
  currentPrice: number
}>()

const amount = ref<string>('')
const buyPrice = ref<string>('')
const result = ref<number | null>(null)
const showResult = ref(false)

const calculate = () => {
  const amountNum = parseFloat(amount.value)
  const buyPriceNum = parseFloat(buyPrice.value)

  if (amountNum && buyPriceNum) {
    result.value = props.currentPrice * amountNum - buyPriceNum * amountNum
    showResult.value = true
  }
}

const getBackgroundImage = () => {
  if (!showResult.value || result.value === null) {
    return 'url(/unknow.jpg)'
  }
  return result.value >= 0 ? 'url(/profitBg.jpg)' : 'url(/lossBg.jpg)'
}
</script>

<template>
  <div class="calculator">
    <div class="calculator-container">
      <Form>
        <div>Enter your crypto portfolio details</div>
        <FormField name="amount" class="w-full">
          <FloatLabel variant="on">
            <InputText
              id="amount"
              v-model="amount"
              type="number"
              step="any"
              min="0"
              pattern="[0-9]*\.?[0-9]*"
              inputmode="decimal"
              class="w-full"
            />
            <label for="amount">Amount owned</label>
          </FloatLabel>
        </FormField>

        <FormField name="buyPrice" class="w-full">
          <FloatLabel variant="on">
            <InputText
              id="buyPrice"
              v-model="buyPrice"
              type="number"
              step="0.01"
              min="0"
              pattern="[0-9]*\.?[0-9]*"
              inputmode="decimal"
              class="w-full"
            />
            <label for="buyPrice">Purchase price (USD)</label>
          </FloatLabel>
        </FormField>

        <Button @click="calculate" class="w-full">Calculate</Button>
      </Form>

      <div
        class="result"
        :style="{
          backgroundImage: getBackgroundImage(),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '0.5rem',
        }"
      >
        <div class="result-overlay">
          <div v-if="showResult && result !== null">
            <h3>Profit/Loss:</h3>
            <div
              :style="{
                color: result >= 0 ? 'white' : 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }"
            >
              {{ result >= 0 ? '+' : '' }}{{ result.toLocaleString() }} USD
            </div>
          </div>
          <div v-else>
            <h3>Key in your crypto portfolio details to see your profit/loss</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.w-full {
  width: 100%;
}

.calculator {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.calculator-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
}

.calculator form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: black;
  border-radius: 0.5rem;
  padding: 2rem;
}

.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.result-overlay {
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 0.5rem;
  color: white;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media (min-width: 768px) {
  .calculator-container {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
}
</style>
