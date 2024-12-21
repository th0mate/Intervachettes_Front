import {reactive} from "vue";
export const apiStore = reactive ({
  apiUrl: "http://localhost/InterVachettesAPI/public/api/",
  utilisateurConnecte: null,
  estConnecte: false,

  getAll(ressource: string): Promise<any> {
    return fetch(this.apiUrl + ressource)
      .then(reponsehttp => reponsehttp.json())
  },

  getById(ressource: string, id: number): Promise<any> {
    return fetch(this.apiUrl + ressource + "/" + id)
      .then(reponsehttp => reponsehttp.json())
  },

  getRessourceConnected(ressource:string):Promise<any>{
    return fetch(this.apiUrl+ressource,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(reponsehttp =>
        reponsehttp.json())
  },

  login(login: string, password: string): Promise<{ success: boolean, error?: string }> {
    //console.log("Données envoyées LOGIN:" + login + " || " + password);
    return fetch(this.apiUrl + "auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({login: login, password: password})
    })
      .then(reponsehttp => {
        if (!reponsehttp.ok) {
          return reponsehttp.json()
            .then(reponseJSON => {
              return {success: false, error: reponseJSON.message};
            })
        } else {
          return reponsehttp.json()
            .then(reponseJSON => {
              this.utilisateurConnecte = reponseJSON;
              this.estConnecte = true;
              //console.log('Aprees connexion', this.estConnecte);
              return {success: true};
            })
        }
      })
  },




    async createRessource(ressource: string, data: any, refreshAllowed = true): Promise<{ success: boolean, error?: string }> {
      //console.log("Données envoyées createRessource:", JSON.stringify(data));
      const response = await fetch(this.apiUrl + ressource, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
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

    async refresh(): Promise<any> {
      const response = await fetch(this.apiUrl + "token/refresh", {
        method: "POST",
        credentials: 'include'
      });

      if (!response.ok) {
        const responseJSON = await response.json();
        return { success: false, error: responseJSON.message };
      } else {
        const responseJSON = await response.json();
        this.utilisateurConnecte = responseJSON.id;
        this.estConnecte = true;
        return { success: true };
      }
    },



  logout(): Promise<any> {
    return fetch(this.apiUrl + "token/invalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(reponsehttp => {
        console.log(reponsehttp);
        if (reponsehttp.ok) {
          this.utilisateurConnecte = null;
          this.estConnecte = false;
        } else {
          return reponsehttp.json()
            .then(reponseJSON => {
              return {success: false, error: reponseJSON.message};
            })
        }
      })
  },

  refresh(): Promise<any> {
    return fetch(this.apiUrl + "token/refresh", {
      method: "POST",
      credentials: 'include'
    })
      .then(reponsehttp => {
        if (!reponsehttp.ok) {
          return reponsehttp.json()
            .then(reponseJSON => {
              return {success: false, error: reponseJSON.message};
            })
        } else {
          return reponsehttp.json()
            .then(reponseJSON => {
              this.utilisateurConnecte = reponseJSON;
              this.estConnecte = true;
              return {success: true};
            })
        }
      })
  },

  update(ressource: string, data: any, id: number, refreshAllowed: boolean = true): Promise<any> {
    return fetch(this.apiUrl + ressource + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(reponsehttp => {
        if (reponsehttp.ok) {
          return reponsehttp.json()
            .then(() => {
              return {success: true};
            })
        } else if (reponsehttp.status == 401 && refreshAllowed) {
          return this.refresh()
            .then(
              () => this.update(ressource, data, id, false)
            )
        } else {
          return reponsehttp.json()
            .then(reponseJSON => {
              return {success: false, error: reponseJSON.message};
            })
        }
      })
  },

    delete(ressource, id) {
      return fetch(this.apiUrl + ressource + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((reponsehttp) => {
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


})
