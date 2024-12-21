<script setup lang="ts">
import {ref, type Ref} from "vue";
import type {Evenement, Inscription, Utilisateur} from "@/types";
import {apiStore} from "@/util/apiStore";
import router from "@/router";

defineProps<{ utilisateur: Utilisateur }>();

const inscriptions: Ref<Inscription[]> = ref([]);
const organisations: Ref<Evenement[]> = ref([]);

console.log(utilisateur);
function chargerEvenements() {
  apiStore.getRessourceConnected('utilisateurs/' + utilisateur.id + '/inscriptions')
    .then(reponseJSON => {
      inscriptions.value = reponseJSON['member'];
    });
  apiStore.getRessourceConnected('utilisateurs/' + utilisateur.id + '/intervachettesorganises')
    .then(reponseJSON => {
      organisations.value = reponseJSON['member'];
    });
}

function redirigerVersSingleEvenement(idEvenement) {
  router.push({name: 'singleEvenement', params: {id: idEvenement}});
}

chargerEvenements();
</script>
<template>
  <div class="actionCompte">
    <span class="texte-gris-simple">Participations à des événements</span>
    <div class="liste-utilisateur" v-if="inscriptions.length > 0" v-for="inscription in inscriptions"
         :key="inscription.evenements.id">
      <div class="evenement-utilisateur">
        <div>
          <img src="@/assets/img/intervachettes_icon.png" alt="intervachettes" class="icone-evenement">
          <h1 class="grand-titre"><span class="color-blue">Intervachettes</span>
            {{ inscription.evenements.adresse.split(' ').pop() }}</h1>
        </div>
        <div @click="redirigerVersSingleEvenement(inscription.evenements.id)" class="bouton icon-animation">En savoir
          plus<i class="fi fi-rr-arrow-right"></i></div>
      </div>
    </div>
    <div class="erreur" v-else>
      <i class="fi fi-rr-exclamation icone-erreur"></i>
      <h1 class="color-blue">Aucune inscription pour le moment</h1>
    </div>
    <br>

    <span class="texte-gris-simple">Événements organisés</span>
    <div class="liste-utilisateur" v-if="inscriptions.length > 0" v-for="evenement in organisations"
         :key="organisations.evenements.id">
      <div class="evenement-utilisateur">

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
