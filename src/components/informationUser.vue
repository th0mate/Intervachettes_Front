<script setup lang="ts">
import type {Utilisateur} from '@/types';
defineProps<{utilisateur: Utilisateur}>();
</script>

<template>
  <h2>Informations de l'utilisateur</h2>
  <p><strong>Login :</strong> {{ utilisateur.login || 'N/A' }}</p>
  <p><strong>Nom :</strong> {{ utilisateur.nom || 'N/A' }}</p>
  <p><strong>Prénom :</strong> {{ utilisateur.prenom || 'N/A' }}</p>
  <p><strong>Adresse mail :</strong> {{ utilisateur.adresseMail || 'N/A' }}</p>
  <p><strong>Code PagesVertes :</strong> {{ utilisateur.code_pages_vertes || 'N/A' }}</p>
  <p><strong>Description :</strong> {{ utilisateur.biographie || 'N/A' }}</p>


</template>

<style scoped>
h2 {
  margin-bottom: 1rem;
}

p {
  margin: 0.5rem 0;
}
</style>
