import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-componente',
  templateUrl: './crear-componente.component.html',
  styleUrls: ['./crear-componente.component.css']
})
export class CrearComponenteComponent implements OnInit {

  mensaje: string = 'Este es el hijo';
  constructor() { }

  ngOnInit() {
  }
  saludo(value) {
    this.mensaje = value;
    }
}
