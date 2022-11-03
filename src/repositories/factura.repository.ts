import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Factura, FacturaRelations, Cliente, Vehiculo, Usuario, AsignacionServicio} from '../models';
import {ClienteRepository} from './cliente.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {UsuarioRepository} from './usuario.repository';
import {AsignacionServicioRepository} from './asignacion-servicio.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Factura.prototype.id>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Factura.prototype.id>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Factura.prototype.id>;

  public readonly asignacionServicios: HasManyRepositoryFactory<AsignacionServicio, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('AsignacionServicioRepository') protected asignacionServicioRepositoryGetter: Getter<AsignacionServicioRepository>,
  ) {
    super(Factura, dataSource);
    this.asignacionServicios = this.createHasManyRepositoryFactoryFor('asignacionServicios', asignacionServicioRepositoryGetter,);
    this.registerInclusionResolver('asignacionServicios', this.asignacionServicios.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
