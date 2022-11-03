import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Factura,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioFacturaController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/facturas', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura[]> {
    return this.usuarioRepository.facturas(id).find(filter);
  }

  @post('/usuarios/{id}/facturas', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.usuarioRepository.facturas(id).create(factura);
  }

  @patch('/usuarios/{id}/facturas', {
    responses: {
      '200': {
        description: 'Usuario.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.usuarioRepository.facturas(id).patch(factura, where);
  }

  @del('/usuarios/{id}/facturas', {
    responses: {
      '200': {
        description: 'Usuario.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.usuarioRepository.facturas(id).delete(where);
  }
}
