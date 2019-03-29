import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../actividad.service';
import { Actividad } from 'src/app/models/actividad';
import { UsuarioService } from 'src/app/global/usuario.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {
  actividades: Actividad[];

  constructor(private actividadService: ActividadService, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  getActividades(): void {
    const id = this.usuarioService.getUsuarioActual().id;
    this.actividades = this.actividadService.getActividades(id);
  }
}
