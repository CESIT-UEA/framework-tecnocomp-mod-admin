import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  baseURL = environment.baseUrl

  constructor(private http: HttpClient) { console.log(this.baseURL)}

  uploadFile(file: File, nomeModulo: string, url: string){
    if (!this.isValidFileType(file)) throw new Error('Tipo de arquivo não permitido')
    
    const formData = new FormData();
    formData.append('file', file, file.name)
    formData.append('nomeModulo', nomeModulo);
    return this.http.post(url, formData)
  }

  isValidFileType(file: File): boolean {
    const allowedTypes = ['application/pdf']
    return allowedTypes.includes(file.type)
  }

  getFileModuloByName(name: string){
    return this.http.get(`${this.baseURL}/api/modulos/file/${name}`)
  }

}
