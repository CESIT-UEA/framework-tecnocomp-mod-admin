export interface AlunoModulo {
  id: number;
  id_aluno: number;
  id_modulo: number;
  nota: number;
  progresso: number;
  ativo: boolean;

  url_retorno?: string;
  avaliacao?: number;
  comentario?: string;

  Aluno?: {
    id: number;
    nome: string;
    email: string;
  };
}
