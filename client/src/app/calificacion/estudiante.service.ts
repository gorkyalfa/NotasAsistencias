import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  headers: HttpHeaders;

  constructor(private _http: HttpClient) {}

  getEstudiantes(asignatura_paralelo_id: number) {
    return this._http.get(environment.API_URL + 'estudiante/asignatura_paralelo_id/' + asignatura_paralelo_id, { headers: this.headers });
  }
}
