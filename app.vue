<template>
  <div>
    <!-- <NuxtRouteAnnouncer /> -->
    <button @click="fetchHello">Fetch Hello</button>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const message = ref('')
const fetchHello = async () => {
  message.value = await $fetch('/api/hello')
}
</script>
