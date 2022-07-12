import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Area, Solicitud, Producto} from '../models';
import {AreaRepository} from './area.repository';
import {SolicitudRepository} from './solicitud.repository';
import {ProductoRepository} from './producto.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly Areas: BelongsToAccessor<Area, typeof Empleado.prototype.id>;

  public readonly solicitud: HasManyRepositoryFactory<Solicitud, typeof Empleado.prototype.id>;

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('AreaRepository') protected areaRepositoryGetter: Getter<AreaRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Empleado, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.solicitud = this.createHasManyRepositoryFactoryFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.Areas = this.createBelongsToAccessorFor('Areas', areaRepositoryGetter,);
    this.registerInclusionResolver('Areas', this.Areas.inclusionResolver);

  }
}
