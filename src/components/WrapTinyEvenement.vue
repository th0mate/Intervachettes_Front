<script setup lang="ts">
import type {Evenement} from "@/types";
import {onMounted} from 'vue';

const props = defineProps<{ evenement: Evenement }>();

if (!props.evenement.adresse) {
  props.evenement.adresse = "55 Rue du Faubourg Saint-Honoré, 75008 Paris"
}

/*const recherche = ref('');
const resultatsFiltres = computed(() =>
  evenements.value.filter(evenement =>
    evenement.adresse.toLowerCase().includes(recherche.value.toLowerCase())
  )
);
*/

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById('google-maps-script')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Erreur lors du chargement du script Google Maps'));
    document.head.appendChild(script);
  });
}

onMounted(async () => {
  setTimeout(async () => {
    const openCageApiKey = '9926c5c68d1049699aa98588422de554';
    const googleMapsApiKey = 'AIzaSyBWb0BhFaft2KGEB950XZKunK3-g0T-Uns';
    const location = encodeURIComponent(props.evenement.adresse);

    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${openCageApiKey}`);
      const data = await response.json();

      if (data.results.length > 0) {
        const {lat, lng} = data.results[0].geometry;

        await loadGoogleMapsScript(googleMapsApiKey);

        const map = new google.maps.Map(document.getElementById('map' + props.evenement.id), {
          center: {lat, lng},
          zoom: 6,
          disableDefaultUI: true,
        });

        new google.maps.Marker({
          position: {lat, lng},
          map,
          title: props.evenement.adresse
        });
      } else {
        console.error('Localisation non trouvée. Adresse sans doute incorrecte.');
      }
    } catch (error) {
      console.error('Erreur Google Maps : ', error);
    }
  }, 500);
});

</script>

<template>
  <div class="tinyEvenemenent">
    <div class="wrap-texte">
      <h1 class="grand-titre"><span class="color-blue">Intervachettes</span> {{ evenement.nom }}</h1>
      <span class="texte-gris-simple description"><i
        class="fi fi-rr-quote-right reverse color-blue"></i> {{ evenement.description.substring(0, 300) + '...' }} <i
        class="fi fi-rr-quote-right color-blue"></i></span>
      <span class="texte-gris-simple"><i class="fi fi-rr-calendar-clock color-blue"></i> Du {{ new Date(evenement.dateDebutEvenement).toLocaleString("fr") }} au
        {{ new Date(evenement.dateFinEvenement).toLocaleString("fr") }}</span>
      <span class="texte-gris-simple"><i class="fi fi-rr-marker color-blue"></i> {{ evenement.adresse }}</span>
      <div class="chiffres-cles">
          <span class="chiffre-cle">
            <span class="chiffre">10</span>
            <span>Places restantes</span>
          </span>
        <span class="chiffre-cle">
            <span class="chiffre">27</span>
            <span>Candidats inscrits</span>
          </span>
      </div>
      <div class="bouton icon-animation">En savoir plus<i class="fi fi-rr-arrow-right"></i></div>
    </div>
    <div :id="'map' + evenement.id" class="map"></div>
  </div>
</template>

<style scoped>
@import "@/assets/styles/styleTinyEvenement.css";
</style>
