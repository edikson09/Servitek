import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Factura} from './factura.model';
import {Servicio} from './servicio.model';

@model()
export class AsignacionServicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @belongsTo(() => Factura)
  facturaId: string;

  @belongsTo(() => Servicio)
  servicioId: string;

  constructor(data?: Partial<AsignacionServicio>) {
    super(data);
  }
}

export interface AsignacionServicioRelations {
  // describe navigational properties here
}

export type AsignacionServicioWithRelations = AsignacionServicio & AsignacionServicioRelations;
