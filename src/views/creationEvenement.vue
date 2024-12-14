<script setup lang="ts">
import {ref} from "vue";

const nom = ref("");
const description = ref("");
const adresse = ref("");
const dateDebut = ref("");
const dateFin = ref("");

const envoyer = () => {
  /* TODO
  apiStore.createRessource('evenements', {message: message.value})
    .then(() => {
      notify({
        type: 'success',
        title: 'Événement créé avec succès',
      });
      message.value = '';
      emit('updated');
    });
   */
}


</script>

<template>
  <div class="creation-evenement">
    <img src="@/assets/img/fond-creation.png" alt="fond" class="fond-creation"/>

    <div class="presentation-creation">
      <div>
        <div class="indicator"><span></span>Créer un événement</div>
        <h1 class="grand-titre">Organisez votre <br><span class="color-blue">Intervachettes</span></h1>
        <span class="texte-gris-simple">Remplissez ce formulaire pour créer votre événement Intervachettes.</span>
        <div onclick="revenirEnArriere()" class="bouton fond-bleu"><i class="fi fi-rr-angle-left"></i>Revenir en arrière
        </div>
      </div>
      <img src="@/assets/img/illu-creation.png" alt="fond" class="illu"/>
    </div>


    <section class="wrapForm">
      <div class="entete-form">
        <img src="@/assets/img/intervachettes_logo.png" alt="logo" class="logo"/>
      </div>

      <form @submit.prevent="envoyer">

        <label>
          <span class="texte-gris-simple">Nom de l'événement</span>
          <span class="texte-description color-blue"><i class="fi fi-rr-info"></i> Le nom de la ville dans laquelle se déroulera l’événement</span>
          <input type="text" v-model="nom" placeholder="Montpellier" required>
        </label>

        <label>
          <span class="texte-gris-simple">Description de l'événement</span>
          <span class="texte-description color-blue"><i class="fi fi-rr-info"></i> Doit contenir le nombre d’équipes qui vont participer, et le
            nombre de spectateurs maximal, et d'autres informations sur l'événement.</span>
          <textarea v-model="description" placeholder="“Venez à Montpellier pour voir les équipes de Béziers, Montpellier, Nîmes et Narbonne s’affronter ! 2000 spectateurs maximum, 15 participants par ville maximum”." required></textarea>
        </label>

        <label>
          <span class="texte-gris-simple">Adresse de l'événement</span>
          <span class="texte-description color-blue"><i class="fi fi-rr-info"></i> L'adresse complète de l'emplacement dans lequel se déroulera l'événement</span>
          <input type="text" v-model="nom" placeholder="99 Avenue d'Occitanie, 34000 Montpellier" required>
        </label>

        <label>
          <span class="texte-gris-simple">Date et heure de début de l'événement</span>
          <input type="datetime-local" v-model="dateDebut" required>
        </label>

        <label>
          <span class="texte-gris-simple">Date et heure de fin de l'événement</span>
          <input type="datetime-local" v-model="dateFin" required>
        </label>

        <div class="wrap-bouton">
          <button class="bouton icon-animation" type="submit">Créer l'événement<i
            class="fi fi-rr-arrow-right"></i></button>
        </div>
      </form>
    </section>

  </div>
</template>

<style scoped>
@import "@/assets/styles/styleCreationEvenement.css";
</style>
