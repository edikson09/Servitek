import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Vehiculo} from './vehiculo.model';
import {Usuario} from './usuario.model';
import {AsignacionServicio} from './asignacion-servicio.model';

@model()
export class Factura extends Entity {
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
    type: 'date',
    required: true,
  })
  fechaDelServicio: string;

  @property({
    type: 'number',
    required: true,
  })
  valorDelServicio: number;

  @property({
    type: 'string',
    required: true,
  })
  asignacionDelservicioId: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => AsignacionServicio)
  asignacionServicios: AsignacionServicio[];

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
