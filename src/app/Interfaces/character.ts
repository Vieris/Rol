import { Clase } from "./clase";
import { Arma } from "./arma";

export interface Character {
    clase?: Clase;
    arma?: Arma;
    skill?: string;
    hp: number;
    armadura: number;
    velocidad: number;
    suerte: number;
    veneno : number;
}

