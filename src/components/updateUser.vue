<script setup lang="ts">
import {apiStore} from "@/util/apiStore";
import {ref} from 'vue';
import type {Utilisateur} from '@/types';
import { notify } from "@kyvg/vue3-notification";

const props = defineProps<{utilisateur: Utilisateur}>();
const emit = defineEmits<{ updated: () => void }>();
const utilisateur = ref(props.utilisateur);

const updateUser = () => {
  console.log(utilisateur.value);
  apiStore.update('utilisateurs', utilisateur.value, apiStore.utilisateurConnecte)
    .then(() => {
      notify({
        type: 'success',
        title: 'Utilisateur modifié'
      });
      emit('updated');
    });
};
</script>

<template>
  <div class="actionCompte" v-if="utilisateur">
    <h1 class="grand-titre">Modifier le <span class="color-blue">compte</span></h1>

    <form @submit.prevent="updateUser" class="modifier-compte">
      <div>
        <label class="texte-gris-simple" for="adresseMail">Adresse mail :</label>
        <input id="adresseMail" v-model="utilisateur.adresseMail" type="email"/>
      </div>
      <div>
        <label class="texte-gris-simple" for="code_pages_vertes">Code PagesVertes :</label>
        <input id="code_pages_vertes" v-model="utilisateur.code_pages_vertes" type="text"/>
      </div>
      <div>
        <label class="texte-gris-simple" for="description">Description :</label>
        <textarea id="description" v-model="utilisateur.biographie" type="text"/>
      </div>
      <div>
        <label class="texte-gris-simple" for="nom">Nom :</label>
        <input id="nom" v-model="utilisateur.nom" type="text"/>
      </div>
      <div>
        <label class="texte-gris-simple" for="prenom">Prénom :</label>
        <input id="prenom" v-model="utilisateur.prenom" type="text"/>
      </div>
      <div>
        <label class="texte-gris-simple" for="plainPassword">Mot de Passe :</label>
        <input class="texte-gris-simple" id="plainPassword" v-model="utilisateur.plainPassword" type="password"/>
      </div>
      <button type="submit" class="bouton icon-animation">Enregistrer <i
        class="fi fi-rr-arrow-right"></i></button>
    </form>

  </div>
  <div class="erreur" v-else>
    <i class="fi fi-rr-exclamation icone-erreur"></i>
    <h1 class="color-blue">Erreur : Utilisateur non connecté.</h1>
    <div onclick="revenirEnArriere()" class="bouton fond-bleu"><i class="fi fi-rr-angle-left"></i>Revenir en
      arrière
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/styles/actionsCompte.css";
</style>
