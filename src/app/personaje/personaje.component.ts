import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  public armaElegida: string = "";

  constructor(private claseService: ClaseService) {
    this.stats = this.claseService.setIntialStats();
  }

  addClase (nombreclase?: string) {
    var statsToChange: Character = this.stats;
    statsToChange=this.claseService.setClass(statsToChange, nombreclase);
    this.stats = statsToChange;
  }

  addSkill (nombreSkill?: string) {
    if (this.stats.clase?.skills) {
      this.stats.skill = nombreSkill ? nombreSkill : this.stats.clase?.skills[Math.floor(Math.random()*2)];
    }
  }

  addArma (nombreArma?: string) {
    if (this.stats.clase?.armas) {
      this.stats = this.claseService.setArma(this.stats, nombreArma);
    }
  }

  ngOnInit(): void {
  }

}
