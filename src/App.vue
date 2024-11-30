<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>

  <nav>
    <img @click="$router.push({name: 'accueil'})" src="@/assets/img/intervachettes_logo.png" alt="logo" class="logo"/>
    <div class="wrap-redirection">
      <RouterLink to="/accueil" class="nav-link" active-class="active-link">ACCUEIL</RouterLink>
      <RouterLink to="/evenements" class="nav-link" active-class="active-link">ÉVÉNEMENTS</RouterLink>
      <div class="bouton border-bleu"><i class="fi fi-tr-circle-user"></i>Connexion</div>
      <div class="bouton fond-bleu"><i class="fi fi-tr-add"></i>Inscription</div>
    </div>
  </nav>

  <div class="contenu-intervachettes">
    <RouterView class="contenu"/>
  </div>

  <footer>
    <span>©2024 Levy Vergnes Audouy Loye</span>
    <img @click="$router.push({name: 'accueil'})" src="@/assets/img/intervachettes_logo.png" alt="logo" class="logo"/>
  </footer>
</template>

<style scoped>
@import "@/assets/styles/base.css";
</style>
