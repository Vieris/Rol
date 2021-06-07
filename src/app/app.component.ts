import { Component, OnInit, ViewChild } from '@angular/core';
import { Character } from './Interfaces/character';
import { PersonajeComponent } from './personaje/personaje.component';
import { ClaseService } from './services/clase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rol';
  @ViewChild(PersonajeComponent)
  private jugador!: PersonajeComponent;

  constructor() {}

  modHP (valor: number) {
    let statsToChange: Character;
    statsToChange = this.jugador.stats;
    statsToChange.hp += valor;
    this.jugador.stats = statsToChange;
  }

}
