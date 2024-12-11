const openCageApiKey = '9926c5c68d1049699aa98588422de554';
const googleMapsApiKey = 'AIzaSyBWb0BhFaft2KGEB950XZKunK3-g0T-Uns';


export async function afficherCarteGoogleMaps(adresseAfficher, idDiv) {
  try {
    const location = encodeURIComponent(adresseAfficher);
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${openCageApiKey}`);
    const data = await response.json();

    if (data.results.length > 0) {
      const {lat, lng} = data.results[0].geometry;

      await loadGoogleMapsScript(googleMapsApiKey);
      console.log(idDiv);

      const map = new google.maps.Map(document.getElementById(idDiv), {
        center: {lat, lng},
        zoom: 6,
        disableDefaultUI: true,
      });

      new google.maps.Marker({
        position: {lat, lng},
        map,
        title: adresseAfficher
      });
    } else {
      console.error('Localisation non trouvée. Adresse sans doute incorrecte.');
    }
  } catch (error) {
    console.error('Erreur Google Maps : ', error);
  }
}


function loadGoogleMapsScript(apiKey) {
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
