import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HeaderService } from '../global/header.service';
@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  constructor(private _http: HttpClient, private headerService: HeaderService) {}

  getAsignaturas(docente_id: number) {
    return this._http.get(environment.API_URL + 'asignaturaparalelo/docente_id/' + docente_id,
    { headers: this.headerService.getSecurity() });
  }
}
