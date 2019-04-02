import { Injectable } from '@angular/core';
import { TipoActividad } from '../models/tipoActividad';
import { TIPOSACTIVIDAD } from '../mocks/mock-tiposActividad';
@Injectable({
  providedIn: 'root'
})
export class TipoActividadService {
  constructor() {}

  getTiposActividad(): TipoActividad[] {
    return TIPOSACTIVIDAD;
  }
}
