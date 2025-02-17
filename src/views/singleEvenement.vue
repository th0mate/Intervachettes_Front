<script setup lang="ts">
import {useRoute} from 'vue-router'
import type {Evenement, Inscription} from "@/types";
import {ref, computed, type Ref} from "vue";
import {apiStore} from "@/util/apiStore";
import GoogleMaps from "@/components/GoogleMaps.vue";
import {notify} from "@kyvg/vue3-notification";
import router from "@/router";


const route = useRoute()
const id = route.params.id

const inscriptions: Ref<Inscription[]> = ref([]);
const inscriptionsUserConnect: Ref<Inscription[]> = ref([]);

const evenement: Ref<Evenement> = ref({});
apiStore.getById('inter_vachettes', id)
  .then(reponseJSON => {
    evenement.value = reponseJSON;
    if (evenement.value.estPublic) {
      apiStore.getRessourceConnected(`inter_vachettes/${id}/inscriptions`)
        .then(reponseJSON => {
          inscriptions.value = reponseJSON.member;
        });
    }
  });

function chargerEvenements() {
  if (apiStore.estConnecte) {
    apiStore.getRessourceConnected('utilisateurs/' + apiStore.utilisateurConnecte.id + '/inscriptions')
      .then(reponseJSON => {
        inscriptionsUserConnect.value = reponseJSON['member'];
      });
  }
}

chargerEvenements();

function hasDateConflict(newEvent) {
  return inscriptionsUserConnect.value.some(inscription => {
    const event = inscription.evenements;
    const newEventDebut = new Date(newEvent.dateDebutEvenement);
    const newEventFin = new Date(newEvent.dateFinEvenement);
    const existingEventDebut = new Date(event.dateDebutEvenement);
    const existingEventFin = new Date(event.dateFinEvenement);

    return (newEventDebut < existingEventFin && newEventFin > existingEventDebut);
  });
}

const hideButton = computed((): boolean => {
  if (!apiStore.estConnecte) {
    return true;
  }
  if (!evenement.value.estPublic) {
    return true;
  }
  if (evenement.value.organisateur && evenement.value.organisateur.id === apiStore.utilisateurConnecte.id) {
    return true;
  }
  return inscriptions.value.length >= evenement.value.nbParticipantsMax;
});

const estDejaInscrit = computed((): boolean => {
  return inscriptionsUserConnect.value.some(inscription => {
    return inscription.evenements.id === evenement.value.id;
  });
});

function inscrireUtilisateur() {
  if (!apiStore.estConnecte) {
    notify({
      type: 'warning',
      title: 'Utilisateur non connecté',
      text: 'Veuillez vous connecter pour vous inscrire à un événement.',
      group: 'custom-template'
    });
  } else {
    if (inscriptions.value.length >= evenement.value.nbParticipantsMax) {
      notify({
        type: 'warning',
        title: 'Inscription échouée',
        text: 'Le nombre maximum de participants est atteint.',
        group: 'custom-template'
      });
      return;
    }
    if (hasDateConflict(evenement.value)) {
      notify({
        type: 'warning',
        title: 'Inscription échouée',
        text: 'Vous êtes déjà inscrit à un événement qui se déroule à la même date.',
        group: 'custom-template'
      });
      return;
    }
    const data = {
      participant: `/InterVachettesAPI/public/api/utilisateurs/${apiStore.utilisateurConnecte.id}`,
      evenements: `/InterVachettesAPI/public/api/inter_vachettes/${id}`
    };
    apiStore.createRessource("inscriptions", data)
      .then(response => {
        if (response.success) {
          notify({
            type: 'success',
            title: 'Inscription réussie',
            text: 'Vous êtes inscrit à l\'événement.',
            group: 'custom-template'
          });
        } else {
          notify({
            type: 'warning',
            title: 'Inscription échouée',
            text: response.error || 'Une erreur est survenue.',
            group: 'custom-template'
          });
        }
      });
  }
}


function findMatchingEvent() {
  const eventId = parseInt(id, 10);
  return inscriptionsUserConnect.value.find(inscription => inscription.evenements.id === eventId);
}

