import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HeaderService } from '../global/header.service';
@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  constructor(private _http: HttpClient, private headerService: HeaderService) {}

  getAsignaturas(idDocente: number) {
    return this._http.get(environment.API_URL + 'asignaturaparalelo/iddocente/' + idDocente,
    { headers: this.headerService.getSecurity() });
  }
}
