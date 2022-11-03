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
  Servicio,
  AsignacionServicio,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioAsignacionServicioController {
  constructor(
    @repository(ServicioRepository) protected servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/asignacion-servicios', {
    responses: {
      '200': {
        description: 'Array of Servicio has many AsignacionServicio',
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
    return this.servicioRepository.asignacionServicios(id).find(filter);
  }

  @post('/servicios/{id}/asignacion-servicios', {
    responses: {
      '200': {
        description: 'Servicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(AsignacionServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsignacionServicio, {
            title: 'NewAsignacionServicioInServicio',
            exclude: ['id'],
            optional: ['servicioId']
          }),
        },
      },
    }) asignacionServicio: Omit<AsignacionServicio, 'id'>,
  ): Promise<AsignacionServicio> {
    return this.servicioRepository.asignacionServicios(id).create(asignacionServicio);
  }

  @patch('/servicios/{id}/asignacion-servicios', {
    responses: {
      '200': {
        description: 'Servicio.AsignacionServicio PATCH success count',
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
    return this.servicioRepository.asignacionServicios(id).patch(asignacionServicio, where);
  }

  @del('/servicios/{id}/asignacion-servicios', {
    responses: {
      '200': {
        description: 'Servicio.AsignacionServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AsignacionServicio)) where?: Where<AsignacionServicio>,
  ): Promise<Count> {
    return this.servicioRepository.asignacionServicios(id).delete(where);
  }
}
