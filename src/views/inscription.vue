<script setup lang="ts">
import {apiStore} from "@/util/apiStore";
import {notify} from "@kyvg/vue3-notification";
import router from "@/router";
import {ref} from "vue";

const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const bibliographie = ref('');
const login = ref('');


function creerCompte(): void {
  if(apiStore.estConnecte)
  {
    notify({
      type: 'warn',
      title: 'Erreur',
      text: "Vous ne pouvez pas vous inscrire si vous êtes connecté"
    });
    return;
  }
  if(password.value != passwordConfirmation.value) // Si les 2 mots de passes sont différents, on ne lance pas de requête
  {
    notify({
      type: 'warn',
      title: 'Données éronnées',
      text: "Les mots de passes doivent être identiques"
    });
    return;
  }

  // Appel de la fonction createRessource
  apiStore.createRessource("utilisateurs", { login: login.value, plainPassword: password.value, adresseMail: email.value, biographie: bibliographie.value }, false)
    .then(() => {
      // Si la création réussit, on appelle la fonction login
      return apiStore.login(login.value, password.value);
    })
    .then(reponseJSON => {
      if (reponseJSON['success']) {
        notify({
          type: 'success',
          title: 'Connexion réussie',
        });
        router.push({ name: 'accueil' });
      } else {
        console.log(reponseJSON);
        notify({
          type: 'warn',
          title: 'Connexion impossible',
          text: 'Mot de passe ou identifiant incorrect'
        });
      }
    })
    .catch(error => {
      // Gestion des erreurs pour la création ou la connexion
      notify({
        type: 'error',
        title: 'Erreur',
        text: `Une erreur est survenue : ${error.message || 'Action impossible'}`
      });
    });
}
</script>

<template>
  <section class="connexion-inscription">

    <div class="wrap-connexion-inscription">
      <div class="illustation-login">
        <img src="@/assets/img/intervachettes_logo.png" alt="logo" class="logo"/>
        <img src="@/assets/img/illuInscription.png" alt="illustration"/>
      </div>

      <div class="form-login">
        <h1>Bienvenue sur <span class="color-blue">Intervachettes</span> !</h1>
        <h4>Créez votre profil pour accéder à davantage de fonctionnalités.</h4>

        <form @submit.prevent="creerCompte" class="content">

          <label>
            <span>Login</span>
            <input type="text" v-model="login" required>
          </label>

          <label>
            <span>Adresse mail</span>
            <input type="email" v-model="email" required>
          </label>

          <label>
            <span>Mot de passe</span>
            <input type="password" v-model="password" required>
          </label>

          <label>
            <span>Confirmer le mot de passe</span>
            <input type="password" v-model="passwordConfirmation" required>
          </label>

          <button type="submit" class="bouton icon-animation">Inscription<i class="fi fi-rr-arrow-right"></i></button>

        </form>
      </div>
    </div>

  </section>
</template>

<style scoped>
@import "@/assets/styles/styleConnexionInscription.css";

</style>
