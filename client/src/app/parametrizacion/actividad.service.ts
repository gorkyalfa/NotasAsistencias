import { Injectable } from '@angular/core';
import { Actividad } from '../models/actividad';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  headers: HttpHeaders;

  constructor(private _http: HttpClient) {}

  getActividades(idDocente: number, idAsignaturaParalelo: number) {
    return this._http.get(
      environment.API_URL + 'actividades/get?idDocente=' + idDocente + '&idAsignaturaParalelo=' + idAsignaturaParalelo,
      { headers: this.headers }
    );
  }

  saveActividades(actividadesPorBorrar: number[], actividades: Actividad[]) {
    return this._http.post(
      environment.API_URL + 'actividades/save',
      { borradas: actividadesPorBorrar, modificadas: actividades },
      { headers: this.headers }
    );
  }
}
