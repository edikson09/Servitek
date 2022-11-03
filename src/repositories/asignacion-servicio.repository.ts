import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {AsignacionServicio, AsignacionServicioRelations, Factura, Servicio} from '../models';
import {FacturaRepository} from './factura.repository';
import {ServicioRepository} from './servicio.repository';

export class AsignacionServicioRepository extends DefaultCrudRepository<
  AsignacionServicio,
  typeof AsignacionServicio.prototype.id,
  AsignacionServicioRelations
> {

  public readonly factura: BelongsToAccessor<Factura, typeof AsignacionServicio.prototype.id>;

  public readonly servicio: BelongsToAccessor<Servicio, typeof AsignacionServicio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(AsignacionServicio, dataSource);
    this.servicio = this.createBelongsToAccessorFor('servicio', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicio', this.servicio.inclusionResolver);
    this.factura = this.createBelongsToAccessorFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
  }
}
