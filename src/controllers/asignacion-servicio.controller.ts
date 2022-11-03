import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AsignacionServicio} from '../models';
import {AsignacionServicioRepository} from '../repositories';

export class AsignacionServicioController {
  constructor(
    @repository(AsignacionServicioRepository)
    public asignacionServicioRepository : AsignacionServicioRepository,
  ) {}

  @post('/asignacion-servicios')
  @response(200, {
    description: 'AsignacionServicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(AsignacionServicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsignacionServicio, {
            title: 'NewAsignacionServicio',
            exclude: ['id'],
          }),
        },
      },
    })
    asignacionServicio: Omit<AsignacionServicio, 'id'>,
  ): Promise<AsignacionServicio> {
    return this.asignacionServicioRepository.create(asignacionServicio);
  }

  @get('/asignacion-servicios/count')
  @response(200, {
    description: 'AsignacionServicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AsignacionServicio) where?: Where<AsignacionServicio>,
  ): Promise<Count> {
    return this.asignacionServicioRepository.count(where);
  }

  @get('/asignacion-servicios')
  @response(200, {
    description: 'Array of AsignacionServicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AsignacionServicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AsignacionServicio) filter?: Filter<AsignacionServicio>,
  ): Promise<AsignacionServicio[]> {
    return this.asignacionServicioRepository.find(filter);
  }

  @patch('/asignacion-servicios')
  @response(200, {
    description: 'AsignacionServicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsignacionServicio, {partial: true}),
        },
      },
    })
    asignacionServicio: AsignacionServicio,
    @param.where(AsignacionServicio) where?: Where<AsignacionServicio>,
  ): Promise<Count> {
    return this.asignacionServicioRepository.updateAll(asignacionServicio, where);
  }

  @get('/asignacion-servicios/{id}')
  @response(200, {
    description: 'AsignacionServicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AsignacionServicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AsignacionServicio, {exclude: 'where'}) filter?: FilterExcludingWhere<AsignacionServicio>
  ): Promise<AsignacionServicio> {
    return this.asignacionServicioRepository.findById(id, filter);
  }

  @patch('/asignacion-servicios/{id}')
  @response(204, {
    description: 'AsignacionServicio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsignacionServicio, {partial: true}),
        },
      },
    })
    asignacionServicio: AsignacionServicio,
  ): Promise<void> {
    await this.asignacionServicioRepository.updateById(id, asignacionServicio);
  }

  @put('/asignacion-servicios/{id}')
  @response(204, {
    description: 'AsignacionServicio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asignacionServicio: AsignacionServicio,
  ): Promise<void> {
    await this.asignacionServicioRepository.replaceById(id, asignacionServicio);
  }

  @del('/asignacion-servicios/{id}')
  @response(204, {
    description: 'AsignacionServicio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asignacionServicioRepository.deleteById(id);
  }
}
