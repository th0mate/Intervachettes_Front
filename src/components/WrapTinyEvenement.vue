<script setup lang="ts">
import type { Evenement, Inscription} from "@/types";
import router from "@/router";
import GoogleMaps from "@/components/GoogleMaps.vue";
import {ref, type Ref} from "vue";
import {apiStore} from "@/util/apiStore";

const props = defineProps<{ evenement: Evenement }>();

function redirigerVersSingleEvenement() {
  router.push({name: 'singleEvenement', params: {id: props.evenement.id}});
}

const titre = props.evenement.adresse.split(' ').pop();
const adresseEnTableau = [props.evenement.adresse];

const inscriptions: Ref<Inscription[]> = ref([]);

if(props.evenement.estPublic) {
  apiStore.getAll(`inter_vachettes/${props.evenement.id}/inscriptions`)
    .then(reponseJSON => {
      inscriptions.value = reponseJSON.member;
    })
}

</script>

<template>
  <div class="tinyEvenemenent">
    <div class="wrap-texte">
      <h1 class="grand-titre"><span class="color-blue">Intervachettes</span> {{ titre }}</h1>
      <span class="texte-gris-simple description"><i
        class="fi fi-rr-quote-right reverse color-blue"></i> {{ evenement.description.substring(0, 300) + '...' }} <i
        class="fi fi-rr-quote-right color-blue"></i></span>
      <span class="texte-gris-simple"><i class="fi fi-rr-calendar-clock color-blue"></i> Du {{ new Date(evenement.dateDebutEvenement).toLocaleString("fr") }} au
        {{ new Date(evenement.dateFinEvenement).toLocaleString("fr") }}</span>
      <span class="texte-gris-simple"><i class="fi fi-rr-marker color-blue"></i> {{ evenement.adresse }}</span>
      <div class="chiffres-cles">
          <span class="chiffre-cle">
            <span class="chiffre">{{ evenement.nbParticipantsMax - inscriptions.length }}</span>
            <span>{{ evenement.estPublic ? 'Places restantes' : 'Places Totales' }}</span>
          </span>
        <span class="chiffre-cle">
            <span class="chiffre">{{ inscriptions.length || "N/A" }}</span>
            <span>Candidats inscrits</span>
          </span>
      </div>
      <div @click="redirigerVersSingleEvenement" class="bouton icon-animation">En savoir plus<i class="fi fi-rr-arrow-right"></i></div>
    </div>
    <GoogleMaps  :adresses=" adresseEnTableau " :id-div="'map' + evenement.id" />
  </div>
</template>

<style scoped>
@import "@/assets/styles/styleTinyEvenement.css";
</style>
