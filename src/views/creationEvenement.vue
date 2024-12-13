<script setup lang="ts">

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
          <span class="texte-description color-blue">Le nom de la ville dans laquelle se déroulera l’événement</span>
          <input type="text" v-model="nom" required>
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
