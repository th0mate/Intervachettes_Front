<script setup lang="ts">
import type {Evenement} from "@/types";
import {onMounted} from 'vue';
import router from "@/router";
import {afficherCarteGoogleMaps} from "@/assets/js/gestionGoogleMapsAPI.js";

const props = defineProps<{ evenement: Evenement }>();

onMounted(async () => {
  await afficherCarteGoogleMaps(props.evenement.lieu, `map${props.evenement.id}`);
});

function redirigerVersSingleEvenement() {
  router.push({name: 'singleEvenement', params: {id: props.evenement.id}});
}

</script>

<template>
  <div class="tinyEvenemenent">
    <div class="wrap-texte">
      <h1 class="grand-titre"><span class="color-blue">Intervachettes</span> {{ evenement.nom }}</h1>
      <span class="texte-gris-simple description"><i
        class="fi fi-rr-quote-right reverse color-blue"></i> {{ evenement.description.substring(0, 300) + '...' }} <i
        class="fi fi-rr-quote-right color-blue"></i></span>
      <span class="texte-gris-simple"><i class="fi fi-rr-calendar-clock color-blue"></i> Du {{ evenement.dateDebut }} au {{
          evenement.dateFin
        }}</span>
      <span class="texte-gris-simple"><i class="fi fi-rr-marker color-blue"></i> {{ evenement.lieu }}</span>
      <div class="chiffres-cles">
          <span class="chiffre-cle">
            <span class="chiffre">10</span>
            <span>Places restantes</span>
          </span>
        <span class="chiffre-cle">
            <span class="chiffre">27</span>
            <span>Candidats inscrits</span>
          </span>
      </div>
      <div @click="redirigerVersSingleEvenement" class="bouton icon-animation">En savoir plus<i class="fi fi-rr-arrow-right"></i></div>
    </div>
    <div :id="'map' + evenement.id" class="map"></div>
  </div>
</template>

<style scoped>
@import "@/assets/styles/styleTinyEvenement.css";
</style>
