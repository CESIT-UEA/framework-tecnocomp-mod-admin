import { Topico } from "./Topico";

export interface Modulo {
  id?: number
  nome_modulo: string;
  nome_url: string;
  ebookUrlGeral: string;
  video_inicial: string;
  plataforma_id: string;
  publicado?: boolean;
  topicos?: Topico[];
  usuario_id?: string;
}
