<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {apiStore} from "@/util/apiStore";
import {ref} from 'vue';
import '@/assets/js/gestionNavbar.js';
import {Notifications, notify} from "@kyvg/vue3-notification";


function ouvrirMenu() {
  document.querySelector('.menu-responsive').style.display = 'flex';
}

function fermerMenu() {
  document.querySelector('.menu-responsive').style.display = 'none';
}

const logout = () => {
  notify({
    type: 'info',
    title: 'Vous êtes déconnecté',
    group: 'custom-template'
  });
  apiStore.logout();
}
const loaded = ref(false);

apiStore.refresh();

loaded.value = true;

const getImageSrc = (type: string) => {
  return `/inter_vachettes_front/dist/src/assets/img/${type}.png`;
};

</script>

<template>

  <nav v-if="loaded">
    <img @click="$router.push({name: 'accueil'})" src="@/assets/img/intervachettes_logo.png" alt="logo" class="logo"/>
    <div class="wrap-redirection">
      <RouterLink to="/accueil" class="nav-link" active-class="active-link">ACCUEIL</RouterLink>
      <RouterLink to="/evenements" class="nav-link" active-class="active-link">ÉVÉNEMENTS</RouterLink>
      <div v-if="!apiStore.estConnecte" @click="$router.push({name: 'connexion'})" class="bouton border-bleu"><i class="fi fi-tr-circle-user"></i>Connexion</div>
      <div v-if="apiStore.estConnecte" @click="logout" class="bouton border-bleu"><i class="fi fi-tr-circle-user"></i>Déconnexion</div>
      <div v-if="!apiStore.estConnecte" @click="$router.push({name: 'inscription'})" class="bouton fond-bleu"><i class="fi fi-tr-add"></i>Inscription</div>
    </div>

    <div class="burger" @click="ouvrirMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>

  </nav>

  <div class="menu-responsive" v-if="loaded">
    <img @click="$router.push({name: 'accueil'})" src="@/assets/img/intervachettes_logo_white.png" alt="logo"
         class="logo"/>
    <i class="fi fi-rr-cross-small cross" @click="fermerMenu"></i>
    <RouterLink to="/accueil" class="nav-link" active-class="active-link">ACCUEIL</RouterLink>
    <RouterLink to="/evenements" class="nav-link" active-class="active-link">ÉVÉNEMENTS</RouterLink>
    <RouterLink v-if="!apiStore.estConnecte" to="/connexion" class="nav-link" active-class="active-link">CONNEXION</RouterLink>
    <span v-if="apiStore.estConnecte" class="nav-link" @click="logout">DÉCONNEXION</span>
    <RouterLink v-if="!apiStore.estConnecte" to="/inscription" class="nav-link" active-class="active-link">INSCRIPTION</RouterLink>
  </div>

  <notifications group="custom-template" position="bottom right" :duration="5000">
    <template #body="props">
      <div :class="['my-notification', props.item.type]">
        <img :src="getImageSrc(props.item.type)" alt="logo" class="logo"/>
        <div>
          <p>{{ props.item.title }}</p>
          <span>{{ props.item.text }}</span>
        </div>
      </div>
    </template>
  </notifications>

  <div class="contenu-intervachettes">
    <RouterView class="contenu"/>
  </div>

  <footer>
    <span>©2024 Levy Vergnes Audouy Loye</span>
    <span>Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a></span>
    <img @click="$router.push({name: 'accueil'})" src="@/assets/img/intervachettes_logo.png" alt="logo" class="logo"/>
  </footer>

</template>

<style>
@import "@/assets/styles/base.css";
</style>
