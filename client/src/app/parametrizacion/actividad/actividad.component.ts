import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import alerta from 'sweetalert2';

import { Actividad } from '../../models/actividad';
import { AsignaturaParalelo } from '../../models/asignaturaParalelo';
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
  idAsignaturaParalelo: 0;
  actividades: Actividad[] = new Array<Actividad>();
  actividadesPorBorrar: number[] = new Array<number>();
  asignaturasParalelo: AsignaturaParalelo[] = new Array<AsignaturaParalelo>();
  tiposActividad: TipoActividad[] = new Array<TipoActividad>();

  constructor(
    private spinner: NgxSpinnerService,
    private actividadService: ActividadService,
    private asignaturaService: AsignaturaService,
    private tipoActividadService: TipoActividadService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.idAsignaturaParalelo = 0;
    this.actividades = new Array<Actividad>();
    this.actividadesPorBorrar = new Array<number>();
    this.asignaturasParalelo = new Array<AsignaturaParalelo>();
    this.tiposActividad = new Array<TipoActividad>();
    this.getTiposActividad();
    this.getAsignaturasParalelo();
  }

  getActividades(): void {
    if (this.idAsignaturaParalelo == null) {
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
    this.spinner.show();
    this.actividadService.getActividades(this.idAsignaturaParalelo).subscribe(
      response => {
        if (Object.keys(response['actividades']).length === 0) {
          this.actividades = new Array<Actividad>();
        } else {
          this.actividades = response['actividades'] as Actividad[];
        }
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

  getAsignaturasParalelo(): void {
    this.spinner.show();

    const idDocente = this.usuarioService.getUsuarioActual().id;
    this.asignaturaService.getAsignaturas(idDocente).subscribe(
      response => {
        this.asignaturasParalelo = response['asignaturas'] as AsignaturaParalelo[];
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
        this.tiposActividad = response['tiposActividad'] as TipoActividad[];
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

  asignaturaParaleloChange(idAsignatura: number): void {
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
    if (
      this.idAsignaturaParalelo == null ||
      this.idAsignaturaParalelo === 0 ||
      this.tiposActividad == null ||
      this.tiposActividad.length === 0
    ) {
      alerta.fire({
        title: 'Creación',
        position: 'top-end',
        type: 'warning',
        text: 'No se pudo crear una actividad, no hay datos',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    const nuevaActividad: Actividad = {
      id: 0,
      idAsignaturaParalelo: this.idAsignaturaParalelo,
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
