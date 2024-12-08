export interface Utilisateur {
  id: number;
  adresseMail: string;
  login: string;
  premium: boolean;
}

export interface Evenement {
  id: number;
  nom: string;
  date: string;
  lieu: string;
  description: string;
  prix: number;
  organisateur: Utilisateur;
}
