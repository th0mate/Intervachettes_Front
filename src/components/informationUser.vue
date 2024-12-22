<script setup lang="ts">
import type {Utilisateur, UtilisateurPagesVertes} from '@/types';

const props = defineProps<{ utilisateur: Utilisateur }>();
const emit = defineEmits(['updated']);
import {apiStore} from "@/util/apiStore";
import {type Ref, ref} from "vue";
import {notify} from "@kyvg/vue3-notification";

function redirigerPagesVertes() {
  window.open(apiStore.pagesVertesUrl, '_blank');
}

let user: Ref<UtilisateurPagesVertes> = ref({});

function synchroniserInfoAvecPagesVertes()
{
  if (! props.utilisateur || ! props.utilisateur.code_pages_vertes) {
    notifyError();
    return;
  }

  apiStore.getFromPagesVertes("utilisateur/profil/" + props.utilisateur.code_pages_vertes)
    .then(reponseJSON => {
      user.value = <UtilisateurPagesVertes>reponseJSON;
      if(! user.value)
      {
        notifyError();
        return;
      }

      let dataToUpdate = {
        "adresseMail": user.value.adresseEmail,
        "nom": user.value.nom,
        "prenom": user.value.prenom
      };
      apiStore.update('utilisateurs', dataToUpdate, props.utilisateur.id, true)
        .then(() => {
          notify({
            type: 'success',
            title: 'Profil modifié avec succès',
            group: 'custom-template'
          });
          emit('updated')
        })
        .catch(() => {
          notifyError();
        });
    }).catch(error => {
    notifyError();
  });
}

function notifyError()
{
  notify({
    type: 'error',
    title: 'Erreur lors de la synchronisation des données',
    group: 'custom-template'
  });
}
</script>

<template>
  <div class="actionCompte">
    <h1 class="grand-titre" v-if="apiStore.utilisateurConnecte.id === utilisateur.id">Mon <span class="color-blue">compte</span>
    </h1>
    <h1 class="grand-titre" v-else>Profil de <span class="color-blue">{{ utilisateur.login }}</span></h1>
    <br>
    <div class="details-compte">
      <div v-if="apiStore.utilisateurConnecte.id === utilisateur.id" class="pages-vertes" @click="redirigerPagesVertes">
        <img src="@/assets/img/pages_vertes.png" alt="pages vertes" class="icone-pages-vertes">
        <span class="texte-gris-simple">Voir sur PagesVertes</span>
      </div>
      <div v-if="apiStore.utilisateurConnecte.id === utilisateur.id" class="pages-vertes" @click="synchroniserInfoAvecPagesVertes">
        <img src="@/assets/img/pages_vertes.png" alt="pages vertes" class="icone-pages-vertes">
        <span class="texte-gris-simple">Synchroniser infos avec PagesVertes</span>
      </div>
      <span class="texte-gris-simple"><span class="color-blue">Login :</span> {{ utilisateur.login || 'N/A' }}</span>
      <span class="texte-gris-simple"><span class="color-blue">Nom :</span> {{ utilisateur.nom || 'N/A' }}</span>
      <span class="texte-gris-simple"><span class="color-blue">Prénom :</span> {{ utilisateur.prenom || 'N/A' }}</span>
      <span class="texte-gris-simple"><span class="color-blue">Adresse mail :</span> {{ utilisateur.adresseMail || 'N/A' }}</span>
      <span class="texte-gris-simple"><span class="color-blue">Code PagesVertes :</span> {{ utilisateur.code_pages_vertes || 'N/A' }}</span>
      <span class="texte-gris-simple"><span class="color-blue">Biographie :</span> {{ utilisateur.biographie || 'N/A' }}</span>
    </div>
  </div>


</template>

<style scoped>
@import "@/assets/styles/actionsCompte.css";
</style>