const deleteUser = () => {
  const idInscription = findMatchingEvent();
    const confirmation = confirm('Voulez-vous vraiment vous désinscrire ?');
    if (confirmation) {
      apiStore.deleteInscription('inscriptions', idInscription.id)
        .then(() => {
          notify({
            type: 'success',
            title: 'Désinscription réalisé avec succès',
            group: 'custom-template'
          });
          router.push({name: 'accueil'});
        });
    } else {
      notify({
        type: 'info',
        title: 'Désinscription annulée',
        group: 'custom-template'
      });
    }
};


</script>

<template>
  <div class="singleEvenement">
    <section class="presentation-single-evenement">
      <div>
        <div class="indicator"><span></span>Événement</div>
        <h1 class="grand-titre"><span class="color-blue">Intervachettes</span>
          {{ evenement.adresse ? evenement.adresse.split(' ').pop() : '' }}</h1>
        <span class="texte-gris-simple">Parcourez les informations d’un événement, inscrivez vous pour y participer ou y assister.</span>
        <span class="texte-gris-simple"><i class="fi fi-rr-marker color-blue"></i> {{ evenement.adresse }}</span>
        <img src="@/assets/img/deco-points.png" alt="" class="deco">
        <div onclick="window.history.back()" class="bouton fond-bleu"><i class="fi fi-rr-angle-left"></i>Revenir en
          arrière
        </div>
      </div>
      <GoogleMaps v-if="evenement.adresse" id="map" :adresses="[evenement.adresse]" :id-div="'map'"/>
    </section>

    <section class="presentation-description">
      <div class="indicator"><span></span>Description</div>
      <h1 class="grand-titre">Les mots de <br><span class="color-blue">l'organisateur</span></h1>

      <div>
        <i class="fi fi-rr-quote-right reverse color-blue"></i>
        <span class="texte-gris-simple">{{ evenement.description }}</span>
        <i class="fi fi-rr-quote-right color-blue"></i>
      </div>
    </section>

    <section class="autres-infos-event">
      <div class="autres-infos">
        <div class="indicator"><span></span>Participation</div>
        <h1 class="grand-titre">Vous aussi, <br><span class="color-blue">participez</span></h1>

        <span class="texte-gris-simple">
          Vous aussi, inscrivez vous à l'événement en tant que candidat, pour vous affronter contre une autre équipe ! Vous pouvez également vous renseignez sur cet événement, pour y assister en tant que spectateur.
        </span>

        <div class="chiffres-cles">
          <span class="chiffre-cle">
            <span class="chiffre">{{ evenement.nbParticipantsMax - inscriptions.length }}</span>
            <span>{{ evenement.estPublic ? 'Places restantes' : 'Places Totales' }}</span>
          </span>
          <span class="chiffre-cle">
            <span class="chiffre">{{ inscriptions.length || "N/A" }}</span>
            <span>Candidats inscrits</span>
          </span>
        </div>

        <span class="texte-gris-simple"><i
          class="fi fi-rr-marker color-blue"></i> Du {{ new Date(evenement.dateDebutEvenement).toLocaleString("fr") }} au {{
            new Date(evenement.dateFinEvenement).toLocaleString("fr")
          }}</span>
        <span class="texte-gris-simple"><i class="fi fi-rr-calendar-clock color-blue"></i> {{
            evenement.adresse
          }}</span>
        <div v-if="!hideButton">
          <div v-if="!estDejaInscrit" @click="inscrireUtilisateur" class="bouton icon-animation">
            Inscription à l'événement<i class="fi fi-rr-arrow-right"></i>
          </div>
          <div v-else @click="deleteUser" class="bouton icon-animation">
            Quitter l'événement<i class="fi fi-rr-arrow-right"></i>
          </div>
        </div>
      </div>

      <div class="pages-vertes">
        <img src="@/assets/img/deco-infos-event.png" alt="deco" class="deco">
        <div class="infos">
          <h1>Organisé par :</h1>
          <div class="infos-organisateur">
            <div v-if="evenement.organisateur">
              <i class="fi fi-rr-user"></i>
              <span class="texte-gris-simple">{{
                  evenement.organisateur.prenom
                }} {{ evenement.organisateur.nom }}</span>
            </div>
            <div
              @click="router.push({name: 'userAccount', params: {id: evenement.organisateur.id }})"
              class="bouton icon-animation">Voir le compte<i class="fi fi-rr-arrow-right"></i></div>
          </div>
        </div>
      </div>

    </section>

  </div>
</template>

<style scoped>
@import "@/assets/styles/styleSingleEvenement.css";
</style>
