import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Empleado, Partes, Producto} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {PartesRepository} from './partes.repository';
import {ProductoRepository} from './producto.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly Empleados: BelongsToAccessor<Empleado, typeof Solicitud.prototype.id>;

  public readonly Partes: BelongsToAccessor<Partes, typeof Solicitud.prototype.id>;

  public readonly Productos: BelongsToAccessor<Producto, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('PartesRepository') protected partesRepositoryGetter: Getter<PartesRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, 
  ) {
    super(Solicitud, dataSource);
    this.Productos = this.createBelongsToAccessorFor('Productos', productoRepositoryGetter,);
    this.registerInclusionResolver('Productos', this.Productos.inclusionResolver);
    this.Partes = this.createBelongsToAccessorFor('Partes', partesRepositoryGetter,);
    this.registerInclusionResolver('Partes', this.Partes.inclusionResolver);
    this.Empleados = this.createBelongsToAccessorFor('Empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('Empleados', this.Empleados.inclusionResolver);
  }
}
