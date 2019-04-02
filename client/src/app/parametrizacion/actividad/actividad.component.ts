import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import alerta from 'sweetalert2';

import { Actividad } from '../../models/actividad';
import { Asignatura } from '../../models/asignatura';
import { TipoActividad } from '../../models/tipoActividad';

import { ActividadService } from '../actividad.service';
import { AsignaturaService } from '../asignatura.service';
import { TipoActividadService } from '../tipo-actividad.service';
import { UsuarioService } from '../../global/usuario.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {
  idAsignatura: number;
  actividades: Actividad[];
  actividadesPorBorrar: number[] = [];
  asignaturas: Asignatura[];
  tiposActividad: TipoActividad[];

  constructor(
    private spinner: NgxSpinnerService,
    private actividadService: ActividadService,
    private asignaturaService: AsignaturaService,
    private tipoActividadService: TipoActividadService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.actividadesPorBorrar = [];
    this.getTiposActividad();
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
    this.spinner.show();
    this.actividadService.getActividades(idDocente, this.idAsignatura).subscribe(
      response => {
        this.actividades = response as Actividad[];
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        alerta.fire({
          title: 'Consultar',
          position: 'top-end',
          type: 'error',
          text: 'Los datos no se cargaron',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  getAsignaturas(): void {
    this.spinner.show();

    const idDocente = this.usuarioService.getUsuarioActual().id;
    this.asignaturaService.getAsignaturas(idDocente).subscribe(
      response => {
        this.asignaturas = response as Asignatura[];
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        alerta.fire({
          title: 'Consultar',
          position: 'top-end',
          type: 'error',
          text: 'Los datos no se cargaron',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  getTiposActividad(): void {
    this.spinner.show();
    this.tipoActividadService.getTiposActividad().subscribe(
      response => {
        this.tiposActividad = response as TipoActividad[];
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        alerta.fire({
          title: 'Consultar',
          position: 'top-end',
          type: 'error',
          text: 'Los datos no se cargaron',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  asignaturaChange(idAsignatura: number): void {
    this.getActividades();
  }

  borrar(actividad: Actividad): void {
    const porBorrar = this.actividades.indexOf(actividad);
    if (this.actividades[porBorrar].id !== 0) {
      this.actividadesPorBorrar.push(this.actividades[porBorrar].id);
    }
    this.actividades.splice(porBorrar, 1);
  }

  nuevo(): void {
    const nuevaActividad: Actividad = {
      id: 0,
      idAsignatura: this.idAsignatura,
      idDocente: this.usuarioService.getUsuarioActual().id,
      idTipoActividad: this.tiposActividad[0].id,
      creacion: new Date(),
      entrega: new Date(),
      nombre: 'Nueva actividad',
      descripcion: ''
    };
    this.actividades.push(nuevaActividad);
  }

  grabar(): void {
    this.spinner.show();
    this.actividadService.saveActividades(this.actividadesPorBorrar, this.actividades).subscribe(
      response => {
        this.ngOnInit();
        this.spinner.hide();
        alerta.fire({
          title: 'Guardar',
          position: 'top-end',
          type: 'success',
          text: 'Los cambios se grabaron',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error => {
        this.spinner.hide();
        alerta.fire({
          title: 'Guardar',
          position: 'top-end',
          type: 'error',
          text: 'Los cambios no se grabaron',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }
}
