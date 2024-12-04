<script setup lang="ts">

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
    <div class="entete-liste">
      <div class="presentation-liste-evenements">
        <div class="indicator"><span></span>Liste Des Événements</div>
        <h1 class="grand-titre">Liste des <span class="color-blue">événements</span></h1>
        <img src="@/assets/img/deco-points.png" alt="" class="deco">
      </div>

      <div class="recherche-evenement">
        <img src="@/assets/img/decor-recherche.png" alt="">
        <h1 class="grand-titre">Recherche par ville</h1>
        <div class="wrap-recherche">
          <input type="text" placeholder="Montpellier">
          <i class="fi fi-rr-search"></i>
        </div>
      </div>
    </div>

    <div class="liste-evenements">
      <h3>TODO LISTE</h3>
    </div>
  </section>

</template>

<style scoped>
@import "@/assets/styles/styleListeEvenements.css";

</style>
