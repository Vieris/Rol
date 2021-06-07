import { Injectable } from '@angular/core';
import { Clase } from 'src/app/Interfaces/clase';
import { Character } from '../Interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  private claseData!: Array<Clase>;

  constructor() {
    this.initData();
  }

  public getSingleClass = (nombre: string): Clase => this.claseData.filter(x => x.nombre === nombre)[0];
  public getRandomClass = (): Clase => this.claseData[Math.floor(Math.random()*2)];

  setClass(personaje: Character, claseElegida?: string): Character{
    var personajeMod: Character = personaje;
    var claseNueva: Clase;
    if (!claseElegida){
      claseNueva = this.getRandomClass();
    }
    else claseNueva = this.getSingleClass(claseElegida);
    personajeMod.clase=claseNueva;
    //setClassStats(personajeMod);
    return personajeMod;
  }

  setClassStats(statsBase: Character): Character{
    var statsMod: Character = statsBase;
    // if (statsMod.clase.nombre=='asesino')
    return statsMod;
  }

  private initData(): void {
    this.claseData = [
      {
        nombre: 'asesino',
        skills: [ 'sigilo', 'veneno' ]
      },
      {
        nombre: 'guerrero',
        skills: [ 'derribo', 'adrenalina' ]
      }
    ]
  }

}
