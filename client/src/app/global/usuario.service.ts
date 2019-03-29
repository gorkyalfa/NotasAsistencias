import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { USUARIOACTUAL } from '../mocks/mock-usuarioActual';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  getUsuarioActual(): Usuario {
    return USUARIOACTUAL;
  }
}
