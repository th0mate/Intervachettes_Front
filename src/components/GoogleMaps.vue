<script setup lang="ts">
declare global {
  interface Window {
    google: typeof google;
  }
}

const openCageApiKey = '9926c5c68d1049699aa98588422de554';
const googleMapsApiKey = 'AIzaSyBWb0BhFaft2KGEB950XZKunK3-g0T-Uns';
const props = defineProps<{ adresses: string[], idDiv: string }>();

let compteur = 0;
async function afficherCarteGoogleMaps(adresses: string[], idDiv: string) {
  compteur++;

  if (compteur > 5) {
    console.error('Tentatives de reconnexion épuisées');
    return;
  }

  try {
    await loadGoogleMapsScript(googleMapsApiKey);
    const map = new window.google.maps.Map(document.getElementById(idDiv), {
      center: { lat: 0, lng: 0 },
      zoom: 2,
      disableDefaultUI: true,
    });

    const bounds = new window.google.maps.LatLngBounds();

    for (const adresse of adresses) {
      const location = encodeURIComponent(adresse);
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${openCageApiKey}`);
      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        const position = { lat, lng };
        new window.google.maps.Marker({
          position,
          map,
          title: adresse
        });
        bounds.extend(position);
      } else {
        console.error(`Localisation non trouvée pour l'adresse : ${adresse}`);
      }
    }

    map.fitBounds(bounds);

    const listener = window.google.maps.event.addListener(map, "idle", function() {
      if (map.getZoom() > 10) map.setZoom(6);
      window.google.maps.event.removeListener(listener);
    });

  } catch (error) {
    console.warn('Erreur API Google Maps : ' + error + '\n Tentative de reconnexion dans 1 seconde');
    setTimeout(() => afficherCarteGoogleMaps(adresses, idDiv), 1000);
  }
}

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

afficherCarteGoogleMaps(props.adresses, props.idDiv);
</script>

<template>
  <div class="map" :id="props.idDiv" style="width: 100%; height: 400px;"></div>
</template>

<style scoped>
</style>
