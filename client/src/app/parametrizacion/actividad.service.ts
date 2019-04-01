import { Injectable } from '@angular/core';
import { Actividad } from '../models/actividad';
import { ACTIVIDADES } from '../mocks/mock-actividades';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  headers: HttpHeaders;

  constructor(private _http: HttpClient) {}

  getActividades(idDocente: number, idAsignatura: number): Actividad[] {
    // TODO : filtrar por docente y asignatura
    return ACTIVIDADES;
    // return this._http.get(environment.API_URL + 'actividades/get?idDocente='
    // + idDocente + '&idAsignatura=' + idAsignatura, {headers: this.headers});
  }

  saveActividades(actividadesPorBorrar: number[], actividades: Actividad[]) {
    return this._http.post(environment.API_URL + 'actividades/save',
     {'borrar': actividadesPorBorrar, 'nuevas': actividades}, {headers: this.headers});
  }
}
