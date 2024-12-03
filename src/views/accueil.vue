<script setup lang="ts">

</script>

<template>
  <section class="grille-fond-accueil">
    <img src="@/assets/img/grille_background.png" alt="logo" class="background-grille"/>

    <div class="presentation-main">
      <img src="@/assets/img/illu_accueil.jpg" alt="illustration">
      <div>
        <h1 class="tres-grand-titre">Retour d'un classique</h1>
        <span class="texte-gris-simple">La céblèbre émission "Intervilles" revient sous une forme inédite ! </span>
        <span class="texte-gris-simple">Organisez ou participez dès maintenant à un jeu Intervachettes !</span>

        <div class="chiffres-cles">
          <span class="chiffre-cle">
            <span class="chiffre">10</span>
            <span>Événements prévus</span>
          </span>
          <span class="chiffre-cle">
            <span class="chiffre">27</span>
            <span>Villes en compétition</span>
          </span>
        </div>
      </div>
    </div>


    <div class="map-evenements">
      <div>
        <div class="indicator"><span></span>Tous Les Événements</div>
        <h1 class="grand-titre">Participer à un <span class="color-blue">événement</span></h1>
        <span class="texte-gris-simple">Trouvez l'événement le plus proche de chez vous pour y participer.</span>
        <div class="bouton icon-animation">Voir tous les événements<i class="fi fi-rr-arrow-right"></i></div>
      </div>
      <img src="@/assets/img/map.png" alt="map"/>
    </div>

  </section>


  <section class="highlights">
    <div class="indicator"><span></span>Points Forts</div>
    <h1 class="grand-titre"><span class="color-blue">Intervachettes</span><br> dans les grandes lignes</h1>

    <div class="grid-highlights">

      <div class="hightlight">
        <img src="@/assets/img/etoiles.png" alt="etoiles"/>
        <h2>Haute personnalisation</h2>
        <span class="texte-gris-simple">Créez votre événement Intervachettes et personnalisez-le selon vos envies !</span>
      </div>
      <div class="hightlight">
        <img src="@/assets/img/taureau.png" alt="etoiles"/>
        <h2>Nombreuses activités pour tous</h2>
        <span class="texte-gris-simple">Profitez de nombreuses activités et jeux accessibles à tous, même aux plus jeunes.</span>
      </div>
      <div class="hightlight">
        <img src="@/assets/img/euro.png" alt="etoiles"/>
        <h2>Des prix attractifs</h2>
        <span class="texte-gris-simple">Des prix adaptés à tous les budgets, pour profiter d'un événement local d'envergure.</span>
      </div>
      <div class="hightlight">
        <img src="@/assets/img/famille.png" alt="etoiles"/>
        <h2>A la porté de tous</h2>
        <span class="texte-gris-simple">Si vous le souhaitez, vous pouvez organiser une session Intervachettes dans votre village !</span>
      </div>
      <div class="hightlight">
        <img src="@/assets/img/graphique.png" alt="etoiles"/>
        <h2>Des dizaines d'événements ajoutés</h2>
        <span class="texte-gris-simple">Découvrez des dizaines d'événements ajoutés quotidiennement sur notre site !</span>
      </div>
      <div class="hightlight">
        <img src="@/assets/img/sablier.png" alt="etoiles"/>
        <h2>Durée variable</h2>
        <span class="texte-gris-simple">Organisez des jeux contre plusieurs villes sur un jour ou deux semaines, selon vos envies !</span>
      </div>
    </div>
  </section>

  <section class="organiser">
    <img src="@/assets/img/illu_organisation.webp" alt="map"/>
    <div>
      <div class="indicator"><span></span>Organiser un Intervachettes</div>
      <h1 class="grand-titre">Organisez,<br> <span class="color-blue">vous aussi</span></h1>
      <span class="texte-gris-simple">Vous aussi, organisez un événement Intervachettes dans votre ville !</span>
      <div class="bouton icon-animation">Organisez votre événement<i class="fi fi-rr-arrow-right"></i></div>
    </div>
  </section>

  <section class="contributors">
    <div class="indicator"><span></span>Nos Sponsors</div>
    <div class="wrap-presentation-sponsors">
      <h1 class="grand-titre">Ils nous<br> <span class="color-blue">soutiennent</span></h1>
      <span class="texte-gris-simple">Nos sponsors nous accompagnent sur les événements Intervachettes pour financer les sessions de jeu dans votre ville.</span>
    </div>

    <div class="wrap-sponsors">
      <h2><span></span>Nos sponsors</h2>

      <div class="sponsors">
        <div class="sponsor"><img src="@/assets/img/logo_gitlab.png" alt="gitlab"></div>
        <div class="sponsor"><img src="@/assets/img/logo_jetbrains.png" alt="gitlab"></div>
        <div class="sponsor"><img src="@/assets/img/logo_airbus.png" alt="gitlab"></div>
        <div class="sponsor"><img src="@/assets/img/logo_samsung.png" alt="gitlab"></div>
        <div class="sponsor"><img src="@/assets/img/logo_dassault.png" alt="gitlab"></div>
      </div>
    </div>
  </section>

</template>

<style scoped>
@import "@/assets/styles/styleAccueil.css";

</style>
