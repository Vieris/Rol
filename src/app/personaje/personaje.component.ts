import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../Interfaces/character';
import { Clase } from '../Interfaces/clase';
import { ClaseService } from '../services/clase.service';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.scss']
})
export class PersonajeComponent implements OnInit {

  @Input() public stats: Character;
  @Input() public nombre?: string;

  constructor(private claseService: ClaseService) {
    this.stats = {
      hp:100, 
      armadura:0, 
      velocidad:5, 
      suerte:(5+(Math.floor(Math.random()*3-1))),
      velocidadInicial: 5
    };
  }

  addClase (nombreclase?: string) {
    var statsToChange: Character = this.stats;
    statsToChange=this.claseService.setClass(statsToChange, nombreclase);
    this.stats = statsToChange;
  }

  addSkill (nombreSkill?: string) {
    if (this.stats.clase?.skills) {
      this.stats.skill = nombreSkill ? nombreSkill : this.stats.skill = this.stats.clase?.skills[Math.floor(Math.random()*2)];
    }
  }

  ngOnInit(): void {
  }

}
