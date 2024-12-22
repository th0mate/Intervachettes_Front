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

export interface UtilisateurPagesVertes {
  id: number;
  login: string;
  roles: string[];
  adresseEmail: string;
  code: string;
  estVisible: boolean;
  prenom: string;
  nom: string;
  telephone: string;
  facebook: string;
  dateDerniereConnexion: Date;
  dateDerniereEdition: Date;
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
