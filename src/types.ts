export interface Utilisateur {
  id: number;
  adresseMail: string;
  login: string;
  premium: boolean;
  nom: string;
  prenom: string;
  code_pages_vertes : string;
}

export interface Evenement {
  id: number;
  nom: string;
  dateDebutEvenement: string;
  dateFinEvenement: string;
  adresse: string;
  description: string;
  prix: number;
  organisateur: Utilisateur;
}

export interface Utilisateur {
  id: number;
  adresseMail: string;
  login: string;
  codePagesVertes: string;
  Description: string;
  Facebook: string;
}
