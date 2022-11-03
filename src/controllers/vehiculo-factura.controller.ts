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
  Vehiculo,
  Factura,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoFacturaController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/facturas', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Factura',
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
    return this.vehiculoRepository.facturas(id).find(filter);
  }

  @post('/vehiculos/{id}/facturas', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInVehiculo',
            exclude: ['id'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.vehiculoRepository.facturas(id).create(factura);
  }

  @patch('/vehiculos/{id}/facturas', {
    responses: {
      '200': {
        description: 'Vehiculo.Factura PATCH success count',
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
    return this.vehiculoRepository.facturas(id).patch(factura, where);
  }

  @del('/vehiculos/{id}/facturas', {
    responses: {
      '200': {
        description: 'Vehiculo.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.vehiculoRepository.facturas(id).delete(where);
  }
}
