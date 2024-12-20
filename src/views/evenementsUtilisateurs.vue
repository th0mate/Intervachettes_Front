<script setup lang="ts">
import {ref, type Ref} from "vue";
import WrapTinyEvenement from "@/components/WrapTinyEvenement.vue";
import type {Inscription} from "@/types";
import '@/assets/styles/styleListeEvenements.css';
import {apiStore} from "@/util/apiStore";




const inscriptions: Ref<Inscription[]> = ref([]);

function chargerEvenements()
{
  if(apiStore.estConnecte)
  {
    apiStore.getRessourceConnected('utilisateurs/' + apiStore.utilisateurConnecte.id + '/inscriptions')
      .then(reponseJSON => {
        inscriptions.value = reponseJSON['member'];
      });
  }
}

chargerEvenements();

</script>

<template>

  <section class="presentation-liste">
    <img src="@/assets/img/illuListe.png" alt="Illustation">
    <div>
      <div class="indicator"><span></span>Tous Les Événements</div>
      <h1 class="grand-titre">Trouvez un <span class="color-blue">événement</span></h1>
      <span class="texte-gris-simple">Trouvez un événement Intervachettes proche de chez vous, pour y participer ou y assister !</span>
      <img src="@/assets/img/deco-points.png" alt="" class="deco">
    </div>
  </section>


  <section class="wrap-liste">
    <div class="liste-evenements" v-for="inscription in inscriptions" :key="inscription.evenements.id">
      <WrapTinyEvenement :evenement="inscription.evenements"/>
    </div>
  </section>

</template>

<style scoped>
@import "@/assets/styles/styleListeEvenements.css";

</style>
