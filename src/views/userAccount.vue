<script setup lang="ts">
import { apiStore } from "@/util/apiStore";
import { ref } from "vue";
import InformationUser from "@/components/informationUser.vue";
import UpdateUser from "@/components/updateUser.vue";
import type {Utilisateur} from "@/types";
import router from "@/router";
import { notify } from "@kyvg/vue3-notification";

const id = ref(apiStore.utilisateurConnecte);
const user:Ref<Utilisateur[]> = ref('Chargement');

apiStore.getById('utilisateurs', id.value)
  .then(reponseJSON => {
    user.value = reponseJSON;
  });

const isEditing = ref(false);
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const handleUpdate = () => {
  isEditing.value = false;
};

const deleteUser = () => {
  apiStore.delete('utilisateurs', id.value)
    .then(() => {
      notify({
        type: 'success',
        title: 'Utilisateur supprimé'
      });
      router.push({name: 'accueil'});
    });
};
</script>

<template>
  <div v-if="user" class="compte-container">
    <h1>Mon <span class="highlight">compte</span></h1>
    <div class="profile-actions">
      <p><strong>Nom :</strong> {{ user.nom || 'N/A' }}</p>
      <p><strong>Prénom :</strong> {{ user.prenom || 'N/A' }}</p>
    </div>
    <div class="actions">
      <button @click="toggleEdit" class="btn primary">{{ isEditing ? "Arrêter la modification" : "Modifier le compte" }}</button>
      <button @click="deleteUser" class="btn danger">Supprimer le compte</button>
    </div>
  </div>
  <div v-else>
    <p>Utilisateur non connecté.</p>
  </div>
  <div v-if="isEditing">
    <UpdateUser :utilisateur="user" @updated="handleUpdate"/>
  </div>
  <div v-else>
    <InformationUser :utilisateur="user"/>
  </div>

</template>

<style scoped>
.compte-container {
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.highlight {
  color: #007bff;
}

.profile-actions p {
  margin: 0.5rem 0;
}

.actions {
  margin-top: 2rem;
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

.btn.danger {
  background-color: #dc3545;
  color: white;
  margin-left: 1rem;
}

.btn.danger:hover {
  background-color: #b02a37;
}
</style>
