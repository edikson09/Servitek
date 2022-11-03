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
  Factura,
  AsignacionServicio,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaAsignacionServicioController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/asignacion-servicios', {
    responses: {
      '200': {
        description: 'Array of Factura has many AsignacionServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AsignacionServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<AsignacionServicio>,
  ): Promise<AsignacionServicio[]> {
    return this.facturaRepository.asignacionServicios(id).find(filter);
  }

  @post('/facturas/{id}/asignacion-servicios', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(AsignacionServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Factura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsignacionServicio, {
            title: 'NewAsignacionServicioInFactura',
            exclude: ['id'],
            optional: ['facturaId']
          }),
        },
      },
    }) asignacionServicio: Omit<AsignacionServicio, 'id'>,
  ): Promise<AsignacionServicio> {
    return this.facturaRepository.asignacionServicios(id).create(asignacionServicio);
  }

  @patch('/facturas/{id}/asignacion-servicios', {
    responses: {
      '200': {
        description: 'Factura.AsignacionServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsignacionServicio, {partial: true}),
        },
      },
    })
    asignacionServicio: Partial<AsignacionServicio>,
    @param.query.object('where', getWhereSchemaFor(AsignacionServicio)) where?: Where<AsignacionServicio>,
  ): Promise<Count> {
    return this.facturaRepository.asignacionServicios(id).patch(asignacionServicio, where);
  }

  @del('/facturas/{id}/asignacion-servicios', {
    responses: {
      '200': {
        description: 'Factura.AsignacionServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AsignacionServicio)) where?: Where<AsignacionServicio>,
  ): Promise<Count> {
    return this.facturaRepository.asignacionServicios(id).delete(where);
  }
}
