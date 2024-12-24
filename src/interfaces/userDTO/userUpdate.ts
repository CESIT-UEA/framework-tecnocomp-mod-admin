import { User } from "../user";

export interface UserUpdate extends User {
  senhaAtual: string;
}
