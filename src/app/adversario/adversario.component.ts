import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../Interfaces/character';
import { Clase } from '../Interfaces/clase';
import { ClaseService } from '../services/clase.service';

@Component({
  selector: 'app-adversario',
  templateUrl: './adversario.component.html',
  styleUrls: ['./adversario.component.scss']
})
export class AdversarioComponent implements OnInit {

  @Input() public stats: Character;
  @Input() public nombre?: string;

  constructor(private claseService: ClaseService) {
    this.stats = this.claseService.setIntialStats();
    this.stats = this.claseService.setClass(this.stats);
  }

  addClase (nombreclase?: string) {
    var statsToChange: Character = this.stats;
    statsToChange=this.claseService.setClass(statsToChange, nombreclase);
    this.stats = statsToChange;
  }

  ngOnInit(): void {
    if (this.stats.clase?.skills){
      this.stats.skill = this.stats.clase.skills[Math.floor(Math.random()*2)];
    }
    if (this.stats.clase?.armas){
      this.stats = this.claseService.setArma(this.stats);
    }
  }

}
