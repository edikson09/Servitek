import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AsignacionServicio,
  Factura,
} from '../models';
import {AsignacionServicioRepository} from '../repositories';

export class AsignacionServicioFacturaController {
  constructor(
    @repository(AsignacionServicioRepository)
    public asignacionServicioRepository: AsignacionServicioRepository,
  ) { }

  @get('/asignacion-servicios/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to AsignacionServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.string('id') id: typeof AsignacionServicio.prototype.id,
  ): Promise<Factura> {
    return this.asignacionServicioRepository.factura(id);
  }
}
