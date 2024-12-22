DELETE FROM utilisateur;

INSERT INTO utilisateur(id, login, roles, password, adresse_email, code, est_visible, prenom, nom, telephone, facebook, date_derniere_connexion, date_derniere_edition)
VALUES
    (1, 'jeanBon', '["ROLE_ADMIN"]', '$2y$13$i9.5T1oL3Pl/4GXLJS/pWeUfGWE4L3r2Ik0Sp04aNb75xMvBdzW3y', 'jeanBon@example.com', 'JeanBo', 1, 'Jean', 'Bon', '0606060606', 'JeanBoFacebook', '2024-01-15 10:00:00', '2024-01-15 10:00:00'),
    (2, 'paulEmploie', '[]', '$2y$13$i9.5T1oL3Pl/4GXLJS/pWeUfGWE4L3r2Ik0Sp04aNb75xMvBdzW3y', 'paulEmploie@example.com', 'PaulEm', 1, 'Paul', 'Emploie', '0707070707', 'PaulEmFaceBook', '2024-01-15 10:00:00', '2024-01-15 10:00:00'),
    (3, 'jeanBonBeur', '[]', '$2y$13$i9.5T1oL3Pl/4GXLJS/pWeUfGWE4L3r2Ik0Sp04aNb75xMvBdzW3y', 'jeanBonBeur@example.com', 'JeanBB', 0, 'Jean', 'Bonbeur', '0808080808', 'JeanBBFaceBook', '2024-01-15 10:00:00', '2024-01-15 10:00:00'),
    (4, 'alberto', '[]', '$2y$13$i9.5T1oL3Pl/4GXLJS/pWeUfGWE4L3r2Ik0Sp04aNb75xMvBdzW3y', 'alberto@example.com', 'Albert', 0, 'Albert', 'Alberto', '0909090909', 'AlbertFaceBook', '2024-01-15 10:00:00', '2024-01-15 10:00:00'),
    (5, 'annieVersaire', '[]', '$2y$13$i9.5T1oL3Pl/4GXLJS/pWeUfGWE4L3r2Ik0Sp04aNb75xMvBdzW3y', 'annieVersaire@example.com', 'AnnieV', 0, 'Annie', 'Versaire', '0505050505', 'AnnieFaceBook', '2024-01-15 10:00:00', '2024-01-15 10:00:00');
