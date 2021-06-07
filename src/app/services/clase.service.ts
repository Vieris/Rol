import { Injectable } from '@angular/core';
import { Clase } from 'src/app/Interfaces/clase';
import { Arma } from '../Interfaces/arma';
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
  public getSingleArma = (nombre: string, clase: Clase): Arma => clase.armas.filter(x => x.nombre === nombre)[0];
  public getRandomArma = (clase: Clase): Arma => clase.armas[Math.floor(Math.random()*2)];

  setClass(personaje: Character, claseElegida?: string): Character{
    var personajeMod: Character = personaje;
    var armaNueva: Clase;
    if (!claseElegida){
      armaNueva = this.getRandomClass();
    }
    else armaNueva = this.getSingleClass(claseElegida);
    personajeMod.clase=armaNueva;
    return this.setClassStats(personajeMod);
  }

  setIntialStats(): Character{
    var statsMod: Character;
    statsMod = {
      hp:100, 
      armadura:15, 
      velocidad:5, 
      suerte:(5+(Math.floor(Math.random()*3-1))),
      veneno: 0
    };
    return statsMod;
  }

  setClassStats(statsBase: Character): Character{
    var statsMod: Character = statsBase;
    if (statsMod.clase?.nombre=='asesino'){
      statsMod.velocidad+=10;
    }
    else if (statsMod.clase?.nombre=='guerrero'){
      statsMod.armadura+=15;
    }
    return statsMod;
  }

  setArma(statsBase: Character, armaElegida?: string){
    var statsMod: Character = statsBase;
    if (statsMod.clase){
      var armaNueva: Arma;
      if (!armaElegida){
        armaNueva = this.getRandomArma(statsMod.clase);
      }
      else armaNueva = this.getSingleArma(armaElegida, statsMod.clase);
      statsMod.arma = armaNueva;
      if (statsMod.arma.rango) statsMod.velocidad+=5;
      if (statsMod.arma.nombre==='Delirio y Cordura') statsMod.armadura+=5;
    }
    return statsMod;
  }

  combatir(jugador1: Character, jugador2: Character): Array<Character>{
    var orden: boolean;
    var primero: Character;
    var segundo: Character;
    if (jugador1.velocidad>jugador2.velocidad) {
      primero = jugador1;
      segundo = jugador2;
      orden = true;
    }
    else if (jugador1.velocidad<jugador2.velocidad) {
      primero = jugador2;
      segundo = jugador1;
      orden = false;
    }
    else{
      if (Math.random()<0.5){
        primero = jugador1;
        segundo = jugador2;
        orden = true;
      }
      else{
        primero = jugador2;
        segundo = jugador1;
        orden = false;
      }
    }
    var resultados : Array<Character>;
    segundo = this.atacar(primero, segundo);
    if (segundo.hp>0) setTimeout(()=>{primero = this.atacar(segundo, primero);},1000)
    resultados = orden ?  [primero, segundo] : [segundo, primero];
    return resultados;

  }

  atacar(atacante: Character, defensor: Character): Character{
    //var contaciertos = 0;
    //var concrit = 0;
    if (atacante.arma){
      if (atacante.skill==='adrenalina'){
        if (atacante.hp<90) atacante.arma.daño += 1;
        else if (atacante.hp<50) atacante.arma.daño += 2;
        else if (atacante.hp<10) atacante.arma.daño += 10;
      }
      for (let index = 0; index < atacante.arma.golpes; index++) {
        var crit: boolean = false;
        var daño: number = 0;
        var dañocrit: number = 0;
        var intento = Math.round(Math.random()*10)-Math.round(atacante.suerte*0.099);
        if (atacante.skill==='sigilo') intento = 0;
        var req : number = atacante.arma.precision;
        if (defensor.skill==='brutalidad') {
          req = req * 0.8;
          if (intento==0){
            intento=1;
          }
        }
        if (intento<=req) {
          var trycrit = Math.random()*0.5*atacante.suerte*0.24;
          crit = !!Math.round(trycrit);
          if (intento==0) {
            crit=true;
            //contcrit++;
          }
          //atacante.contadores.contaciertos++;
          if (atacante.skill==='veneno') defensor.veneno++;
          var reducciondaño: number = (defensor.armadura*0.02)-(atacante.suerte*Math.random())*0.1;
          if (reducciondaño<0) reducciondaño = 0;
          daño = atacante.arma.daño;
          dañocrit = (atacante.arma.precision*0.8)*(Math.random()*0.1);
          if (atacante.skill!=='sigilo' && defensor.skill!=='brutalidad') dañocrit += 0.5;
          if (dañocrit>1) dañocrit=1;
          if (dañocrit<0.1) dañocrit=0.1;
          if (crit) daño += daño*(dañocrit);
          var herida = Math.round(daño*(1-reducciondaño));
          defensor.hp -= herida;
        }
        if (defensor.veneno>0) defensor.hp -= Math.round(1.5*(1-0.02*defensor.suerte)*defensor.veneno);
        if (defensor.hp<0) defensor.hp=0;
      }
    }
    return defensor;
  }

  private initData(): void {
    this.claseData = [
      {
        nombre: 'asesino',
        skills: [ 'sigilo', 'veneno' ],
        armas: [
          { nombre: 'Hoja de la noche',
            daño: 18,
            golpes: 1,
            precision: 9,
            descripcion: 'una daga de una hoja ligera, pero motífera.',
            rango: false
          },
          { nombre: 'Centellas en la sombra',
            daño: 7,
            golpes: 3,
            precision: 4,
            descripcion: 'cuchillas ligeras, pero eficaces, que se lanzan de 3 en 3.',
            rango: true
          }
        ]
      },
      {
        nombre: 'guerrero',
        skills: [ 'brutalidad', 'adrenalina' ],
        armas: [
          { nombre: 'Castigo',
            daño: 25,
            golpes: 1,
            precision: 6,
            descripcion: 'un imponente mandoble de acero forjado por enanos.',
            rango: false
          },
          { nombre: 'Delirio y Cordura',
            daño: 7,
            golpes: 2,
            precision: 7,
            descripcion: 'un equilibrado dúo formado por una espada letal y un robusto escudo.',
            rango: false
          }
        ]
      }
    ]
  }

}
