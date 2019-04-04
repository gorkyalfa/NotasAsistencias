import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoActividadService {
  headers: HttpHeaders;

  constructor(private _http: HttpClient) {}

  getTiposActividad() {
    return this._http.get(environment.API_URL + 'tipoactividad', { headers: this.headers });
  }
}
