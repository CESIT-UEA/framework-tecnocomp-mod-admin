import { Alternativa } from "./Alternativa";

export interface Exercicio {
  questao: string;
  alternativas: Alternativa[];
  aberta: boolean,
  resposta_esperada: string
}
