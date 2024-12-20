<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref, Ref} from "vue";

const route = useRoute()
const id = route.params.id

//TODO relier API
const utilisateur: Ref<Utilisateur> = ref({
  id: 1,
  nom: "Lecompte",
  prenom: "Jérôme",
  email: "jerome.lecompte@gmail.com",
});
</script>

<template>

  <section class="compte">
    <div class="wrap-compte">

      <div class="gauche-compte">
        <div class="infos-compte">
          <i class="fi fi-rr-user"></i>
          <div>
            <h1>{{ utilisateur.prenom }} {{ utilisateur.nom }}</h1>
            <span class="texte-gris-simple">Compte Intervachettes</span>
          </div>
        </div>

        <!-- TODO uniquement afficher si le profil est celui de l'utilisateur connecté -->
        <div class="actions-compte">
          <span class="texte-gris-simple">Actions</span>
          <div onclick="revenirEnArriere()" class="bouton fond-bleu"><i class="fi fi-rr-angle-left"></i>Revenir en
            arrière
          </div>
          <div @click="TODO" class="bouton icon-animation">Modifier le compte<i class="fi fi-rr-arrow-right"></i></div>
          <div @click="TODO" class="bouton icon-animation">Supprimer le compte<i class="fi fi-rr-arrow-right"></i></div>
        </div>
      </div>

      <div class="droite-compte">
        <!-- TODO composant en fonction de l'onglet actif (par défaut : infos du compte) -->
      </div>
    </div>
  </section>

</template>

<style scoped>
@import "@/assets/styles/styleCompte.css";
</style>
