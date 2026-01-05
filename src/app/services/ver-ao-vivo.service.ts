import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VerAoVivoService {
  public currentVideoIndex: number = 0;
  private storageKey = 'dados_completos_do_modulo';
  public dados_completos: any = [];
  notaTotal: number = 0;
  perfilUser = false;
  controll_topico: number = 0

  constructor() {}

  abreMenuUser() {
    this.perfilUser = true;
    console.log('Abrindo menu');
  }

  fechaMenuUser() {
    this.perfilUser = false;
    console.log('Fechou menu User');
  }

  getDadosCompletos(): void {
    this.dados_completos = localStorage.getItem(this.storageKey);
    if (this.dados_completos) {
      this.dados_completos = JSON.parse(this.dados_completos);
      this.notaTotal = this.dados_completos?.userModulo?.nota;

      console.log('Service data 3: ', this.dados_completos);
    }
  }

  setDadosCompletos(dados: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(dados));

    this.getDadosCompletos();
  }

  removeDadosCompletos(): void {
    localStorage.removeItem(this.storageKey);
  }

}
