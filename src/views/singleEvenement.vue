<script setup lang="ts">
import {useRoute} from 'vue-router'
import type {Evenement} from "@/types";
import {onMounted, ref, type Ref} from "vue";
import {afficherCarteGoogleMaps} from "@/assets/js/gestionGoogleMapsAPI.js";


const route = useRoute()
const id = route.params.id

const evenement: Ref<Evenement> = ref(
  {
    id: 1,
    nom: "Lyon",
    dateDebut: "24/12/2024",
    dateFin: "30/12/2024",
    lieu: "99 avenue d'Occitanie, 34000 Montpellier",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus et lectus vitae facilisis. Pellentesque a nulla hendrerit, maximus nisi eu, vehicula tellus. Duis interdum purus elementum tincidunt aliquam. Donec ipsum odio, tincidunt eget ipsum sit amet, pharetra tristique tortor. Suspendisse vestibulum ullamcorper nunc, sed sodales arcu feugiat non. Maecenas ut nunc in felis euismod tincidunt et in tellus. Sed magna augue, viverra vitae neque ultricies, fermentum ullamcorper odio. Quisque elementum lacus eu urna convallis dictum. Fusce eu mattis sapien. Cras semper accumsan sapien in vestibulum. Nam congue odio quis nibh tincidunt, ac facilisis lectus cursus. Proin pellentesque neque vel malesuada lacinia.",
    prix: 0,
  });

onMounted(async () => {
  await afficherCarteGoogleMaps(evenement.value.lieu, `map`);
});

</script>

<template>
  <section class="presentation-single-evenement">
    <div>
      <div class="indicator"><span></span>Événement</div>
      <h1 class="grand-titre"><span class="color-blue">Intervachettes</span> {{ evenement.nom }}</h1>
      <span class="texte-gris-simple">Parcourez les informations d’un événement, inscrivez vous pour y participer ou y assister.</span>
      <img src="@/assets/img/deco-points.png" alt="" class="deco">
      <div class="bouton fond-bleu"><i class="fi fi-rr-angle-left"></i>Revenir en arrière</div>
    </div>
    <div id="map"></div>
  </section>
</template>

<style scoped>
@import "@/assets/styles/styleSingleEvenement.css";
</style>
