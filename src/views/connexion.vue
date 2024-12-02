<script setup lang="ts">

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
            <span>Adresse mail</span>
            <input type="email" v-model="email" required>
          </label>

          <label>
            <span>Mot de passe</span>
            <input type="password" v-model="password" required>
          </label>

          <div @click="this.form.submit" class="bouton icon-animation">Connexion<i class="fi fi-rr-arrow-right"></i></div>

        </form>
      </div>
    </div>

  </section>
</template>

<style scoped>
@import "@/assets/styles/styleConnexionInscription.css";
</style>
