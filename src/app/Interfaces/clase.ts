import { Arma } from "./arma";

export interface Clase {
    nombre: string;
    skills: Array<string>
    armas: Array<Arma>
}
