<script setup lang="ts">
import { ref, type Ref } from "vue";
import WrapTinyEvenement from "@/components/WrapTinyEvenement.vue";
import type { Evenement } from "@/types";

//TODO en attendant la liaison à l'API
const evenements: Ref<Evenement[]> = ref([
  {
    id: 1,
    nom: "Lyon",
    dateDebut: "24/12/2024",
    dateFin: "30/12/2024",
    lieu: "48 avenue du petit enculé, 69000 Lyon",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus et lectus vitae facilisis. Pellentesque a nulla hendrerit, maximus nisi eu, vehicula tellus. Duis interdum purus elementum tincidunt aliquam. Donec ipsum odio, tincidunt eget ipsum sit amet, pharetra tristique tortor. Suspendisse vestibulum ullamcorper nunc, sed sodales arcu feugiat non. Maecenas ut nunc in felis euismod tincidunt et in tellus. Sed magna augue, viverra vitae neque ultricies, fermentum ullamcorper odio. Quisque elementum lacus eu urna convallis dictum. Fusce eu mattis sapien. Cras semper accumsan sapien in vestibulum. Nam congue odio quis nibh tincidunt, ac facilisis lectus cursus. Proin pellentesque neque vel malesuada lacinia.",
    prix: 0,
  },
  {
    id: 2,
    nom: "Marseille",
    dateDebut: "16/05/2025",
    dateFin: "25/05/2025",
    lieu: "48 avenue de la grande salope, 13000 Marseille",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus et lectus vitae facilisis. Pellentesque a nulla hendrerit, maximus nisi eu, vehicula tellus. Duis interdum purus elementum tincidunt aliquam. Donec ipsum odio, tincidunt eget ipsum sit amet, pharetra tristique tortor. Suspendisse vestibulum ullamcorper nunc, sed sodales arcu feugiat non. Maecenas ut nunc in felis euismod tincidunt et in tellus. Sed magna augue, viverra vitae neque ultricies, fermentum ullamcorper odio. Quisque elementum lacus eu urna convallis dictum. Fusce eu mattis sapien. Cras semper accumsan sapien in vestibulum. Nam congue odio quis nibh tincidunt, ac facilisis lectus cursus. Proin pellentesque neque vel malesuada lacinia.",
    prix: 250,
  },
]);

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

    <div class="liste-evenements" v-for="evenement in evenements" :key="evenement.id">
      <WrapTinyEvenement :evenement="evenement"/>
    </div>
  </section>

</template>

<style scoped>
@import "@/assets/styles/styleListeEvenements.css";

</style>
