<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id
</script>

<template>
  <p>Ceci est la vue pour l'événement {{id}}</p>
</template>

<style scoped>

</style>
