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
  Servicio,
} from '../models';
import {AsignacionServicioRepository} from '../repositories';

export class AsignacionServicioServicioController {
  constructor(
    @repository(AsignacionServicioRepository)
    public asignacionServicioRepository: AsignacionServicioRepository,
  ) { }

  @get('/asignacion-servicios/{id}/servicio', {
    responses: {
      '200': {
        description: 'Servicio belonging to AsignacionServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async getServicio(
    @param.path.string('id') id: typeof AsignacionServicio.prototype.id,
  ): Promise<Servicio> {
    return this.asignacionServicioRepository.servicio(id);
  }
}
