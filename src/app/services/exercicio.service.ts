import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExercicioService {
  private baseUrl = environment.baseUrl;
  
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  setQuestaoAberta(id_topico: number, valor: boolean): Observable<any>{
    return this.http.patch<any>(`${this.baseUrl}/api/topico/${id_topico}/exercicio`, { valor })
  }
  
}
