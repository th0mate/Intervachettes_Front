<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>

  <nav>
    <img @click="$router.push({name: 'accueil'})" src="@/assets/img/intervachettes_logo.png" alt="logo" class="logo"/>
    <div class="wrap-redirection">
      <span @click="$router.push({name: 'accueil'})">ACCUEIL</span>
      <span @click="$router.push({name: 'accueil'})">ÉVÉNEMENTS</span>
      <div class="bouton border-bleu"><i class="fi fi-tr-circle-user"></i>Connexion</div>
      <div class="bouton fond-bleu"><i class="fi fi-tr-add"></i>Inscription</div>
    </div>
  </nav>

  <RouterView class="contenu"/>

  <footer>
    <span>©2024 Levy Vergnes Audouy Loye</span>
    <img src="@/assets/img/intervachettes_logo.png" alt="logo" class="logo"/>
  </footer>
</template>

<style scoped>
@import "@/assets/styles/base.css";
</style>
