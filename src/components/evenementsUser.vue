<script setup lang="ts">
import {ref, type Ref} from "vue";
import type {Evenement, Inscription, Utilisateur, ApiResponse} from "@/types";
import {apiStore} from "@/util/apiStore";
import router from "@/router";

const props = defineProps<{ utilisateur: Utilisateur }>();

const inscriptions: Ref<Inscription[]> = ref([]);
const organisations: Ref<Evenement[]> = ref([]);

function chargerEvenements() {
  apiStore.getRessourceConnected('utilisateurs/' + props.utilisateur.id + '/inscriptions')
    .then(reponseJSON => {
      const response = reponseJSON as ApiResponse;
      if (Array.isArray(response['member'])) {
        inscriptions.value = response['member'] as Inscription[];
      } else {
        console.error("Unexpected response format", response);
      }
    });
  apiStore.getRessourceConnected('utilisateurs/' + props.utilisateur.id + '/intervachettesorganises')
    .then(reponseJSON => {
      const response = reponseJSON as ApiResponse;
      if (Array.isArray(response['member'])) {
        organisations.value = response['member'] as Evenement[];
      } else {
        console.error("Unexpected response format", response);
      }
    });
}

chargerEvenements();
</script>
<template>
  <div class="actionCompte">
    <span class="texte-gris-simple">Participations à des événements</span>
    <div v-if="inscriptions.length > 0">
      <div class="liste-utilisateur" v-for="inscription in inscriptions" :key="inscription.evenements.id">
        <div class="evenement-utilisateur">
          <div>
            <img src="@/assets/img/intervachettes_icon.png" alt="intervachettes" class="icone-evenement">
            <h1 class="grand-titre"><span class="color-blue">Intervachettes</span>
              {{ inscription.evenements.adresse.split(' ').pop() }}</h1>
          </div>
          <div @click="router.push({name: 'singleEvenement', params: {id: inscription.evenements.id}})" class="bouton icon-animation">Voir plus<i class="fi fi-rr-arrow-right"></i></div>
        </div>
      </div>
    </div>
    <div class="erreur" v-else>
      <i class="fi fi-rr-exclamation icone-erreur"></i>
      <h1 class="color-blue">Aucune inscription pour le moment</h1>
    </div>
    <br>

    <span class="texte-gris-simple">Événements organisés</span>
    <div v-if="organisations.length > 0">
      <div class="liste-utilisateur" v-for="evenement in organisations" :key="evenement.id">
        <div class="evenement-utilisateur">
          <div>
            <img src="@/assets/img/intervachettes_icon.png" alt="intervachettes" class="icone-evenement">
            <h1 class="grand-titre"><span class="color-blue">Intervachettes</span>
              {{ evenement.adresse.split(' ').pop() }}</h1>
          </div>
          <div @click="router.push({name: 'singleEvenement', params: {id: evenement.id}})" class="bouton icon-animation">Voir plus<i class="fi fi-rr-arrow-right"></i></div>
        </div>
      </div>
    </div>
    <div class="erreur" v-else>
      <i class="fi fi-rr-exclamation icone-erreur"></i>
      <h1 class="color-blue">Aucun événement</h1>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/styles/actionsCompte.css";
</style>
