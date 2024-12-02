<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'

import '@/assets/js/gestionNavbar.js';


function ouvrirMenu() {
  document.querySelector('.menu-responsive').style.display = 'flex';
}

function fermerMenu() {
  document.querySelector('.menu-responsive').style.display = 'none';
}

</script>

<template>

  <nav>
    <img @click="$router.push({name: 'accueil'})" src="@/assets/img/intervachettes_logo.png" alt="logo" class="logo"/>
    <div class="wrap-redirection">
      <RouterLink to="/accueil" class="nav-link" active-class="active-link">ACCUEIL</RouterLink>
      <RouterLink to="/evenements" class="nav-link" active-class="active-link">ÉVÉNEMENTS</RouterLink>
      <div @click="$router.push({name: 'connexion'})" class="bouton border-bleu"><i class="fi fi-tr-circle-user"></i>Connexion</div>
      <div @click="$router.push({name: 'inscription'})" class="bouton fond-bleu"><i class="fi fi-tr-add"></i>Inscription</div>
    </div>

    <div class="burger" @click="ouvrirMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>

  </nav>

  <div class="menu-responsive">
    <img @click="$router.push({name: 'accueil'})" src="@/assets/img/intervachettes_logo_white.png" alt="logo"
         class="logo"/>
    <i class="fi fi-rr-cross-small cross" @click="fermerMenu"></i>
    <RouterLink to="/accueil" class="nav-link" active-class="active-link">ACCUEIL</RouterLink>
    <RouterLink to="/evenements" class="nav-link" active-class="active-link">ÉVÉNEMENTS</RouterLink>
    <RouterLink to="/connexion" class="nav-link" active-class="active-link">CONNEXION</RouterLink>
    <RouterLink to="/inscription" class="nav-link" active-class="active-link">INSCRIPTION</RouterLink>
  </div>

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
