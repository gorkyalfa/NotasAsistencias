import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  headers: HttpHeaders;

  constructor(private _http: HttpClient) {}

  getAsignaturas(idDocente: number) {
    return this._http.get(environment.API_URL + 'asignaturaparalelo/iddocente/' + idDocente, { headers: this.headers });
  }
}
