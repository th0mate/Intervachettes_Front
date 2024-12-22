export interface Utilisateur {
  id: number;
  plainPassword: string;
  adresseMail: string;
  login: string;
  premium: boolean;
  nom: string;
  prenom: string;
  code_pages_vertes : string;
  biographie : string;
  facebook : string;
}

export interface Evenement {
  id: number;
  nom: string;
  dateDebutEvenement: string;
  dateFinEvenement: string;
  adresse: string;
  nbParticipantsMax: number;
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

export interface Inscription {
  id: number;
  participant: Utilisateur;
  evenements: Evenement;
}

export interface ApiResponse {
  success: boolean;
  error?: string;
  [key: string]: unknown;
}
