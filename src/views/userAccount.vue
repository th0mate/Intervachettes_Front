<script setup lang="ts">
import { apiStore } from "@/util/apiStore";
import { ref, reactive } from "vue";
import InformationUser from "@/components/informationUser.vue";
import UpdateUser from "@/components/updateUser.vue";
import type {Utilisateur} from "@/types";
import router from "@/router";
import {notify} from "@kyvg/vue3-notification";
import EvenementsUser from "@/components/evenementsUser.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const id = route.params.id;
const user = reactive<Utilisateur>({});

const affichageAction = ref('profil');

const toggleEdit = (action) => {
  affichageAction.value = action;
};

const handleUpdate = () => {
  affichageAction.value = 'profil';
  apiStore.getById('utilisateurs', id)
    .then(reponseJSON => {
      Object.assign(user, reponseJSON);
    });
};

apiStore.getById('utilisateurs', id)
  .then(reponseJSON => {
    Object.assign(user, reponseJSON);
  });
function getUser()
{
  apiStore.getById('utilisateurs', parseInt(id))
    .then(reponseJSON => {
      user.value = reponseJSON;
    });
}

getUser();

const deleteUser = () => {
  if (!apiStore.utilisateurConnecte || apiStore.utilisateurConnecte.id !== parseInt(id)) {
    notify({
      type: 'error',
      title: 'Impossible de supprimer le compte',
      text: 'Vous ne pouvez pas supprimer un compte qui n\'est pas le votre',
      group: 'custom-template'
    });
  } else {
    const confirmation = confirm('Voulez-vous vraiment supprimer votre compte ?');

    if (confirmation) {
      apiStore.delete('utilisateurs', id)
        .then(() => {
          notify({
            type: 'success',
            title: 'Compte supprimé avec succès',
            group: 'custom-template'
          });
          router.push({name: 'accueil'});
        });
    } else {
      notify({
        type: 'info',
        title: 'Suppression du compte annulée',
        group: 'custom-template'
      });
    }
  }
};

const loaded = ref(false);

apiStore.refresh();

loaded.value = true;
</script>

<template>
  <section class="compte" v-if="loaded">

    <div class="wrap-compte">

      <div class="gauche-compte">
        <div class="infos-compte">
          <i class="fi fi-rr-user"></i>
          <div v-if="user">
            <h1 v-if="user.prenom">{{ user.prenom || 'N/A' }} {{ user.nom || 'N/A' }}</h1>
            <h1 v-if="!user.prenom">{{ user.login }}</h1>
            <span class="texte-gris-simple">Compte Intervachettes</span>
          </div>
        </div>

        <div class="actions-compte">
          <span class="texte-gris-simple">Actions</span>
          <div onclick="window.history.back()" class="bouton fond-bleu"><i class="fi fi-rr-angle-left"></i>Revenir en
            arrière
          </div>
          <div v-if="apiStore.utilisateurConnecte && apiStore.utilisateurConnecte.id === parseInt(id)" @click="toggleEdit('profil')" class="bouton icon-animation">Infos du compte<i class="fi fi-rr-arrow-right"></i></div>
          <div v-if="apiStore.utilisateurConnecte && apiStore.utilisateurConnecte.id === parseInt(id)" @click="toggleEdit('editer')" class="bouton icon-animation">Modifier le compte<i class="fi fi-rr-arrow-right"></i></div>
          <div v-if="apiStore.utilisateurConnecte && apiStore.utilisateurConnecte.id === parseInt(id)" @click="toggleEdit('events')" class="bouton icon-animation">Événements liés<i class="fi fi-rr-arrow-right"></i></div>
          <div v-if="apiStore.utilisateurConnecte && apiStore.utilisateurConnecte.id === parseInt(id)" @click="deleteUser" class="bouton icon-animation">Supprimer le compte<i class="fi fi-rr-arrow-right"></i></div>
        </div>
      </div>

      <div class="droite-compte">

        <InformationUser class="ongletCompte" v-if="affichageAction === 'profil'" :utilisateur="user" @updated="getUser"/>
        <UpdateUser class="ongletCompte" v-if="affichageAction === 'editer'" :utilisateur="user"
                    @updated="handleUpdate"/>
        <EvenementsUser class="ongletCompte" v-if="affichageAction === 'events'" :utilisateur="user"/>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import "@/assets/styles/styleCompte.css";
</style>
