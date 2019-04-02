import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import alerta from 'sweetalert2';

import { Actividad } from 'src/app/models/actividad';
import { Asignatura } from 'src/app/models/asignatura';
import { Estudiante } from 'src/app/models/estudiante';
import { TipoActividad } from '../../models/tipoActividad';

import { ActividadService } from 'src/app/parametrizacion/actividad.service';
import { AsignaturaService } from '../../parametrizacion/asignatura.service';
import { EstudianteService } from '../../calificacion/estudiante.service';
import { TipoActividadService } from '../../parametrizacion/tipo-actividad.service';
import { UsuarioService } from '../../global/usuario.service';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss']
})
export class NotaComponent implements OnInit {
  idAsignatura: number;
  actividades: Actividad[];
  asignaturas: Asignatura[];
  estudiantes: Estudiante[];
  tiposActividad: TipoActividad[];

  constructor(
    private spinner: NgxSpinnerService,
    private actividadService: ActividadService,
    private asignaturaService: AsignaturaService,
    private estudianteService: EstudianteService,
    private tipoActividadService: TipoActividadService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.getAsignaturas();
  }

  getActividades(): void {
    if (this.idAsignatura == null) {
      alerta.fire({
        title: 'Valor inválido',
        position: 'top-end',
        type: 'warning',
        text: 'Seleccione la asignatura',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    const idDocente = this.usuarioService.getUsuarioActual().id;
    this.actividades = this.actividadService.getActividades(idDocente, this.idAsignatura);
  }

  getAsignaturas(): void {
    const idDocente = this.usuarioService.getUsuarioActual().id;
    this.asignaturas = this.asignaturaService.getAsignaturas(idDocente);
  }

  getEstudiantes(): void {
    this.estudiantes = this.estudianteService.getEstudiantes(this.idAsignatura);
  }

  getTiposActividad(): void {
    this.tiposActividad = this.tipoActividadService.getTiposActividad();
  }

  asignaturaChange(idAsignatura: number): void {
    this.getActividades();
  }

  grabar(): void {}
}
