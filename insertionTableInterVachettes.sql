DELETE FROM inscription;
DELETE FROM inter_vachettes;
DELETE FROM utilisateur;


INSERT INTO utilisateur (id, login, roles, password, adresse_mail, biographie, premium, prenom, nom, code_pages_vertes)
VALUES
    (1, 'jeanBon', '["ROLE_ADMIN"]', '$2y$13$i9.5T1oL3Pl/4GXLJS/pWeUfGWE4L3r2Ik0Sp04aNb75xMvBdzW3y', 'jeanBon@example.com', 'Agent secret spécialisé en gadgets improbables.', 1, 'Jean', 'Bon', 'JeanBo'),
    (2, 'paulEmploie', '["ROLE_ORGANISATEUR"]', '$2y$13$i9.5T1oL3Pl/4GXLJS/pWeUfGWE4L3r2Ik0Sp04aNb75xMvBdzW3y', 'paulEmploie@example.com', 'Toujours à côté de la plaque.', 1, 'Paul', 'Emploie', 'PaulEm'),
    (3, 'jeanBonBeur', '[]', '$2y$13$i9.5T1oL3Pl/4GXLJS/pWeUfGWE4L3r2Ik0Sp04aNb75xMvBdzW3y', 'jeanBonBeur@example.com', 'Toujours à la recherche de nouvelles découvertes culinaires.', 0, 'Jean', 'Bonbeur', 'JeanBB'),
    (4, 'alberto', '[]', '$2y$13$i9.5T1oL3Pl/4GXLJS/pWeUfGWE4L3r2Ik0Sp04aNb75xMvBdzW3y', 'alberto@example.com', 'Philosophe amateur, il a toujours une réflexion pertinente.', 0, 'Albert', 'Alberto', 'Albert'),
    (5, 'annieVersaire', '[]', '$2y$13$i9.5T1oL3Pl/4GXLJS/pWeUfGWE4L3r2Ik0Sp04aNb75xMvBdzW3y', 'annieVersaire@example.com', 'Fête chaque jour comme si c\'était le dernier.', 0, 'Annie', 'Versaire', 'AnnieV');


INSERT INTO inter_vachettes (id, organisateur_id, date_debut_evenement, date_fin_evenement, nb_participants_max, nb_spectateurs_max, description, est_public, prix, adresse)
VALUES
    (1, 2, '2024-01-15 10:00:00', '2024-01-15 18:00:00', 20, 100, 'Concours annuel des vachettes, organisé par Paul.', 1, 50, '123 Rue de la Prairie, Paris'),
    (2, 2, '2024-02-10 09:00:00', '2024-02-10 17:00:00', 15, 80, 'Compétition locale des amateurs de vachettes.', 1, 30, '456 Avenue des Champs, Lyon'),
    (3, 1, '2024-03-20 14:00:00', '2024-03-20 20:00:00', 25, 200, 'Grand tournoi des maîtres vachettes.', 1, 100, '789 Boulevard des Arènes, Marseille'),
    (4, 1, '2024-04-05 13:00:00', '2024-04-05 19:00:00', 10, 50, 'Initiation et démonstrations pour les débutants.', 0, 20, '321 Rue des Taureaux, Bordeaux'),
    (5, 2, '2024-05-15 15:00:00', '2024-05-15 22:00:00', 30, 150, 'Festival de clôture avec spectacle et musique.', 1, 75, '654 Route des Fermes, Lille');


INSERT INTO inscription (id, participant_id, evenements_id)
VALUES
    (1, 3, 1),
    (2, 4, 2),
    (3, 5, 3),
    (4, 1, 4),
    (5, 2, 5),
    (6, 4, 1);















