<script setup lang="ts">
import type {Utilisateur} from '@/types';

const props = defineProps<{ utilisateur: Utilisateur }>();
import {apiStore} from "@/util/apiStore";
import {ref} from "vue";

function redirigerPagesVertes() {
  //TODO
  window.open('https://www.pagesvertes.com', '_blank');
}

const loaded = ref(false);

apiStore.refresh();

loaded.value = true;
</script>

<template>
  <div class="actionCompte" v-if="loaded">
    <h1 class="grand-titre" v-if="!apiStore.utilisateurConnecte || apiStore.utilisateurConnecte.id === props.utilisateur.id">Mon <span class="color-blue">compte</span>
    </h1>
    <h1 class="grand-titre" v-else>Profil de <span class="color-blue">{{ props.utilisateur.login }}</span></h1>
    <br>
    <div class="details-compte">
      <div v-if="!apiStore.utilisateurConnecte || apiStore.utilisateurConnecte.id !== props.utilisateur.id" class="pages-vertes" @click="redirigerPagesVertes">
        <img src="@/assets/img/pages_vertes.png" alt="pages vertes" class="icone-pages-vertes">
        <span class="texte-gris-simple">Voir sur PagesVertes</span>
      </div>
      <span class="texte-gris-simple"><span class="color-blue">Login :</span> {{ props.utilisateur.login || 'N/A' }}</span>
      <span class="texte-gris-simple"><span class="color-blue">Nom :</span> {{ props.utilisateur.nom || 'N/A' }}</span>
      <span class="texte-gris-simple"><span class="color-blue">Prénom :</span> {{ props.utilisateur.prenom || 'N/A' }}</span>
      <span class="texte-gris-simple"><span class="color-blue">Adresse mail :</span> {{ props.utilisateur.adresseMail || 'N/A' }}</span>
      <span class="texte-gris-simple"><span class="color-blue">Code PagesVertes :</span> {{ props.utilisateur.code_pages_vertes || 'N/A' }}</span>
      <span class="texte-gris-simple"><span class="color-blue">Biographie :</span> {{ props.utilisateur.biographie || 'N/A' }}</span>
    </div>
  </div>


</template>

<style scoped>
@import "@/assets/styles/actionsCompte.css";
</style>
