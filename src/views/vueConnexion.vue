<script setup lang="ts">
import {ref} from 'vue';
import {apiStore} from "@/util/apiStore";
import router from "@/router";
import { notify } from "@kyvg/vue3-notification";

const connectingUser = ref({
  login: "",
  password:""
});

function connect():void{
  apiStore.login(connectingUser.value.login, connectingUser.value.password)
    .then(reponseJSON => {
      if (reponseJSON['success']) {
        notify({
          type: 'success',
          title: 'Connecté avec succès',
          group: 'custom-template'
        });
        router.push({name: 'accueil'});
      } else {
        notify({
          type: 'warning',
          title: 'Échec de la connexion',
          text: 'Mot de passe ou identifiant incorrect',
          group: 'custom-template'
        });
      }
    });
}
</script>

<template>
  <section class="connexion-inscription">

    <div class="wrap-connexion-inscription">
      <div class="illustation-login">
        <img src="@/assets/img/intervachettes_logo.png" alt="logo" class="logo"/>
        <img src="@/assets/img/illuConnexion.png" alt="illustration"/>
      </div>

      <div class="form-login">
        <h1>Contents de vous revoir sur <span class="color-blue">Intervachettes</span> !</h1>
        <h4>Connectez-vous à votre compte.</h4>

        <form @submit.prevent="connect" class="content">

          <label>
            <span>Login</span>
            <input type="text" v-model="connectingUser.login" required>
          </label>

          <label>
            <span>Mot de passe</span>
            <input type="password" v-model="connectingUser.password" required>
          </label>

          <button type="submit" class="bouton icon-animation">Connexion<i class="fi fi-rr-arrow-right"></i></button>

        </form>
      </div>
    </div>

  </section>
</template>

<style scoped>
@import "@/assets/styles/styleConnexionInscription.css";

</style>
