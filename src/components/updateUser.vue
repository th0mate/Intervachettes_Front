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
  <div v-if="utilisateur">
    <h2>Modifier les informations de l'utilisateur</h2>
    <form @submit.prevent="updateUser">
      <div>
        <label for="adresseMail">Adresse mail :</label>
        <input id="adresseMail" v-model="utilisateur.adresseMail" type="email"/>
      </div>
      <div>
        <label for="code_pages_vertes">Code PagesVertes :</label>
        <input id="code_pages_vertes" v-model="utilisateur.code_pages_vertes" type="text"/>
      </div>
      <div>
        <label for="description">Description :</label>
        <input id="description" v-model="utilisateur.biographie" type="text"/>
      </div>
      <div>
        <label for="nom">Nom :</label>
        <input id="nom" v-model="utilisateur.nom" type="text"/>
      </div>
      <div>
        <label for="prenom">Prénom :</label>
        <input id="prenom" v-model="utilisateur.prenom" type="text"/>
      </div>
      <div>
        <label for="plainPassword">Mot de Passe :</label>
        <input id="plainPassword" v-model="utilisateur.plainPassword" type="password"/>
      </div>
      <button type="submit" class="btn primary">Enregistrer</button>
    </form>
  </div>
  <div v-else>
    <p>Utilisateur non connecté.</p>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

div {
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn.primary {
  background-color: #007bff;
  color: white;
}

.btn.primary:hover {
  background-color: #0056b3;
}
</style>
