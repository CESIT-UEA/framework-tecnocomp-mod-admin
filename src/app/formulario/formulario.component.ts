import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit{
    urlApi: string = `http://localhost:3100/cadastro_lms`
    capturaValor!: any 
    tokenStorage!: string | null;

    formulario: FormGroup = new FormGroup({
        nomeCliente: new FormControl('', Validators.required),
        urlLms: new FormControl('', Validators.required),
        plataformaNome: new FormControl('', Validators.required),
        idCliente: new FormControl('',Validators.required)
    })

    constructor(private http: HttpClient, private route: Router){ }

    ngOnInit() {
      
    }
    enviarFormulario(){
        if (this.formulario.valid == false){
            console.log("Preencha todos os campos")
            return 
        } else{
          console.log(this.formulario.value.urlLms)
          console.log(this.formulario.value.criarModulo)
          const headers = new HttpHeaders({
              'Content-Type': 'application/json'
              
         })

           const nomeCliente: string = this.formulario.value.nomeCliente
           const url: string = this.formulario.value.urlLms
           const plataformaNome: string = this.formulario.value.plataformaNome
           const idCliente: string = this.formulario.value.idCliente

           const body = {url, plataformaNome, idCliente, nomeCliente}
      
           return this.http.post(this.urlApi, body).subscribe(data=>{
                this.capturaValor = data
                console.log(this.capturaValor)
           })
       }

        
    }
  }

