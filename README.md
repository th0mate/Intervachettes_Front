# Rendus des projets webs



## Liens des projets

- [PagesVertes (Annuaire Symfony)](https://webinfo.iutmontp.univ-montp2.fr/~audouy/pagesvertes/public/)
- [InterVachettes - API (API REST Symfony)](https://webinfo.iutmontp.univ-montp2.fr/~loyet/InterVachettesAPI/public/api)
- [InterVachettes - Front (Front VueJS)](https://webinfo.iutmontp.univ-montp2.fr/~loyet/intervachettes/)

Le premier projet (PagesVertes) s'est fait avant l'arrivée de Sascha Levy dans le groupe. Les autres projets (InterVachettes) ont été réalisés avec Sascha Levy.


## Repository des projets

- [PagesVertes (Annuaire Symfony)](https://gitlabinfo.iutmontp.univ-montp2.fr/projetweb1/annuairesymfony)
- [InterVachettes - API (API REST Symfony)](https://gitlabinfo.iutmontp.univ-montp2.fr/projetweb1/intervachettes)
- [InterVachettes - Front (Front VueJS)](https://gitlabinfo.iutmontp.univ-montp2.fr/projetweb1/intervachettesfront)


## Répartition des tâches

### InterVachettesAPI
- Lorick :
    - Sécurité de l'API
    - Groupes de normalisation, dénormalisation, validation
    - Gestion des utilisateurs : POST, DELETE, PATCH, GET...
    - Autorisations ADMIN
    - Permission de l'organisateur de l'événement
    - Assignation automatique de l'organisateur à un événement créé
    - Hachage mot de passe utilisateur


- Thibaut :
    - Liste des événements d'un utilisateur
    - Liste des participants d'un evenement s'il est publique.
    - L'organisateur de l'évènement ou l'admmin peuvent voir la liste des participants même si c'est privée.
    - Gestion des inscriptions
    - Inscrire ou désinscrire des utilisateurs à des évènements
    - Assignation de l'utilisateur connecté à un évènement (pour l'inscription)
    - Création d'un évènement par un organisateur uniquement
    - Gestion de la sécurité (VOTERS)
    - Générateur de groupes



- Thomas :
    - Gestion des événements : POST, DELETE, PATCH, GET...
    - Groupes de normalisation, dénormalisation, validation
    - Authentification utilisateur
    - Mise en place des JWT
    - Groupe evenement:read
    - Ajout des APIProperty
    - Création de la BD
    - Initialisation du projet


- Sascha :
    - Optimisation, vérification et documentation du code



InterVachettesAPI
- Lorick
    - Initialisation de l'apiStore
    - Connexion et inscription des utilisateurs
    - Gestion et suppression de comptes
    - Modification de l'API Symfony
    - Lien avec l'API pour les singleEvenements et les tinyEvenement
    - Possibilité pour un utilisateur de quitter un événement
    - Gestion du refresh token avec JWT


- Thibaut
    - Inscription des utilisateurs
    - Affichage de la liste des événements
    - Création des événements
    - Réalisation de scripts SQL pour peupler les bases de données
    - Affichage des événements en lien avec les utilisateurs (vueCompte)
    - Publication de PagesVertes sur le webinfo
    - Lien entre intervachettes et PagesVertes
    - Modification de l'API Symfony


- Thomas
    - Visuels du site (HTML, CSS)
    - Responsive du site
    - Initialisation du projet
    - Création des routes
    - Publication des projets interVachettes sur le webinfo (API et Front)
    - Modification de l'API Symfony
    - Différents liens entre le front et l'API intervachettes
    - Passage des pages au validateur HTML
    - Affichage de la liste des événements
    - Création des composants et des vues
    - Fonctionnalités de recherche et API Google Maps


- Sascha


