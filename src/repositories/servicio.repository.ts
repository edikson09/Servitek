import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Servicio, ServicioRelations, AsignacionServicio} from '../models';
import {AsignacionServicioRepository} from './asignacion-servicio.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly asignacionServicios: HasManyRepositoryFactory<AsignacionServicio, typeof Servicio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsignacionServicioRepository') protected asignacionServicioRepositoryGetter: Getter<AsignacionServicioRepository>,
  ) {
    super(Servicio, dataSource);
    this.asignacionServicios = this.createHasManyRepositoryFactoryFor('asignacionServicios', asignacionServicioRepositoryGetter,);
    this.registerInclusionResolver('asignacionServicios', this.asignacionServicios.inclusionResolver);
  }
}
