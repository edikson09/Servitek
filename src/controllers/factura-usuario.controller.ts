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
  Usuario,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaUsuarioController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Factura.prototype.id,
  ): Promise<Usuario> {
    return this.facturaRepository.usuario(id);
  }
}
