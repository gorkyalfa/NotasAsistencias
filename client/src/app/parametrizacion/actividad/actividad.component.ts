import { Component, OnInit } from '@angular/core';
import alerta from 'sweetalert2';
import { ActividadService } from '../actividad.service';
import { AsignaturaService } from '../asignatura.service';
import { TipoActividadService } from '../tipo-actividad.service';
import { UsuarioService } from '../../global/usuario.service';
import { Actividad } from '../../models/actividad';
import { Asignatura } from '../../models/asignatura';
import { TipoActividad } from '../../models/tipoActividad';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {
  idAsignatura: number;
  asignaturas: Asignatura[];
  actividades: Actividad[];
  tiposActividad: TipoActividad[];
  actividadesPorBorrar: number[] = [];

  constructor(
    private actividadService: ActividadService,
    private usuarioService: UsuarioService,
    private asignaturaService: AsignaturaService,
    private tipoActividadService: TipoActividadService
  ) {}

  ngOnInit() {
    this.getTiposActividad();
    this.getAsignaturas();
    alerta.fire({
      title: 'Buen trabajo!',
      position: 'top-end',
      type: 'success',
      text: 'Se cargaron los datos',
      showConfirmButton: false,
      timer: 3000
    });
  }

  getTiposActividad(): void {
    this.tiposActividad = this.tipoActividadService.getTiposActividad();
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
    const id = this.usuarioService.getUsuarioActual().id;
    this.asignaturas = this.asignaturaService.getAsignaturas(id);
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
    // TODO : realizar todo en una única llamada con transaccionalidad en el servidor
    // this.spinner = true;
    this.actividadService.saveActividades(this.actividadesPorBorrar, this.actividades).subscribe(
      response => {
        // this.spinner = false;
        alerta.fire({
          title: 'Guardar',
          position: 'top-end',
          type: 'success',
          text: 'Los cambios se grabaron',
          showConfirmButton: false,
          timer: 2000
        });
        this.ngOnInit();
      },
      error => {
        // this.spinner = false;
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
