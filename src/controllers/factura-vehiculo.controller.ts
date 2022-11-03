import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  Vehiculo,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaVehiculoController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Factura.prototype.id,
  ): Promise<Vehiculo> {
    return this.facturaRepository.vehiculo(id);
  }
}
