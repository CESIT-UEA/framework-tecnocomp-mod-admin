import { Topico } from "../topico/Topico";
import { FichaTecnica } from "./FichaTecnica";
import { ReferenciaModulo } from "./referencia-modulo.interface";
import { Vantagem } from "./vantagem.interface";

export interface Modulo {
  id?: number
  nome_modulo: string;
  nome_url: string;
  ebookUrlGeral: string;
  video_inicial: string;
  uuid?:string;
  filesDoModulo?: string;
  publicado?: boolean;
  template?: boolean;
  topicos?: Topico[];
  ficha_tecnica?: FichaTecnica;
  referenciaModulo?:ReferenciaModulo[];
  vatagens?:Vantagem[]
  usuario_id?: string;
}
