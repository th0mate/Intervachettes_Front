export interface Utilisateur {
  id: number;
  adresseMail: string;
  login: string;
  premium: boolean;
}

export interface Evenement {
  id: number;
  nom: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
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
