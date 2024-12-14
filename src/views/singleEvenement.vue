<script setup lang="ts">
import {useRoute} from 'vue-router'
import type {Evenement} from "@/types";
import {onMounted, ref, type Ref} from "vue";
import GoogleMaps from "@/components/GoogleMaps.vue";


const route = useRoute()
const id = route.params.id

//TODO en attendant le lien avec l'API
const evenement: Ref<Evenement> = ref(
  {
    id: 1,
    nom: "Montpellier",
    dateDebut: "24/12/2024",
    dateFin: "30/12/2024",
    lieu: "99 avenue d'Occitanie, 34000 Montpellier",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus et lectus vitae facilisis. Pellentesque a nulla hendrerit, maximus nisi eu, vehicula tellus. Duis interdum purus elementum tincidunt aliquam. Donec ipsum odio, tincidunt eget ipsum sit amet, pharetra tristique tortor. Suspendisse vestibulum ullamcorper nunc, sed sodales arcu feugiat non. Maecenas ut nunc in felis euismod tincidunt et in tellus. Sed magna augue, viverra vitae neque ultricies, fermentum ullamcorper odio. Quisque elementum lacus eu urna convallis dictum. Fusce eu mattis sapien. Cras semper accumsan sapien in vestibulum. Nam congue odio quis nibh tincidunt, ac facilisis lectus cursus. Proin pellentesque neque vel malesuada lacinia.",
    prix: 0,
  });

</script>

<template>
  <div class="singleEvenement">
    <section class="presentation-single-evenement">
      <div>
        <div class="indicator"><span></span>Événement</div>
        <h1 class="grand-titre"><span class="color-blue">Intervachettes</span> {{ evenement.nom }}</h1>
        <span class="texte-gris-simple">Parcourez les informations d’un événement, inscrivez vous pour y participer ou y assister.</span>
        <span class="texte-gris-simple"><i class="fi fi-rr-marker color-blue"></i> {{ evenement.lieu }}</span>
        <img src="@/assets/img/deco-points.png" alt="" class="deco">
        <div onclick="revenirEnArriere()" class="bouton fond-bleu"><i class="fi fi-rr-angle-left"></i>Revenir en arrière</div>
      </div>
      <GoogleMaps id="map" :adresses=" [evenement.lieu] " :id-div="'map'"/>
    </section>


    <section class="presentation-description">
      <div class="indicator"><span></span>Description</div>
      <h1 class="grand-titre">Les mots de <br><span class="color-blue">l'organisateur</span></h1>

      <div>
        <i class="fi fi-rr-quote-right reverse color-blue"></i>
        <span class="texte-gris-simple">{{ evenement.description }}</span>
        <i class="fi fi-rr-quote-right color-blue"></i>
      </div>
    </section>

    <section class="autres-infos-event">
      <div class="autres-infos">
        <div class="indicator"><span></span>Participation</div>
        <h1 class="grand-titre">Vous aussi, <br><span class="color-blue">participez</span></h1>

        <span class="texte-gris-simple">
          Vous aussi, inscrivez vous à l'événement en tant que candidat, pour vous affronter contre une autre équipe ! Vous pouvez également vous renseignez sur cet événement, pour y assister en tant que spectateur.
        </span>

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

        <span class="texte-gris-simple"><i
          class="fi fi-rr-marker color-blue"></i> Du {{ evenement.dateDebut }} au {{ evenement.dateFin }}</span>
        <span class="texte-gris-simple"><i class="fi fi-rr-calendar-clock color-blue"></i> {{ evenement.lieu }}</span>
        <div @click="redirigerVersSingleEvenement" class="bouton icon-animation">Inscription à l'événement<i class="fi fi-rr-arrow-right"></i></div>
      </div>

      <div class="pages-vertes">
        <img src="@/assets/img/deco-infos-event.png" alt="deco" class="deco">
        <div class="infos">
          <h1>Organisé par :</h1>
          <div class="infos-organisateur">
            <div>
              <i class="fi fi-rr-user"></i>
              <span class="texte-gris-simple">Jérôme Lecompte</span>
            </div>
            <div @click="redirigerVersSingleEvenement" class="bouton icon-animation">Voir sur PagesVertes<i class="fi fi-rr-arrow-right"></i></div>
          </div>
        </div>
      </div>

    </section>

  </div>
</template>

<style scoped>
@import "@/assets/styles/styleSingleEvenement.css";
</style>
