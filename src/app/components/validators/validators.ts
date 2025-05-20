import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";


export function senhaForte(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => { 
        const value = control.value
        if (!value){
            return null;
        }
        const minusculos = /[a-z]+/.test(value);
        const numericos = /[0-9]+/.test(value);
        const simbolos = /[!@#$%&*-+/~=|]+/.test(value)
        const senhaValida = minusculos && numericos && simbolos

        return !senhaValida ? { senhaForte: true } : null;
    }
}

export function noOnlyWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value && control.value.trim().length === 0) {
            return { noOnlyWhitespace: true }; // Retorna erro se for só espaços em branco
          }
          return null; // Válido se contiver caracteres visíveis
    }
}