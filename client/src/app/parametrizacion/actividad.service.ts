import { Injectable } from '@angular/core';
import { Actividad } from '../models/actividad';
import { ACTIVIDADES } from '../mocks/mock-actividades';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  constructor() {}

  getActividades(docente: number): Actividad[] {
    // TODO : filtrar por docente
    return ACTIVIDADES;
  }
}
