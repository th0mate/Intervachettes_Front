import { reactive } from "vue";
import type {Utilisateur, ApiResponse} from "@/types";

export const apiStore = reactive({
  apiUrl: "http://localhost/InterVachettesAPI/public/api/",
  utilisateurConnecte: null as Utilisateur | null,
  estConnecte: false,

  getAll(ressource: string): Promise<unknown> {
    return fetch(this.apiUrl + ressource).then((reponsehttp) => reponsehttp.json());
  },

  getById(ressource: string, id: number): Promise<unknown> {
    return fetch(this.apiUrl + ressource + "/" + id).then((reponsehttp) => reponsehttp.json());
  },

  getRessourceConnected(ressource: string): Promise<unknown> {
    return fetch(this.apiUrl + ressource, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((reponsehttp) => reponsehttp.json());
  },

  login(login: string, password: string): Promise<ApiResponse> {
    return fetch(this.apiUrl + "auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ login: login, password: password }),
    }).then((reponsehttp) => {
      if (!reponsehttp.ok) {
        return reponsehttp.json().then((reponseJSON) => {
          return { success: false, error: reponseJSON.message };
        });
      } else {
        return reponsehttp.json().then((reponseJSON) => {
          this.utilisateurConnecte = reponseJSON;
          this.estConnecte = true;
          return { success: true };
        });
      }
    });
  },

  async createRessource(ressource: string, data: Record<string, unknown>, refreshAllowed = true): Promise<ApiResponse> {
    const response = await fetch(this.apiUrl + ressource, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true };
    } else if (response.status === 401 && refreshAllowed) {
      const refreshResponse = await this.refresh();
      if (refreshResponse.success) {
        return this.createRessource(ressource, data, false);
      } else {
        return { success: false, error: "Unauthorized, failure to refresh token." };
      }
    } else {
      const responseJSON = await response.json();
      return { success: false, error: responseJSON.message };
    }
  },

  logout(): Promise<ApiResponse> {
    return fetch(this.apiUrl + "token/invalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((reponsehttp) => {
      if (reponsehttp.ok) {
        this.utilisateurConnecte = null;
        this.estConnecte = false;
        return { success: true };
      } else {
        return reponsehttp.json().then((reponseJSON) => {
          return { success: false, error: reponseJSON.message };
        });
      }
    });
  },

  refresh(): Promise<ApiResponse> {
    return fetch(this.apiUrl + "token/refresh", {
      method: "POST",
      credentials: "include",
    }).then((reponsehttp) => {
      if (!reponsehttp.ok) {
        return reponsehttp.json().then((reponseJSON) => {
          return { success: false, error: reponseJSON.message };
        });
      } else {
        return reponsehttp.json().then((reponseJSON) => {
          this.utilisateurConnecte = reponseJSON;
          this.estConnecte = true;
          return { success: true };
        });
      }
    });
  },

  update(ressource: string, data: Record<string, unknown>, id: number, refreshAllowed: boolean = true): Promise<ApiResponse> {
    return fetch(this.apiUrl + ressource + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((reponsehttp) => {
      if (reponsehttp.ok) {
        return reponsehttp.json().then(() => {
          return { success: true };
        });
      } else if (reponsehttp.status == 401 && refreshAllowed) {
        return this.refresh().then(() => this.update(ressource, data, id, false));
      } else {
        return reponsehttp.json().then((reponseJSON) => {
          return { success: false, error: reponseJSON.message };
        });
      }
    });
  },

  delete(ressource: string, id: number): Promise<ApiResponse> {
    return fetch(this.apiUrl + ressource + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((reponsehttp) => {
      if (reponsehttp.ok) {
        this.utilisateurConnecte = null;
        this.estConnecte = false;
        return reponsehttp.text().then((text) => {
          return text ? { success: true, data: JSON.parse(text) } : { success: true };
        });
      } else {
        return reponsehttp.text().then((text) => {
          const reponseJSON = text ? JSON.parse(text) : {};
          return { success: false, error: reponseJSON.message || "Unknown error" };
        });
      }
    });
  },
});
