import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  headers: HttpHeaders;

  constructor(private _http: HttpClient) {}

  getEstudiantes(idAsignaturaParalelo: number) {
    return this._http.get(environment.API_URL + 'estudiante/idasignaturaparalelo/' + idAsignaturaParalelo, { headers: this.headers });
  }
}
