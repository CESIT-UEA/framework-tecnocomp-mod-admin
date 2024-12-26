import { Exercicio } from "./Exercicio";
import { Referencia } from "./Referencia";
import { SaibaMais } from "./SaibaMais";

export interface Topico {
  id?: number
  nome_topico: string;
  ebookUrlGeral?: string;
  textoApoio?: string;
  VideoUrls: string[];
  SaibaMais: SaibaMais[];
  Referencias: Referencia[];
  Exercicios: Exercicio[];
}
