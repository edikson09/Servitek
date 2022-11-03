import {Entity, model, property, hasMany} from '@loopback/repository';
import {AsignacionServicio} from './asignacion-servicio.model';

@model()
export class Servicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  codigoServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreDelServicio: string;

  @property({
    type: 'number',
    required: true,
  })
  valorDelServicio: number;

  @hasMany(() => AsignacionServicio)
  asignacionServicios: AsignacionServicio[];

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
/*gjyuyu*/
