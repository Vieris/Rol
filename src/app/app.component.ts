import { Component, OnInit, ViewChild } from '@angular/core';
import { AdversarioComponent } from './adversario/adversario.component';
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
  public lockCombat: boolean = false;
  public end: boolean = false;
  @ViewChild(PersonajeComponent)
  private jugador!: PersonajeComponent;

  @ViewChild(AdversarioComponent)
  private enemigo!: AdversarioComponent;

  constructor(private claseService: ClaseService) {}

  atacar () {
    if (this.jugador.stats.arma){
      var statsResultantes: Array<Character>;
      setTimeout(()=>{statsResultantes = this.claseService.combatir(this.jugador.stats, this.enemigo.stats);},500)
      setTimeout(()=>{
        this.lockCombat = false;
        this.jugador.stats = statsResultantes[0];
        this.enemigo.stats = statsResultantes[1];
        this.checkDead();
      },1700)
    }
  }

  checkDead () {
    if (this.jugador.stats.hp<=0 || this.enemigo.stats.hp<=0){
      this.lockCombat = true;
      this.end = true;
    } 
  }

  restart() {
    location.reload();
  }

}
