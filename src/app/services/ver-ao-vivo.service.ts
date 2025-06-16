import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VerAoVivoService {
  constructor() {}

  perfilUser = false;

  abreMenuUser() {
    this.perfilUser = true;
    console.log('Abrindo menu');
  }
}
