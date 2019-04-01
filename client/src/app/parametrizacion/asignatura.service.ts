import { Injectable } from '@angular/core';
import { Asignatura } from '../models/asignatura';
import { ASIGNATURAS } from '../mocks/mock-asignaturas';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  constructor() {}

  getAsignaturas(docente: number): Asignatura[] {
    // TODO : filtrar por docente
    return ASIGNATURAS;
  }
}
