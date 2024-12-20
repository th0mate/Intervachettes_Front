<script setup lang="ts">
import {ref, type Ref} from "vue";
import WrapTinyEvenement from "@/components/WrapTinyEvenement.vue";
import type {Evenement} from "@/types";
import iconPath from '@/assets/img/intervachettes_icon.png';
import '@/assets/styles/styleListeEvenements.css';
import {apiStore} from "@/util/apiStore";




//TODO en attendant la liaison à l'API
const evenements: Ref<Evenement[]> = ref([]);

function chargerEvenements()
{
  apiStore.getAll('inter_vachettes')
      .then(reponseJSON => {
        evenements.value = reponseJSON['member'];
      });
}

function afficherRecherche() {
  const fragment = document.createDocumentFragment();
  const overlay = document.createElement('div');
  overlay.style.zIndex = '9';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.addEventListener('click', () => {
    document.body.removeChild(overlay);
    document.querySelector('.recherche-complete').style.display = 'none';
  });
  fragment.appendChild(overlay);
  document.querySelector('.recherche-complete').style.display = 'flex';
  document.body.appendChild(fragment);

  completerResultatsRecherche('');
}



function completerResultatsRecherche(inputUtilisateur: string) {
  const fragment = document.createDocumentFragment();
  const resultats = document.querySelector('.resultats-recherche');
  resultats.innerHTML = '';

  evenements.value.forEach((evenement) => {
    if (evenement.adresse.toLowerCase().includes(inputUtilisateur.toLowerCase())) {
      const span = document.createElement('span');
      span.id = evenement.id;
      const img = document.createElement('img');
      img.src = iconPath;
      img.alt = 'icone';
      span.appendChild(img);
      span.appendChild(document.createTextNode(evenement.adresse));
      fragment.appendChild(span);
    }
  });

  resultats.appendChild(fragment);
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

    <div class="entete-liste">

      <div class="presentation-liste-evenements">
        <div class="indicator"><span></span>Liste Des Événements</div>
        <h1 class="grand-titre">Liste des <span class="color-blue">événements</span></h1>
        <img src="@/assets/img/deco-points.png" alt="" class="deco">
      </div>

      <div class="recherche-evenement">
        <img src="@/assets/img/decor-recherche.png" alt="">
        <h1 class="grand-titre">Recherche par ville</h1>
        <div class="fake-barre" @click="afficherRecherche">
          <i class="fi fi-rr-search"></i>
          <span>Montpellier</span>
        </div>
      </div>

    </div>

    <div class="liste-evenements" v-for="evenement in evenements" :key="evenement.id">
      <WrapTinyEvenement :evenement="evenement"/>
    </div>
  </section>

  <div class="recherche-complete">
    <div class="entete-recherche">
      <i class="fi fi-rr-search"></i>
      <input type="text" placeholder="Montpellier" @input="completerResultatsRecherche($event.target.value)">
    </div>
    <span class="titre-recherche">Suggestions et résultats</span>
    <div class="resultats-recherche">
    </div>
  </div>

</template>

<style scoped>
@import "@/assets/styles/styleListeEvenements.css";

</style>
