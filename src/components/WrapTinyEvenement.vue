<script setup lang="ts">
import type {Evenement} from "@/types";
import router from "@/router";
import GoogleMaps from "@/components/GoogleMaps.vue";
import {apiStore} from "@/util/apiStore";
import {notify} from "@kyvg/vue3-notification";

const props = defineProps<{ evenement: Evenement }>();

function redirigerVersSingleEvenement() {
  console.log(props.evenement.adresse);
  router.push({name: 'singleEvenement', params: {id: props.evenement.id}});
}

const titre = props.evenement.adresse.split(' ').pop();
const adresseEnTableau = [props.evenement.adresse];

function extractIdFromUri(uri: string): number {
  const parts = uri.split('/');
  return parseInt(parts[parts.length - 1]);
}

function inscrireUtilisateur(evenementUri: string) {
  const evenementId = extractIdFromUri(evenementUri);

  if (apiStore.estConnecte) {
    const data = {
      participant: `/InterVachettesAPI/public/api/utilisateurs/${apiStore.utilisateurConnecte}`,
      evenements: `/InterVachettesAPI/public/api/inter_vachettes/${evenementId}`
    };
    console.log('test');
    console.log(data);
    console.log(evenementId);
    apiStore.createRessource("inscriptions", data)
      .then(response => {
        if (response.success) {
          notify({
            type: 'success',
            title: 'Inscription réussie',
            text: 'Vous êtes inscrit à l\'événement.',
            group: 'custom-template'
          });
        } else {
          notify({
            type: 'warn',
            title: 'Inscription échouée',
            text: response.error || 'Une erreur est survenue.',
            group: 'custom-template'
          });
        }
      })
      .catch(error => {
        notify({
          type: 'error',
          title: 'Erreur',
          text: `Une erreur est survenue : ${error.message || 'Action impossible'}`,
          group: 'custom-template'
        });
      });
  } else {
    notify({
      type: 'warn',
      title: 'Utilisateur non connecté',
      text: 'Veuillez vous connecter pour vous inscrire à un événement.',
      group: 'custom-template'
    });
  }
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
            <span class="chiffre">10</span>
            <span>Places restantes</span>
          </span>
        <span class="chiffre-cle">
            <span class="chiffre">27</span>
            <span>Candidats inscrits</span>
          </span>
      </div>
      <div @click="redirigerVersSingleEvenement" class="bouton icon-animation">En savoir plus<i class="fi fi-rr-arrow-right"></i></div>
      <div @click="inscrireUtilisateur(evenement['@id'])" class="bouton icon-animation">S'inscrire<i class="fi fi-rr-arrow-right"></i></div>

    </div>
    <GoogleMaps  :adresses=" adresseEnTableau " :id-div="'map' + evenement.id" />
  </div>
</template>

<style scoped>
@import "@/assets/styles/styleTinyEvenement.css";
</style>
