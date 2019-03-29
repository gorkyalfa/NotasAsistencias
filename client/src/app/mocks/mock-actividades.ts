import { Actividad } from '../models/actividad';

export const ACTIVIDADES: Actividad[] = [
  {
    id: 11,
    idAsignatura: 1,
    idTipoActividad: 1,
    creacion: new Date(),
    entrega: new Date(),
    nombre: 'Ejercicio POO',
    descripcion: 'Realizar el ejercicio 1 del libro de estudio de POO con VisualStudio Code'
  },
  {
    id: 12,
    idAsignatura: 1,
    idTipoActividad: 2,
    creacion: new Date(),
    entrega: new Date(),
    nombre: 'Prueba POO',
    descripcion: 'Prueba del primer capítulo de POO'
  },
];
