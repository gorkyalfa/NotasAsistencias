import { Injectable } from '@angular/core';
import { Actividad } from '../models/actividad';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HeaderService } from '../global/header.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  constructor(private _http: HttpClient, private headerService: HeaderService) {}

  getActividades(idAsignaturaParalelo: number) {
    return this._http.get(
      environment.API_URL + 'actividad/idasignaturaparalelo/' + idAsignaturaParalelo,
      { headers: this.headerService.getSecurity() }
    );
  }

  saveActividades(actividadesPorBorrar: number[], actividades: Actividad[]) {
    return this._http.post(
      environment.API_URL + 'actividad',
      { borradas: actividadesPorBorrar, modificadas: actividades },
      { headers: this.headerService.getSecurity() }
    );
  }
}
